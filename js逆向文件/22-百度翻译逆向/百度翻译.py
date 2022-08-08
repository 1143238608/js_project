import json
import re

import execjs
import requests

header = {
    'Referer': 'https://www.baidu.com/link?url=Wefu8uHqaLSOkDBByP8PLWpW3jLqP9WqP8mhIR_TkcqtSzkh9D4GsGA_YDrs53RVSHeYElCYXhibiD2WfNqmcK&wd=&eqid=a8a1b53a00028f3f000000026253dfea',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36'
}


def node_js(s):
    node = execjs.get()
    s1 = node.compile(open('./js/百度翻译逆向.js', encoding='utf-8').read())
    data = get_token()
    sign = s1.eval('getsign("{}","{}")'.format(s, data['gtk']))
    return sign


def get_token():
    data = {}

    s.get('https://fanyi.baidu.com/?aldtype=16047', headers=header)
    response = s.get('https://fanyi.baidu.com/?aldtype=16047', headers=header)
    r = re.compile("token: '(.*)',")
    g = re.compile("window.gtk = '(.*)';")
    token, = r.findall(response.text)
    gtk, = g.findall(response.text)
    data['token'] = token
    data['gtk'] = gtk
    return data


def get_data(s1):
    url = 'https://fanyi.baidu.com/v2transapi?from=en&to=zh'
    sign = node_js(s1)
    data0 = get_token()
    data = {
        'from': 'en',
        'to': 'zh',
        'query': s1,
        'simple_means_flag': '3',
        'sign': sign,
        'token': data0['token'],
        'domain': 'common',
    }
    info = s.post(url, headers=header, params=data).text
    return info


if __name__ == '__main__':
    s = requests.session()
    data = get_token()
    s1 = input('请输入需要查询的单词：')
    info = get_data(s1)
    print(json.loads(info)['dict_result']['simple_means']['word_means'])
    sign = node_js('computer')
    print(sign)

