import requests
import execjs

url = 'https://passport.migu.cn/authn'

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36'
}

node = execjs.get()
ctx = node.compile(open('./js/咪咕视频登录.js',encoding='utf-8').read())
username = '18534705871'
password = 'Mxy19981028'
data1 = ctx.eval('getpwd("{}","{}")'.format(username,password))
data = {
    'sourceID': '208003',
    'appType': '0',
    'relayState': '',
    'loginID': data1['loginid'],
    'enpassword': data1['password'],
    'captcha': '',
    'imgcodeType': '1',
    'rememberMeBox': '1',
    'fingerPrint': data1['result'],
    'fingerPrintDetail': data1['details'],
    'isAsync': 'true'
}
response = requests.post(url=url,headers=headers,params=data).text

print(response)