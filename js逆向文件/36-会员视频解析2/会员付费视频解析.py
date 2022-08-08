import requests, re, execjs, json


def get_key():
    key = 'd4375381b6e68c1e'
    iv = '16b711c80da1bb7b'
    world = ctx.eval('deKeyCode("{}")'.format(authorization))
    key = ctx.eval('AES_Decrypt("{}","{}","{}")'.format(world, key, iv))
    return key


def get_url(data, key, iv):
    url = ctx.eval('AES_Decrypt("{}","{}","{}")'.format(data, key, iv))
    return url


if __name__ == '__main__':
    s_url = input('请输入视频地址：')
    node = execjs.get()
    ctx = node.compile(open('./js/会员付费解析.js', encoding='utf-8').read())
    url = 'https://jx.playerjy.com/?url={}'.format(s_url)
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Safari/537.36',
    }
    session = requests.Session()
    response = session.get(url=url, headers=headers).text
    # print(response)
    vkey, = re.findall("var vkey          = '(.*?)'", response)
    authorization, = re.findall("var authorization = '(.*?)'", response)
    p_vkey = ctx.eval('deKeyCode("{}")'.format(vkey))

    url_php = 'https://jx.playerjy.com/api.php'
    params = {
        'type': 'parse',
        'vkey': ctx.eval('deKeyCode("{}")'.format(vkey))
    }
    v_key = json.loads(session.post(url_php, headers=headers, data=params).text)['vkey']
    key = get_key()
    k, = re.findall('"key":"(.*?)","timestamp', key)
    print(k)
    A_iv = k[:16]
    A_key = k[16:]
    real_url = json.loads(get_url(v_key, A_key, A_iv))['url']
    # print(real_url)
    print(real_url)
    resp = requests.get(f'https://jx.playerjy.com/{real_url}',headers=headers)
    print(resp)
    m3u8 = resp.headers['Location']
    print(m3u8)
