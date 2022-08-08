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
	ReturnStatement(path) {
		console.log(path.findParent((p) => p.isObjectExpression()));
		//path.findParent(function(p){return p.isObjectExpression()});
	}
});

let code = generator(ast).code;
fs.writeFile('./demoNew.js', code, (err) => {});
