import requests,json,execjs

ctx = execjs.compile(open('./js/猿人学第五题.js',encoding='utf-8').read())
p = ctx.call('get_params')


def req(page):
    ctx = execjs.compile(open('./js/猿人学第五题.js', encoding='utf-8').read())
    p = ctx.call('get_params')
    url = 'https://match.yuanrenxue.com/api/match/5'

    cookies = {
        'sessionid' : 'i1zbu2f58gwk2ivx9wj7gt6xwbqlhdrl',
    }
    headers = {
        "User-Agent": "yuanrenxue.project",
    }
    params = {
        'm': p['url_m'],
        'f': p['url_f'],
        'page': str(page)
    }
    #刷新cookie
    cookies['RM4hZBv0dDon443M'] = p['RM4hZBv0dDon443M']
    return requests.get(url=url,headers=headers,cookies=cookies,params=params).text

if __name__ == '__main__':
    s = []
    for i in range(1,6):
        data = json.loads(req(i))
        for d in data['data']:
            s.append(d['value'])
    s.sort()
    s.reverse()
    print(s)
    num = 0
    for i in s[:5]:
        num+=i
    print(num)