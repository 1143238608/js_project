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
	FunctionExpression(path){
		let blockStatement = path.node.body;
		let Statements = blockStatement.body.map(function(v){
			if(t.isReturnStatement(v)) return v;
			let code = generator(v).code;
			let cipherText = base64Encode(code);
			let decryptFunc = t.callExpression(t.identifier('atob'), [t.stringLiteral(cipherText)]);
			return t.expressionStatement(t.callExpression(t.identifier('eval'), [decryptFunc]));
		});
		path.get('body').replaceWith(t.blockStatement(Statements));
	}
});

let code = generator(ast).code;
fs.writeFile('./demoNew.js', code, (err)=>{});
