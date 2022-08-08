import requests,execjs

#url中的可选1，2，3
js_url = '/rank/indexPlus/brand_id/1'
url = 'https://api.qimai.cn' + js_url
headers = {
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36',
}
node = execjs.get()
ctx = node.compile(open('./js/七麦数据.js',encoding='utf-8').read())
analysis = ctx.eval('url("{}")'.format(js_url))
params = {
    'analysis':analysis
}
response = requests.get(url=url,headers=headers,params=params).text
print(response)