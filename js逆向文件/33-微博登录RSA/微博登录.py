import requests, execjs, json, time


def get_data():
    url = 'https://login.sina.com.cn/sso/prelogin.php'

    headers = {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36',
        'referer': 'https://weibo.com/',
    }

    params = {
        "entry": "weibo",
        "callback": "sinaSSOController.preloginCallBack",
        "su": "MTgy",
        "rsakt": "mod",
        "checkpin": "1",
        "client": "ssologin.js(v1.4.19)",
        "_": time.time() * 1000
    }

    response = requests.get(url=url, headers=headers, params=params).text
    data = json.loads(response.split('(')[1].split(')')[0])
    return data


url = 'https://login.sina.com.cn/sso/login.php?client=ssologin.js(v1.4.19)'

headers = {
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36',
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "accept-encoding": "gzip, deflate, br",
    "content-type": "application/x-www-form-urlencoded",
    "origin": "https://weibo.com",
    "referer": "https://weibo.com/",
}
node = execjs.get()
ctx = node.compile(open('./微博登录.js', encoding='utf-8').read())
username = '18534705871'
password = 'mxy19981028'
data = get_data()
su = ctx.eval('getSu("{}")'.format(username))
sp = ctx.eval("getSp({},'{}')".format(data,password))
params = {
    'entry': 'weibo',
    'gateway': '1',
    'from': '',
    'savestate': '7',
    'qrcode_flag': 'false',
    'useticket': '1',
    'pagerefer': 'https://weibo.com/newlogin?tabtype=weibo&gid=102803&openLoginLayer=0&url=https%3A%2F%2Fweibo.com%2F',
    'vsnf': '1',
    'service': 'miniblog',
    'servertime': data['servertime'],
    'nonce': data['nonce'],
    'pwencode': 'rsa2',
    'rsakv': data['rsakv'],
    'sr': '1920*1080',
    'encoding': 'UTF-8',
    'prelt': '72',
    'url': 'https://weibo.com/ajaxlogin.php?framelogin=1&callback=parent.sinaSSOController.feedBackUrlCallBack',
    'returntype': 'TEXT',
    'su': su,
    'sp': sp,
}
response = requests.post(url=url, headers=headers, params=params).text
print(response)
