import random
import requests, execjs, json
from urllib.parse import quote


def getCsrf():
    tmp = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
           'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    rlist = random.choices(range(0, 35), k=10, weights=range(0, 35))
    result = ''
    for i in rlist:
        result += tmp[i]
    return result


def getReq():
    node = execjs.get()
    ctx = node.compile(open('./js/酷我音乐逆向.js', encoding='utf-8').read())
    reqid = ctx.eval('getReqid()')
    return str(reqid)


word = quote(input('请输入查找的歌曲名称：'))
url = 'http://www.kuwo.cn/api/www/search/searchMusicBykeyWord?key={}&pn=1&rn=10&httpsStatus=1&reqId={}'.format(word,
                                                                                                               getReq())
csrf = getCsrf()
headers = {
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36',
    'csrf': csrf,
    'Referer': 'http://www.kuwo.cn/search/list?key={}'.format(word),
    'Cookie': 'kw_token=' + csrf

}
response = requests.get(url=url, headers=headers).text
data = json.loads(response)
for i in range(len(data['data']['list'])):
    print('id:' + str(i) + '\t' + '歌手:' + data['data']['list'][i]['artist'] + '\t' + 'rid:' + str(
        data['data']['list'][i]['rid']) + '\t' + '专辑:' + str(data['data']['list'][i]['album']))
mid = int(input('请输入歌曲的id：'))
play_url = 'http://www.kuwo.cn/api/v1/www/music/playUrl'
params = {
    'mid': str(data['data']['list'][mid]['rid']),
    type: 'music',
    'httpsStatus': '1',
    'reqId': getReq()
}
r = requests.get(url=play_url, headers=headers, params=params).text
load_url = json.loads(r)['data']['url']
print('歌曲下载地址：' + load_url)
