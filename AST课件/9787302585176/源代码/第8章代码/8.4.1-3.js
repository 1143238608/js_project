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
    FunctionDeclaration(path) {
        console.log(generator(path.scope.parent.block).code);
    }
});

let code = generator(ast).code;
fs.writeFile('./demoNew.js', code, (err)=>{});