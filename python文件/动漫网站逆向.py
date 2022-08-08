import requests,re,json,hashlib,base64
from Crypto.Cipher import AES

def pkcs7unpadding(text):
    try:
        length = len(text)
        unpadding = ord(text[length - 1])
        return text[0:length - unpadding]
    except Exception as e:
        pass

def aesCbcDecode(content,key, iv,pkcs=5):
    try:
        key_bytes = bytes(key, encoding='utf-8')
        iv = bytes(iv, encoding='utf-8')
        cipher = AES.new(key_bytes, AES.MODE_CBC, iv)
        aes_encode_bytes = base64.b64decode(content)
        aes_decode_bytes = cipher.decrypt(aes_encode_bytes)
        result = str(aes_decode_bytes, encoding='utf-8')
        if pkcs==7:
            result = pkcs7unpadding(result)
    except:
        pass
    else:
        return result

def get_keyiv(utf8id,viewprotid):
    result= ['' for i in range(len(utf8id))]
    for i in range(len(utf8id)):
        result[int(utf8id[i])]=viewprotid[i]
    result= ''.join(result) + 'YingHua5648395'
    result = hashlib.md5(result.encode(encoding='UTF-8')).hexdigest()
    key = result[16:]
    iv = result[:16]
    return key,iv

def get_video_url(resp):
    player_aaaa = re.search(r'player_aaaa=(\{.*?)<', resp).group(1)
    player_json = json.loads(player_aaaa)
    vod_url = player_json['url']
    purl = f'http://play.qdzhongbei.com/xins/?url={vod_url}'
    headers = {'Referer': 'http://www.qdzhongbei.com/'}
    resp = requests.get(purl, headers=headers).text
    utf8_id = re.search(r'charset="UTF-8" id="now_(\d+)"', resp).group(1)
    viewport_id = re.search(r'name="viewport".*?id="now_(.*?)">', resp).group(1)
    config_url = re.search(r'"url": "(.*?)"', resp).group(1)
    key,iv=get_keyiv(utf8_id,viewport_id)
    decrypt_url = aesCbcDecode(config_url, key, iv, 7)
    if decrypt_url[:4]=='m3u8':
        resp = requests.get(decrypt_url).text
        try:
            m3u8 = re.search(r'/.*?\.m3u8', resp).group(0)
            decrypt_url = decrypt_url.split('/')[0] + '//' + decrypt_url.split('/')[2] + m3u8
        except:
            pass
    return decrypt_url

def get_url(url):
    resp=requests.get(url).text
    vod_name=re.search(r'keywords" content="(.*?)全集',resp).group(1)
    print(vod_name)
    if 'player_aaaa' not in resp:
        resp=resp.replace('\n','').replace('\r','').replace(' ','')
        url_list_str=re.findall(r'<divclass="playlistclearfix".*?</div>',resp)[0]
        url_list=re.findall(r'ahref="(.*?)">(.*?)<',url_list_str)
        for i in range(len(url_list)):
            resp=requests.get('http://www.qdzhongbei.com'+url_list[i][0]).text
            print(url_list[i][1],f'[{i+1}/{len(url_list)}]',get_video_url(resp))
    else:
        print(get_video_url(resp))

if __name__ == '__main__':
    get_url('http://www.qdzhongbei.com/view/9385.html')