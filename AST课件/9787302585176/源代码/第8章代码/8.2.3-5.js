const fs = require('fs');
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types");
const generator = require("@babel/generator").default;

const jscode = fs.readFileSync("./demo.js", {
        encoding: "utf-8"
    });
let ast = parser.parse(jscode);

let obj = {};
obj.type = 'BinaryExpression';
obj.left = {type: 'NumericLiteral', value: 1000};
obj.operator = '/';
obj.right = {type: 'NumericLiteral', value: 2000};
let code = generator(obj).code;
console.log(code);

let code = generator(ast).code;
fs.writeFile('./demoNew.js', code, (err) => {});
