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
			if(!(v.trailingComments && v.trailingComments[0].value == 'ASCIIEncrypt')) return v;
			delete v.trailingComments;
			let code = generator(v).code;
			let codeAscii = [].map.call(code, function(v){
				return t.numericLiteral(v.charCodeAt(0));
			});
			let decryptFuncName = t.memberExpression(t.identifier('String'), t.identifier('fromCharCode'));
			let decryptFunc = t.callExpression(decryptFuncName, codeAscii);
			return t.expressionStatement(t.callExpression(t.identifier('eval'), [decryptFunc]));
		});
		path.get('body').replaceWith(t.blockStatement(Statements));
	}
});

let code = generator(ast).code;
fs.writeFile('./demoNew.js', code, (err)=>{});
