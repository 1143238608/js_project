import requests, re, execjs,json

ctx = execjs.compile(open('./js/虾米解析.js', encoding='utf-8').read())
session = requests.session()


def get_html(video_url):
    url = 'https://jx.xmflv.com/?url='+video_url
    headers = {
        "Host": "jx.xmflv.com",
        "Connection": "keep-alive",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9"
    }
    params = {
        'url': video_url
    }
    response = session.get(url=url, headers=headers, params=params).text
    time, = re.findall("var time = '(.*?)';", response)
    vkey, = re.findall("var vkey = '(.*?)';", response)
    return time, vkey


def get_url(video_url):
    time, vkey = get_html(video_url)
    url = 'https://jx.xmflv.com/favicon.ico'
    headers = {
        "Host": "jx.xmflv.com",
        "Connection": "keep-alive",
        "Content-Length": "142",
        "sec-ch-ua": "\".Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"103\", \"Chromium\";v=\"103\"",
        "Accept": "application/json, text/javascript, */*; q=0.01",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "X-Requested-With": "XMLHttpRequest",
        "sec-ch-ua-mobile": "?0",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36",
        "sec-ch-ua-platform": "\"Windows\"",
        "Origin": "https://jx.xmflv.com"
    }
    params = {
        'url': video_url,
        'time': time,
        'ua': '0',
        'vkey': ctx.call('encrypt', vkey)
    }
    response = session.post(url=url, headers=headers, data=params).text
    return response, vkey


def decrypt_url(video_url):
    response, vkey = get_url(video_url)
    print(response)
    enc_url = json.loads(response)['url']
    real_url = ctx.call('jsdecrypt',enc_url,vkey)
    print('m3u8文件地址：',real_url)

if __name__ == '__main__':
    video_url = input('请输入需要解析的视频地址：')
    decrypt_url(video_url)
