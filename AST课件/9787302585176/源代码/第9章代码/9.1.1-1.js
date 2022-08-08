const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types");
const generator = require("@babel/generator").default;
const fs = require('fs');

const jscode = fs.readFileSync("./demo.js", {
        encoding: "utf-8"
    });
let ast = parser.parse(jscode);

traverse(ast, {
    MemberExpression(path) {
        if (t.isIdentifier(path.node.property)) {
            let name = path.node.property.name;
            path.node.property = t.stringLiteral(name);
        }
        path.node.computed = true;
    },
});

let code = generator(ast).code;
fs.writeFile('./demoNew.js', code, (err)=>{});
