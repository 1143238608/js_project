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
    FunctionExpression(path) {
        console.log(generator(path.node).code);
        //console.log( path.toString() );
        //console.log( path +  '' );
    }
};
traverse(ast, visitor);

let code = generator(ast).code;
fs.writeFile('./demoNew.js', code, (err) => {});
