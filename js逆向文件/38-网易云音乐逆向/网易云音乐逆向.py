import requests, execjs, json

world = '{"ids":"[1489064589]","level":"standard","encodeType":"aac","csrf_token":""}'
# world = '{"s":"'+input('请输入查询的歌曲名字:')+'","limit":"8","csrf_token":""}'
node = execjs.get()
ctx = node.compile(open('./js/网易云逆向.js', encoding='utf-8').read())
h = ctx.eval("getparams('{}')".format(world))
url = 'https://music.163.com/weapi/song/enhance/player/url/v1?csrf_token='
headers = {

    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36',
    'Referer': 'https://music.163.com/search/',
    'Origin': 'http://music.163.com',
    'Host': 'music.163.com'
}
params = {
    'params': h['encText'],
    'encSecKey': h['encSecKey']
}
response = requests.post(url=url, headers=headers, data=params).text
print(response)
