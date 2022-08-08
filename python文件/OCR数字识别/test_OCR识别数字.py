import ddddocr,io
from fontTools.ttLib import TTFont
from PIL import ImageFont, Image, ImageDraw

ocr = ddddocr.DdddOcr()

tfont = TTFont("./woff/1.woff")
uni_list = tfont.getGlyphOrder()[2:]
print('uni列表：',uni_list)

charList = []
font = ImageFont.truetype("./woff/1.woff", 40)
#将10个uni字符画到im，进而使用ocr识别获得对应数字
for uchar in uni_list:
	unknown_char = f"\\u{uchar[3:]}".encode().decode("unicode_escape")
	im = Image.new(mode='RGB', size=(42, 40), color="white")
	draw = ImageDraw.Draw(im=im)
	draw.text(xy=(0, 0), text=unknown_char, fill=0, font=font)
	img_byte = io.BytesIO()
	im.save(img_byte, format='JPEG')
	# with open('./woff/3.JPEG','wb')as f:
	# 	f.write(img_byte.getvalue())
	charList.append(ocr.classification(img_byte.getvalue()))
print('对应字符：',charList)