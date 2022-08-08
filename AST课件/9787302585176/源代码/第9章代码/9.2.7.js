const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types");
const generator = require("@babel/generator").default;
const fs = require('fs');

const jscode = fs.readFileSync("./demo.js", {
        encoding: "utf-8"
    });
let ast = parser.parse(jscode);

function generatorIdentifier(decNum){
	let flag = ['O', 'o', '0'];
	let retval = [];
	while(decNum > 0){
		retval.push(decNum % 3);
		decNum = parseInt(decNum / 3);
	}
	let Identifier = retval.reverse().map(function(v){
		return flag[v]
	}).join('');
	Identifier.length < 6 ? (Identifier = ('OOOOOO' + Identifier).substr(-6)):
	Identifier[0] == '0' && (Identifier = 'O' + Identifier);
	return Identifier;
}

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
            var newName = generatorIdentifier(i++);
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
