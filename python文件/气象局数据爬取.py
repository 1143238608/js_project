# http://www.tz121.com/index.php/Observation
import requests, re,json
from datetime import datetime

session = requests.Session()
url = 'http://www.tz121.com/index.php/Observation'

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36',
}

response = session.get(url=url, headers=headers)
_token, = re.findall('value="(.*?)">', response.text)
s_cookie = response.headers['Set-Cookie']
XSRF_TOKEN, = re.findall('XSRF-TOKEN=(.*?); expires=Tu', s_cookie)
taizhou_session, = re.findall('taizhou_session=(.*?); expires=Tue', s_cookie)


def get_time():
    GMT = '%a %b %d %Y %H:%M:%S GMT+0800'
    nowtime = datetime.now()
    return nowtime.strftime(GMT) + ' (中国标准时间)', nowtime.strftime("%Y-%m-%d %H:%M:%S")


def get_dataList():
    dtStart, dtEnd = get_time()
    url = 'http://www.tz121.com/index.php/Observation/PostObsData'
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36',
        'X-CSRF-Token': _token,
        'Cookie': f'XSRF_TOKEN={XSRF_TOKEN};taizhou_session={taizhou_session}',
        "Accept": "*/*",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "Referer": "http://www.tz121.com/index.php/Observation",
        "X-Requested-With": "XMLHttpRequest"
    }

    params = {
        'varId': 'T',
        'dtEnd': dtEnd,
        'dtStart': dtStart,
        'timeUnit': 'H',
        'timeSpan': '0',
        'timeStep': '1',
        'timeFixEnd': '-1',
        'sqlFunc': '',
        'county': '台州',
    }

    return session.post(url=url, headers=headers, data=params).text

def get_data(id,day):
    url = 'http://www.tz121.com/index.php/Observation/PostObsDataList'
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36',
        'X-CSRF-Token': _token,
        'Cookie': f'XSRF_TOKEN={XSRF_TOKEN};taizhou_session={taizhou_session}',
        "Accept": "*/*",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "Referer": "http://www.tz121.com/index.php/Observation",
        "X-Requested-With": "XMLHttpRequest"
    }
    postdata = {
        "stid": id,
        "varId": 'T',
        "dtEnd": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "sqlFunc": "",
        "hourSpan": "0",
        "daySpan": day,
        "timeFixEnd": "-1"
    }
    return session.post(url=url,headers=headers,data=postdata).text
if __name__ == '__main__':
    data = {}
    data_list = get_dataList()
    for d in json.loads(data_list)['data']:
        data[d['name']] = d['id']
    print(data)

    id = data[input('请输入地址：')]
    final_data = get_data(id,1)
    print(final_data)