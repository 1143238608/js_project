const fs = require('fs');
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types");
const generator = require("@babel/generator").default;

const jscode = fs.readFileSync("./demo.js", {
        encoding: "utf-8"
    });
let ast = parser.parse(jscode);

function func1(path){
	console.log('func1');
}
function func2(path){
	console.log('func2');
}
const visitor = {
	FunctionExpression: {
		enter: [func1, func2]
	}
};
traverse(ast, visitor);

let code = generator(ast).code;
fs.writeFile('./demoNew.js', code, (err) => {});
