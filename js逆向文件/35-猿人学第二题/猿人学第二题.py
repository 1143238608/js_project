import requests,execjs,json

node = execjs.get()
ctx = node.compile(open('./js/猿人学第二题.js',encoding='utf-8').read())
m = ctx.eval('m()')
num = []
for i in range(1,6):
    url = 'https://match.yuanrenxue.com/api/match/2?page={}'.format(i)
    headers ={
        'cookie' : 'm='+m,
        'User-Agent' : 'yuanrenxue.project'
    }
    response = requests.get(url=url,headers=headers).text
    data = json.loads(response)
    for j in data['data']:
        num.append(j['value'])
n = 0
for i in num:
    n=n+i
print(n)