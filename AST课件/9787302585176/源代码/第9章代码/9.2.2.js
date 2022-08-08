const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types");
const generator = require("@babel/generator").default;
const fs = require('fs');

const jscode = fs.readFileSync("./demo.js", {
        encoding: "utf-8"
    });
let ast = parser.parse(jscode);

function base64Encode(e) {
	var r, a, c, h, o, t, base64EncodeChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
	for (c = e.length, a = 0, r = ''; a < c;) {
		if (h = 255 & e.charCodeAt(a++), a == c) {
			r += base64EncodeChars.charAt(h >> 2),
			r += base64EncodeChars.charAt((3 & h) << 4),
			r += '==';
			break
		}
		if (o = e.charCodeAt(a++), a == c) {
			r += base64EncodeChars.charAt(h >> 2),
			r += base64EncodeChars.charAt((3 & h) << 4 | (240 & o) >> 4),
			r += base64EncodeChars.charAt((15 & o) << 2),
			r += '=';
			break
		}
		t = e.charCodeAt(a++),
		r += base64EncodeChars.charAt(h >> 2),
		r += base64EncodeChars.charAt((3 & h) << 4 | (240 & o) >> 4),
		r += base64EncodeChars.charAt((15 & o) << 2 | (192 & t) >> 6),
		r += base64EncodeChars.charAt(63 & t)
	}
	return r
}

traverse(ast, {
	StringLiteral(path){
		//生成callExpression参数就是字符串加密后的密文
		let encStr = t.callExpression(
			     t.identifier('atob'), 
			     [t.stringLiteral(base64Encode(path.node.value))]);
		path.replaceWith(encStr);
		//替换后的节点里也有StringLiteral节点，会造成死循环，因此需要加入path.skip()
		path.skip();
  }
});

let code = generator(ast).code;
fs.writeFile('./demoNew.js', code, (err)=>{});
