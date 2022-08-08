const fs = require('fs');
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types");
const generator = require("@babel/generator").default;

const jscode = fs.readFileSync("./demo.js", {
        encoding: "utf-8"
    });
let ast = parser.parse(jscode);

const updateParamNameVisitor = {
    Identifier(path) {
        if (path.node.name === this.paramName) {
            path.node.name = "x";
        }
    }
};
const visitor = {
    FunctionExpression(path) {
        const paramName = path.node.params[0].name;
        path.traverse(updateParamNameVisitor, {
            paramName
        });
    }
};
traverse(ast, visitor);

let code = generator(ast).code;
fs.writeFile('./demoNew.js', code, (err) => {});
