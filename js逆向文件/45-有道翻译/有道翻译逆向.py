import requests,execjs

world = input('请输入需要查找到单词：')
ctx = execjs.compile(open('./js/有道翻译.js',encoding='utf-8').read())
url = 'https://fanyi.youdao.com/translate_o?smartresult=dict&smartresult=rule'
headers = {
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    "Cookie": "OUTFOX_SEARCH_USER_ID=-1286932780@10.110.96.158; OUTFOX_SEARCH_USER_ID_NCOO=888159416.7170357;",
    "Host": "fanyi.youdao.com",
    "Origin": "https://fanyi.youdao.com",
    "Referer": "https://fanyi.youdao.com/",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)",
    "X-Requested-With": "XMLHttpRequest"
}
data_p = ctx.call('getparams',world)
params = {
    "i": world,
    "from": "AUTO",
    "to": "AUTO",
    "smartresult": "dict",
    "client": "fanyideskweb",
    "salt": data_p['salt'],
    "sign": data_p['sign'],
    "lts": data_p['ts'],
    "bv": data_p['bv'],
    "doctype": "json",
    "version": "2.1",
    "keyfrom": "fanyi.web",
    "action": "FY_BY_REALTlME"
}
response = requests.post(url=url,headers=headers,data=params).text
print(response)
