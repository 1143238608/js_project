import execjs
import requests

url = 'https://www.maoyan.com/board/2'

headers = {
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36',
}

node = execjs.get()

ctx = node.compile(open('./js/猫眼电影.js',encoding='utf-8').read())

data = ctx.eval('getdata()')

params = {
    'timeStamp': data['timeStamp'],
    'channelId': '40011',
    'index': data['index'],
    'signKey': data['signKey'],
    'sVersion': '1',
    'webdriver': 'false',
}

response = requests.get(url=url,headers=headers,params=params).text
print(response)