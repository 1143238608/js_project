import requests,execjs,re,json
from urllib.parse import unquote

session =requests.Session()
def request_1(video):
    data = {}
    url = 'https://jx.aidouer.net/?url='+video

    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Safari/537.36',
    }

    response = session.get(url=url,headers=headers).text
    # print(response)
    data['Vurl'], = re.findall('var Vurl = "(.*?)";',response)
    data['Vkey'], = re.findall('var Vkey = "(.*?)";',response)
    data['Key'], = re.findall('var Key = "(.*?)";',response)
    data['Time'], = re.findall('var Time = "(.*?)";',response)
    # print(data)
    return data

# def request_2():
#     url_2 = 'https://jx.aidouer.net/Api.php?ver=V3.0&timestamp='+Time+'&appkey=dc49f6067ec7e71c62aad71c5b727c62 '
#     headers = {
#
#     }
#     requests.post(url = url_2,headers=headers,)

if __name__ == '__main__':
    video_url = input('请输入需要解析的视频地址：')
    # video_url = 'https://v.qq.com/x/cover/mzc00200p51jpn7/v0043tq177l.html'
    data = request_1(video_url)
    ctx = execjs.compile(open('./js/vip.js',encoding='utf-8').read())
    Key1 = ctx.call('AES_ECB',data['Key'],ctx.call('md5',data['Vkey']))
    Key2 = ctx.call('XXTEA.encryptToBase64',data['Key'],Key1)
    Sign = ctx.call('encode_url',ctx.call('lc',ctx.call('md5','jx.aidouer.netjx.aidouer.net'+str(data['Time']+data['Vurl']+data['Key'])+Key1)),'971a0e7224fecb61b1868f1211a6360d')
    Sign1 = ctx.call('AES_ECB',Sign,ctx.call('md5',data['Vkey']))
    Sign2 = ctx.call('XXTEA.encryptToBase64',Sign,Sign1)
    Token = ctx.call('encode_url',ctx.call('lc',ctx.call('md5','jx.aidouer.netjx.aidouer.net'+str(data['Time']+data['Vurl']+data['Key'])+Key1+Sign+Sign1)),str(data['Time'])+'52bc46dec47a199abc82793bfabe56f6')
    Token1 = ctx.call('AES_ECB',Token,ctx.call('md5',data['Vkey']))
    Token2 = ctx.call('XXTEA.encryptToBase64',Token,Token1)

    Cookie = {
        'uuid' :str(data['Vkey']) + '-' + str(data['Key']) + '-' + Sign + "-" + Token,
        'BAIDUID':ctx.call('md5',(str(data['Vkey']) + "-" + str(data['Key']) + "-" + Sign + "-" + Token).upper()),
        'BAIDUSID':ctx.call('md5',str(Key1 + "-" + Sign1 + "-" + Token1).upper())
    }

    QO0000 = {
        "url": data['Vurl'],
        "wap": "0",
        "ios": "0",
        "host": "jx.aidouer.net",
        "referer": "",
        "time": data['Time'],
        "key": data['Key'],
        "key1": Key1,
        "sign": Sign,
        "sign1": Sign1,
        "token": Token,
        "token1": Token1
    }
    Ckey_md5 = ctx.call('md5',ctx.call('XXTEA.encryptToBase64',str(data['Vkey']) + '-' + str(data['Key']) + "-" + Sign + "-" + Token + Key1 + "-" + Sign1 + "-" + Token1 + Key2 + Sign2 + Token2, 'jx.aidouer.netjx.aidouer.net' + str(data['Time'])))
    Ckey = ctx.call('AES_CBC',json.dumps(QO0000,separators=(',', ':')),Ckey_md5)
    QO0000['ckey'] =Ckey

    iplist = [118, 79, 218, 98]
    url_2 = 'https://jx.aidouer.net/Api.php'+'?ver=V3.0&timestamp={}&appkey=dc49f6067ec7e71c62aad71c5b727c62'.format(data['Time'])
    params = {
        'ver': 'V3.0',
        'timestamp': str(data['Time']),
        'appkey': 'dc49f6067ec7e71c62aad71c5b727c62'
    }
    headers = {
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Referer': url_2+'?ver=V3.0&timestamp={}&appkey=dc49f6067ec7e71c62aad71c5b727c62'.format(data['Time']),
        "Vkey": data['Vkey'],
        "Ipmd5": ctx.call('md5',(str(iplist[0]) + "." + str(iplist[1]) + ".000.000")),
        "Version": 'V3.0',
        "Access-Token0": str(data['Vkey']) + "-" + str(data['Key']) + "-" + Sign + "-" + Token,
        "Access-Token1": Key1 + "-" + Sign1 + "-" + Token1,
        "Access-Token2": ctx.call('XXTEA.encryptToBase64',str(data['Vkey']) + "-" + str(data['Key']) + "-" + Sign + "-" + Token + Key1 + "-" + Sign1 + "-" + Token1 + Key2 + Sign2 + Token2,'jx.aidouer.netjx.aidouer.net' + str(data['Time'])),
        "Access-Token3": ctx.call('TSTKC',QO0000),
        'Origin': 'https://jx.aidouer.net',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': "cors",
        'Sec-Fetch-Site': 'same-origin',
    }

    response = session.post(url=url_2,headers=headers,data=QO0000,cookies=Cookie).text
    data_back = json.loads(response)

    if data_back['status'] == 1:
        appkey = data_back['appkey']
        ipmd5 = data_back['ipmd5']
        url_data = data_back['data']
        info = ctx.call('AES_CBC_DE',url_data,ctx.call('md5',appkey+ipmd5))
        real_url = ctx.call('decode_url',json.loads(info)['url'],ctx.call('md5','jx.aidouer.net'+Token))
        print('解析后地址为:',unquote(real_url))
    else:
        print('解析失败')


