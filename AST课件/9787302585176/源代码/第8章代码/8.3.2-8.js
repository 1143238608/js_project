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
    StringLiteral(path) {
        path.replaceInline(
            t.stringLiteral('Hello AST!'));
        path.stop();
    },
    ReturnStatement(path) {
        path.replaceInline([
                t.expressionStatement(t.stringLiteral("xiaojianbang")),
                t.expressionStatement(t.numericLiteral(1000)),
                t.returnStatement(),
            ]);
        path.stop();
    }
};
traverse(ast, visitor);

let code = generator(ast).code;
fs.writeFile('./demoNew.js', code, (err) => {});
