import requests,execjs,json

def get_data(page):
    ctx = execjs.compile(open('./4.js',encoding='utf-8').read())
    url = 'http://spider.wangluozhe.com/challenge/api/4'
    headers = {
        'Cookie': 'session=9e1c9492-30ee-495e-afd7-bf87645a924c.gPSuA1wX45k_V0ViNdVypMHXjUc',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36'
    }
    params = {
        'page': page,
        'count': 10,
        '_signature': ctx.call('get_sign')
    }
    print(requests.post(url=url, headers=headers, data=params).text)
    return requests.post(url=url, headers=headers, data=params).text

if __name__ == '__main__':
    s = 0
    for page in range(1,101):
        data = get_data(page)
        try:
            for d in json.loads(data)['data']:
                s+=d['value']
        except:
            print('....',page)
    print(s)