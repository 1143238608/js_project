import hashlib, requests, time, random, json, re
import ddddocr, io
from fontTools.ttLib import TTFont
from PIL import ImageFont, Image, ImageDraw

url = 'https://piaofang.maoyan.com/dashboard-ajax'
timeStamp = time.time() * 1000
ua = 'TW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzEwMi4wLjUwMDUuNjMgU2FmYXJpLzUzNy4zNg=='
index = int(1000 * random.random() + 1)
key = 'A013F70DB97834C0A5492378BD76C53A'
enstr = f'method=GET&timeStamp={timeStamp}&User-Agent={ua}&index={index}&channelId=40009&sVersion=2&key={key}'
headers = {
    # 'Accept':'application/json, text/plain, */*',
    # 'Referer':'https://piaofang.maoyan.com/dashboard',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Safari/537.36',
}
params = {
    'orderType': '0',
    'uuid': '4a09068d-6a02-4392-9a43-00264416ff2f',
    'timeStamp': time.time() * 1000,
    'User-Agent': 'TW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzEwMi4wLjUwMDUuNjMgU2FmYXJpLzUzNy4zNg==',
    'index': int(1000 * random.random() + 1),
    'channelId': '40009',
    'sVersion': '2',
    'signKey': hashlib.md5(enstr.encode(encoding='UTF-8')).hexdigest()
}
response = requests.get(url=url, headers=headers, params=params).text
data = json.loads(response)
def get_woff():

    for d in data['movieList']['data']['list']:
        # print(d['boxSplitUnit']['num'])
        uni_list = []
        for uni in d['boxSplitUnit']['num'].split(';')[:-1]:
            uni_list.append(uni.upper().replace('&#X','uni'))
        # print(uni_list)
        num_list = []
        for uni in uni_list:
            uni_dic = ocr_num()
            if ('.'in uni):
                # print('.'+uni_dic[uni.split('.')[1]])
                num_list.append('.'+uni_dic[uni.split('.')[1]])
            else:
                # print(uni_dic[uni])
                num_list.append(uni_dic[uni])
        num = ''.join(num_list)
        print(num)


def down_woff():
    font_url = 'http:' + re.findall('opentype"\),url\("(//.*?\.woff)"', data['fontStyle'])[0]
    r = requests.get(font_url)
    with open('./js/1.woff', 'wb') as f:
        f.write(r.content)



def ocr_num():
    ocr = ddddocr.DdddOcr()

    tfont = TTFont("./js/1.woff")
    uni_list = tfont.getGlyphOrder()[2:]
    # print('uni列表：', uni_list)

    charList = []
    chardic = {}
    font = ImageFont.truetype("./js/1.woff", 40)
    # 将10个uni字符画到im，进而使用ocr识别获得对应数字
    for uchar in uni_list:
        unknown_char = f"\\u{uchar[3:]}".encode().decode("unicode_escape")
        im = Image.new(mode='RGB', size=(42, 40), color="white")
        draw = ImageDraw.Draw(im=im)
        draw.text(xy=(0, 0), text=unknown_char, fill=0, font=font)
        img_byte = io.BytesIO()
        im.save(img_byte, format='JPEG')
        charList.append(ocr.classification(img_byte.getvalue()))
        chardic[uchar] = ocr.classification(img_byte.getvalue())
    # print(chardic)
    return chardic
    # print('对应字符：', charList)



if __name__ == '__main__':
    down_woff()
    get_woff()
    ocr_num()
