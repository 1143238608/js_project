import requests, execjs, time,json


def req(page):
    ctx = execjs.compile(open('./js/猿人学第六题.js', encoding='utf-8').read())
    t = int(time.time()) * 1000
    m = ctx.call('get_params', t, 1)
    q = '1' + '-' + str(t) + "|"
    url = 'https://match.yuanrenxue.com/api/match/6'
    headers = {
        "User-Agent": "yuanrenxue.project",
        'cookies': 'sessionid=eqxkovllpxwbfke9kmkwnsxxla427nag'
    }
    params = {
        'page': page,
        'm': m,
        'q': q
    }
    return requests.get(url=url, headers=headers, params=params).text


if __name__ == '__main__':
    s = 0
    for i in range(1, 6):
        data = req(i)
        for d in json.loads(data)['data']:
            s+=d['value']*24
    print(s)