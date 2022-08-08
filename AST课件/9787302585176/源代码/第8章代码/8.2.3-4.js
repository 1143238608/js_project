const fs = require('fs');
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types");
const generator = require("@babel/generator").default;

const jscode = fs.readFileSync("./demo.js", {
        encoding: "utf-8"
    });
let ast = parser.parse(jscode);

let loaclAst = t.valueToNode([1, "2", false, null, undefined, /\w\s/g, {x: '1000', y: 2000}]);
let code = generator(loaclAst).code;
console.log(code);

let code = generator(ast).code;
fs.writeFile('./demoNew.js', code, (err) => {});
