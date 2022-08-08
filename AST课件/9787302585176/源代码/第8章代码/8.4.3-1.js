const fs = require('fs');
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types");
const generator = require("@babel/generator").default;

const jscode = fs.readFileSync("./demo.js", {
	encoding: "utf-8"
  });
let ast = parser.parse(jscode);

function TestOwnBinding(path){
	path.traverse({
		Identifier(p) {
			let name = p.node.name;
			console.log( name, !!p.scope.getOwnBinding(name) );
		}
	});
}
traverse(ast, {
	FunctionExpression(path){
		TestOwnBinding(path);
	}
});

let code = generator(ast).code;
fs.writeFile('./demoNew.js', code, (err)=>{});