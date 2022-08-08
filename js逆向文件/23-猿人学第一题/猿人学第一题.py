import execjs
import time
import requests
import json

price_list = []
node = execjs.get()

c = node.compile(open('../js/猿人学逆向第一题.js', encoding='utf-8').read())

m = c.eval('m()')
headers = {}
for p in range(1, 6):
    if p > 3:
        headers = {
            'User-Agent': 'yuanrenxue.project'
        }
    data = {
        'page': p,
        'm': m
    }
    s = requests.session()
    response = s.get('https://match.yuanrenxue.com/api/match/1', params=data, headers=headers).text

    info = json.loads(response)
    # print(info)
    for i in info['data']:
        price_list.append(i['value'])

print(price_list)
num = 0
for i in price_list:
    num += int(i)
print(num / len(price_list))
