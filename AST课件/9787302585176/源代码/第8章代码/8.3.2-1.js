const fs = require('fs');
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types");
const generator = require("@babel/generator").default;

const jscode = fs.readFileSync("./demo.js", {
        encoding: "utf-8"
    });
let ast = parser.parse(jscode);

const visitor = {
    BinaryExpression(path) {
        console.log(path.node.left);
        console.log(path.node.right);
        console.log(path.node.operator);
    }
};
traverse(ast, visitor);

let code = generator(ast).code;
fs.writeFile('./demoNew.js', code, (err) => {});
