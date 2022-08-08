import requests
import json
from hyper.contrib import HTTP20Adapter



session = requests.session()
headers = {
    "User-Agent": "yuanrenxue.project",
    'cookie': 'Hm_lvt_c99546cf032aaa5a679230de9a95c7db=1650243332; tk=-6363037874292295612; sessionid=fqfh2tgipf84eiufc8g78kwjj36effhx; Hm_lvt_9bcbda9cbf86757998a2339a0437208e=1650243352; qpfccr=true; no-alert3=true; Hm_lvt_0362c7a08a9a04ccf3a8463c590e1e2f=1650243420; Hm_lpvt_0362c7a08a9a04ccf3a8463c590e1e2f=1650243598; yuanrenxue_cookie=1650246542|1nRUG9h18WSSSwpVwaNwuyv2V5g3Dqn76NA; Hm_lpvt_9bcbda9cbf86757998a2339a0437208e=1650249664; Hm_lpvt_c99546cf032aaa5a679230de9a95c7db=1650249664',
}
session.headers = headers

session.mount('https://match.yuanrenxue.com', HTTP20Adapter())
num = []
for page in range(1,6):
    d = session.get(url='https://match.yuanrenxue.com/api/match/17?page={}'.format(page)).text
    data_list = json.loads(d)
    for data in data_list['data']:
        num.append(data['value'])

n= 0
for i in num:
    n+=i
print(n)