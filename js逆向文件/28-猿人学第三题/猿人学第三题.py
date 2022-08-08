import requests
import json


def get_data(pn):
    jssm_url = 'https://match.yuanrenxue.com/jssm'
    headers = {
        "Host": "match.yuanrenxue.com",
        "Connection": "keep-alive",
        "Content-Length": "0",
        "Origin": "https://match.yuanrenxue.com",
        "User-Agent": "yuanrenxue.project",
        "Accept": "*/*",
        "Referer": "https://match.yuanrenxue.com/match/3",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh;q=0.9",
        'Cookie': 'Hm_lvt_c99546cf032aaa5a679230de9a95c7db=1652261233; sessionid=p19f2sb1wh8qy3appyzcxb3uec0m15sk; qpfccr=true; no-alert3=true; tk=-8199168047001941373; Hm_lvt_9bcbda9cbf86757998a2339a0437208e=1652261245; Hm_lpvt_9bcbda9cbf86757998a2339a0437208e=1652261245; Hm_lpvt_c99546cf032aaa5a679230de9a95c7db=1652261300',
    }

    session = requests.session()
    session.headers = headers
    session.post(jssm_url)

    url = 'https://match.yuanrenxue.com/api/match/3?page='+pn

    res = session.get(url).text
    return res
    # print(res.text)


if __name__ == '__main__':
    data0 = {}
    for pn in range(1,6):
        data = json.loads(get_data(str(pn)))
        print(data['data'])
        for d in data['data']:
            if data0.get(d['value']) == None:
                data0[d['value']] = 1
            else:
                data0[d['value']] += 1
    print(data0)