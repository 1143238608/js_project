import requests

def get_url(video_url):
    url = 'https://a1.m1907.cn:404/api/v/'

    headers = {
        "Host": "a1.m1907.cn:404",
        "Connection": "keep-alive",
        "sec-ch-ua": "\".Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"103\", \"Chromium\";v=\"103\"",
        "sec-ch-ua-mobile": "?0",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36",
        "sec-ch-ua-platform": "\"Windows\"",
        "Accept": "*/*",
        "Origin": "https://z2.m1907.cn:404",
        "Sec-Fetch-Site": "same-site",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Dest": "empty",
        "Referer": "https://z2.m1907.cn:404/",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh;q=0.9"
    }

    params = {
        "z": "bc901a8b3b752896e398a102cdbc5654",
        "jx": video_url,
        "s1ig": "11400",
        "g": ""
    }
    print(requests.get(url=url, headers=headers, params = params).text)

if __name__ == '__main__':
    url = input('请输入需要解析的url地址:')
    get_url(url)