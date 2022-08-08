import requests, re, execjs

video_url = input('请输入需要解析的视频网址：')
url = 'https://jx.parwix.com:4433/player/analysis.php?v={}'.format(video_url)
headers = {
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'accept-encoding': 'gzip, deflate, br',
    'accept-language': 'zh-CN,zh;q=0.9',
    'upgrade-insecure-requests': '1',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36',
}

response = requests.get(url=url, headers=headers).text

params = re.findall('id="vod_(.*?)"', response)
enc_url, = re.findall('"url": "(.*?)", //视频链接', response)
# print(enc_url)
node = execjs.get()
ctx = node.compile(open('./js/会员视频解析.js', encoding='utf-8').read())
real_url = ctx.eval('get_url("{}","{}","{}")'.format(params[0], params[1], enc_url))

print(real_url)
