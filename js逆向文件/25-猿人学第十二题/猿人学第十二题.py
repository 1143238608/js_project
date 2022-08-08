import json

import requests
import base64

headers = {
    'user-agent': 'yuanrenxue.project',
    # 'Referer': 'http://match.yuanrenxue.com/match/12',
    'cookie': 'Hm_lvt_c99546cf032aaa5a679230de9a95c7db=1650164412;  sessionid=xl5g7yazc4xf6ylcprjgn99i2w2thid3;  yuanrenxue_cookie=1650166637|bvp7i4FhOK7Ioqu3kCtWH9p8eQOsQKGqWDTjCbPHJeyEmMoxhgW; Hm_lpvt_9bcbda9cbf86757998a2339a0437208e=1650166649; Hm_lpvt_c99546cf032aaa5a679230de9a95c7db=1650166699',
}
url = 'https://match.yuanrenxue.com/api/match/12'
num = []
for page in range(1, 6):
    m1 = 'yuanrenxue' + str(page)
    m = str(base64.b64encode(m1.encode('utf-8')), 'utf-8')
    params = {
        'page': str(page),
        'm': m
    }
    response = requests.get(url=url, params=params, headers=headers).text
    data_list = json.loads(response)
    print(data_list)
    for data in data_list['data']:
        num.append(data['value'])

a = 0
for n in num:
    a+=n
print(a)
