const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types");
const generator = require("@babel/generator").default;
const fs = require('fs');

const jscode = fs.readFileSync("./demo.js", {
        encoding: "utf-8"
    });
let ast = parser.parse(jscode);

function renameOwnBinding(path) {
    let OwnBindingObj = {}, globalBindingObj = {}, i = 0;
    path.traverse({
        Identifier(p)  {
            let name = p.node.name;
            let binding = p.scope.getOwnBinding(name);
            binding && generator(binding.scope.block).code == path + '' ?
            (OwnBindingObj[name] = binding) : (globalBindingObj[name] = 1);
        }
    });
    for(let oldName in OwnBindingObj) {
        do {
            var newName = '_0x2ba6ea' + i++;
        } while(globalBindingObj[newName]);
        OwnBindingObj[oldName].scope.rename(oldName, newName);
    }
}
traverse(ast, {
    'Program|FunctionExpression|FunctionDeclaration'(path) {
        renameOwnBinding(path);
    }
});

let code = generator(ast).code;
fs.writeFile('./demoNew.js', code, (err)=>{});
