import math

import requests,pywasm,time,random,json

def request(p):
    url = 'https://match.yuanrenxue.com/api/match/15'
    headers = {
        "User-Agent": "yuanrenxue.project",
        'cookie':'sessionid=xvqvo86fkxybyklyuw2e2me3eomv8qet'
    }

    t1 = int(time.time()/2)
    t2 = int(time.time()/2-math.floor(random.random()*50+1))
    Func = pywasm.load('./js/main.wasm')
    t0 = Func.exec('encode',[t1,t2])
    m = str(t0)+'|'+str(t1)+'|'+str(t2)
    params = {
        'm':m,
        'page':p
    }
    return requests.get(url=url,headers=headers,params=params).text

if __name__ == '__main__':
    s = 0
    for i in range(1,6):
        data = request(i)
        for d in json.loads(data)['data']:
            s+=d['value']
    print(s)
