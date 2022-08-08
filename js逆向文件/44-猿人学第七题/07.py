import requests, json, base64
from fontTools.ttLib import TTFont
import ddddocr, io
from PIL import ImageFont, Image, ImageDraw

ocr = ddddocr.DdddOcr()


def get_data_font(page):
    font_dict = {}
    url = 'https://match.yuanrenxue.com/api/match/7'
    headers = {
        "User-Agent": "yuanrenxue.project",
        # 'cookies': 'sessionid=eqxkovllpxwbfke9kmkwnsxxla427nag'
    }
    params = {
        'page': page
    }
    response = requests.get(url=url, headers=headers, params=params).text
    res_json = json.loads(response)
    font_file = base64.b64decode(res_json['woff'])
    font_data = res_json['data']
    with open('07.woff', 'wb') as f:
        f.write(font_file)
    font = TTFont('07.woff')
    uni_list = font.getGlyphOrder()[1:]
    # print('uni列表：', uni_list)
    charList = []
    font = ImageFont.truetype("07.woff", 40)
    # 将10个uni字符画到im，进而使用ocr识别获得对应数字
    for uchar in uni_list:
        unknown_char = f"\\u{uchar[3:]}".encode().decode("unicode_escape")
        im = Image.new(mode='RGB', size=(42, 40), color="white")
        draw = ImageDraw.Draw(im=im)
        draw.text(xy=(0, 0), text=unknown_char, fill=0, font=font)
        img_byte = io.BytesIO()
        im.save(img_byte, format='JPEG')
        charList.append(ocr.classification(img_byte.getvalue()))
    # print('对应字符：', charList)
    for i in range(len(charList)):
        font_dict[uni_list[i]] = charList[i]
    return font_dict, font_data


def parse_font():
    s = []
    for i in range(1, 6):
        font_dict, font_data = get_data_font(i)
        # print(font_dict)
        for j in range(len(font_data)):
            data = (font_data[j]['value'].replace('&#x', 'uni')).split(' ')
            if (len(data) == 5):
                for x in range(0, 4):
                    data[x] = font_dict[data[x]]
            elif (len(data) == 4):
                for x in range(0, 3):
                    data[x] = font_dict[data[x]]
            else:
                for x in range(0, 2):
                    data[x] = font_dict[data[x]]
            s.append(''.join(data))
    return s


if __name__ == '__main__':
    s = parse_font()
    # s.sort()
    name = ['爷灬霸气傀儡', '梦战苍穹', '傲世哥', 'мaη肆風聲', '一刀メ隔世', '横刀メ绝杀', 'Q不死你R死你', '魔帝殤邪', '封刀不再战', '倾城孤狼', '戎马江湖', '狂得像风',
            '影之哀伤',
            '謸氕づ独尊', '傲视狂杀', '追风之梦', '枭雄在世', '傲视之巅', '黑夜刺客', '占你心为王', '爷来取你狗命', '御风踏血', '凫矢暮城', '孤影メ残刀', '野区霸王', '噬血啸月',
            '风逝无迹', '帅的睡不着', '血色杀戮者', '冷视天下', '帅出新高度', '風狆瑬蒗', '灵魂禁锢', 'ヤ地狱篮枫ゞ', '溅血メ破天', '剑尊メ杀戮', '塞外う飛龍', '哥‘K纯帅',
            '逆風祈雨',
            '恣意踏江山', '望断、天涯路', '地獄惡灵', '疯狂メ孽杀', '寂月灭影', '骚年霸称帝王', '狂杀メ无赦', '死灵的哀伤', '撩妹界扛把子', '霸刀☆藐视天下', '潇洒又能打']
    print(s.index('9711'))
    print(name[29])


