const fs = require('fs');
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types");
const generator = require("@babel/generator").default;

const jscode = fs.readFileSync("./demo.js", {
	encoding: "utf-8"
  });
let ast = parser.parse(jscode);

traverse(ast, {
	Identifier(path) { 
		path.scope.rename(path.node.name, path.scope.generateUidIdentifier('_0x2ba6ea').name);
	}
});

let code = generator(ast).code;
fs.writeFile('./demoNew.js', code, (err)=>{});