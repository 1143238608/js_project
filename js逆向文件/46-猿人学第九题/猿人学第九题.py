import execjs,requests,re,json

session = requests.session()
headers = {
    "user-agent": "yuanrenxue.project",
}
session.headers = headers
ctx = execjs.compile(open('./js/猿人学第九题.js',encoding='utf-8').read())



def update_cookie():
    url = 'https://match.yuanrenxue.com/match/9'
    res = session.get(url=url,headers=headers)
    for_ = re.findall('window=new Array\(\);(.*?var m=.*?)document', res.text,re.S)[0]
    # 获取动态时间戳
    decrypt_time = re.findall("decrypt.*?'(.*?)'\)", for_)[0]

    # 获取循环次数
    try:
        m = re.findall('\]\(m,(.)\);m', res.text)[0]
    except:
        m = re.findall(';m<=(.*?);m', res.text)[0]
    cookie_m = ctx.call('get_m', m, decrypt_time)
    session.cookies.update({'m':cookie_m})

def get_data(page):
    url = 'https://match.yuanrenxue.com/api/match/9?page=' + str(page)
    res = session.get(url)
    return json.loads(res.text)


if __name__ == '__main__':
    s = 0
    update_cookie()
    for page in range(1, 6):
        for data in get_data(page)['data']:
            s+=data['value']
    s = s/50
    print(s)