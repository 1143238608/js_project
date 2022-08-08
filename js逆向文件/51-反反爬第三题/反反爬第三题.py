import requests, execjs, json


def get_data(page):
    ctx = execjs.compile(open('./js/3.js', encoding='utf-8').read())
    url = 'http://spider.wangluozhe.com/challenge/api/3'
    headers = {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "Cookie": "session=6530fe2f-053c-422c-a5db-cb9595059d07.jFM9GR7W6IelLAhaL7rFe6RPA0w",
        "Host": "spider.wangluozhe.com",
        "Origin": "http://spider.wangluozhe.com",
        "Referer": "http://spider.wangluozhe.com/challenge/2",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36",
        "X-Requested-With": "XMLHttpRequest"
    }

    params = {
        'page': page,
        'count': 10,
        '_signature': ctx.call('getSign')
    }
    print(requests.post(url=url, headers=headers, data=params).text)
    return requests.post(url=url, headers=headers, data=params).text


if __name__ == '__main__':
    s = 0
    for page in range(1, 101):
        data = get_data(page)
        try:
            for d in json.loads(data)['data']:
                s += d['value']
        except:
            print('....',page)
    print(s)
