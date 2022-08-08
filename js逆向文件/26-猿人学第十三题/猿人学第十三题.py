import json

import requests
import re

headers = {
    "User-Agent": "yuanrenxue.project",
    'cookie': 'Hm_lvt_c99546cf032aaa5a679230de9a95c7db=1650243332; tk=-6363037874292295612; sessionid=fqfh2tgipf84eiufc8g78kwjj36effhx; Hm_lvt_9bcbda9cbf86757998a2339a0437208e=1650243352; qpfccr=true; no-alert3=true; Hm_lvt_0362c7a08a9a04ccf3a8463c590e1e2f=1650243420; Hm_lpvt_0362c7a08a9a04ccf3a8463c590e1e2f=1650243598; Hm_lpvt_9bcbda9cbf86757998a2339a0437208e=1650243607; Hm_lpvt_c99546cf032aaa5a679230de9a95c7db=1650243640; yuanrenxue_cookie=1650244097|4Vw1nFZ3KHEjrwTguT3WAhuokfz7OBTTSHYLFsi0lfwI0tF5u5LisS414dsLVY59wb',
}
# 先获取cookie生成逻辑代码，解析cookie
session = requests.session()
res = session.get("https://match.yuanrenxue.com/match/13", headers=headers)
cookie = re.findall("cookie=(.*?);path=/", res.text)[0][:-2]
yuanrenxue_cookie = eval(cookie)
print(yuanrenxue_cookie)
session.cookies.set(yuanrenxue_cookie.split('=')[0], yuanrenxue_cookie.split('=')[1])
h = {
"User-Agent": "yuanrenxue.project",
}
num = []
for page in range(1,6):
    d = session.get('https://match.yuanrenxue.com/api/match/13?page={}'.format(page),headers=h).text
    data = json.loads(d)
    for value in data['data']:
        num.append(value['value'])
n = 0
for i in num:
    n+=i
print(n)