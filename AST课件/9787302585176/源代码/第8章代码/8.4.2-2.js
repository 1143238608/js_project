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
    FunctionExpression(path) {
        let bindingA = path.scope.getBinding('a');
        let bindingDemo = path.scope.getBinding('demo');
        console.log(bindingA.referenced);
        console.log(bindingA.references);
        console.log(generator(bindingA.scope.block).code);
        console.log(generator(bindingDemo.scope.block).code);
    }
});

let code = generator(ast).code;
fs.writeFile('./demoNew.js', code, (err)=>{});