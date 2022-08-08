const fs = require('fs');
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types");
const generator = require("@babel/generator").default;

const jscode = fs.readFileSync("./demo.js", {
	encoding: "utf-8"
  });
let ast = parser.parse(jscode,{
	sourceType: "module",
  });

//在这里对AST进行一系列的操作

let code = generator(ast, {
	retainLines: false, 
	comments: false, 
	compact: true
}).code;
console.log(code);