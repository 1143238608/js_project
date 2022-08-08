const fs = require('fs');
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types");
const generator = require("@babel/generator").default;

const jscode = fs.readFileSync("./demo.js", {
        encoding: "utf-8"
    });
let ast = parser.parse(jscode);

let a = t.identifier('a');
let b = t.identifier('b');
let binExpr2 = t.binaryExpression("+", a, b);
let binExpr3 = t.binaryExpression("*", a, b);
let retSta2 = t.returnStatement(t.binaryExpression("+", binExpr2, t.numericLiteral(1000)));
let retSta3 = t.returnStatement(t.binaryExpression("+", binExpr3, t.numericLiteral(1000)));
let bloSta2 = t.blockStatement([retSta2]);
let bloSta3 = t.blockStatement([retSta3]);
let funcExpr2 = t.functionExpression(null, [a, b], bloSta2);
let funcExpr3 = t.functionExpression(null, [a, b], bloSta3);
let objProp1 = t.objectProperty(t.identifier('name'), t.stringLiteral('xiaojianbang'));
let objProp2 = t.objectProperty(t.identifier('add'), funcExpr2);
let objProp3 = t.objectProperty(t.identifier('mul'), funcExpr3);
let objExpr = t.objectExpression([objProp1, objProp2, objProp3]);
let varDec = t.variableDeclarator(t.identifier('obj'), objExpr);
let loaclAst = t.variableDeclaration('let', [varDec]);
let code = generator(loaclAst).code;
console.log(code);

let code = generator(ast).code;
fs.writeFile('./demoNew.js', code, (err) => {});
