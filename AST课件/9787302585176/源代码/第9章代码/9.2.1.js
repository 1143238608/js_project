const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types");
const generator = require("@babel/generator").default;
const fs = require('fs');

const jscode = fs.readFileSync("./demo.js", {
        encoding: "utf-8"
    });
let ast = parser.parse(jscode);

traverse(ast, {
	NumericLiteral(path){
		let value = path.node.value;
		let key = parseInt(Math.random() * (999999 - 100000) + 100000, 10);
		let cipherNum = value ^ key;
		path.replaceWith(t.binaryExpression('^', t.numericLiteral(cipherNum), t.numericLiteral(key)));
		//替换后的节点里也有numericLiteral节点，会造成死循环，因此需要加入path.skip()
        path.skip();
	}
});

let code = generator(ast).code;
fs.writeFile('./demoNew.js', code, (err)=>{});
