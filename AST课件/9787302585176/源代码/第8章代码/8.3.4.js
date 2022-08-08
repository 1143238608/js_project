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
        path.parentPath.unshiftContainer('body', [
			t.expressionStatement(t.stringLiteral('Before1')),
              t.expressionStatement(t.stringLiteral('Before2'))]);
        console.log(path.parentPath.pushContainer('body', 
			t.expressionStatement(t.stringLiteral('After'))));
    }
});

let code = generator(ast).code;
fs.writeFile('./demoNew.js', code, (err) => {});
