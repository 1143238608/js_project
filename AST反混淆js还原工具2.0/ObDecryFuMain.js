const fs = require("fs");//文件读写
const parse = require("@babel/parser"); //解析为ast
const traverse = require('@babel/traverse').default;//遍历节点
const t = require('@babel/types');//类型
const generator = require('@babel/generator').default;//ast解析为代码
const config = require('./config').config


//读取js文件
const jscode = fs.readFileSync(
    config.file2decrypt, {
        encoding: 'utf-8'
    }
);
var ast = parse.parse(jscode);//js转ast

try {
    //
    // //TODO 1 字符还原
    // ast = decry_str(ast)//16进制数字还原与字符还原
    //
    // // TODO 2 return函数简化
    // var Rerurn_sum = 5;//return简化执行的次数-函数花指令嵌套几层，这里设置几层
    // var delete_return = false;//return删除标志符
    // for (var a = 1; a < Rerurn_sum; a++) {
    //     ast = parse.parse(generator(ast).code);//刷新ast
    //     if (a == Rerurn_sum - 1) delete_return = true;//return删除标志符
    //     traverse(ast, {FunctionDeclaration: {exit: [FunToRetu]},});
    // }
    //
    // // TODO 3 标识符-重复赋值
    // ast = parse.parse(generator(ast).code);//刷新ast
    // traverse(ast, {VariableDeclarator: {exit: [ReIdent]},});
    //
    //
    // // TODO 4 大数组解密（需要先自行排版，大数组-偏移函数-解密函数）
    // ast = parse.parse(generator(ast).code);//刷新ast
    // ast = decrypt_arr(ast)//大数组还原
    //
    //
    //
    // //TODO 5 拆分对象合并-花指令处理准备工作一
    // ast = parse.parse(generator(ast).code);//刷新ast
    // traverse(ast, {VariableDeclarator: {exit: [merge_obj]},});  // 将拆分的对象重新合并-花指令还原准备工作
    //
    // //
    // //TODO 6 对象表达式字符串合并-花指令处理准备工作二
    // ast = parse.parse(generator(ast).code);//刷新ast
    // traverse(ast, {ObjectProperty: {exit: [AddObjPro]},});  //
    //
    // // TODO 7 花指令函数处理
    // ast = parse.parse(generator(ast).code);//刷新ast
    // traverse(ast, {VariableDeclarator: {exit: [callToStr]},});  // 对象替换
    //
    // //TODO 8 序列表达式还原
    // ast = parse.parse(generator(ast).code);//刷新ast
    // traverse(ast, {ExpressionStatement: remove_comma,});        // 序列表达式还原
    //
    // TODO 9 +-*/与!![]与|| && 常量计算 可以多处自由放置，来搭配其他的处理
    ast = parse.parse(generator(ast).code);
    traverse(ast, {
        "BinaryExpression|UnaryExpression|LogicalExpression": eval_constant,
    });
    //
    // //TODO 10 禁用console删减
    // ast = parse.parse(generator(ast).code);//刷新ast
    // traverse(ast, {Identifier: {exit: [DelConsole_one]},});
    // ast = parse.parse(generator(ast).code);//刷新ast
    // traverse(ast, {VariableDeclarator: {exit: [DelConsole_two]},});
    //
    //
    // // TODO 11 删除定时器部分
    // ast = parse.parse(generator(ast).code);//刷新ast
    // traverse(ast, {CallExpression: {exit: [del_setInterval]},});  // 删减定时器
    //
    //
    // //TODO 12 删减debugger部分
    // ast = parse.parse(generator(ast).code);//刷新ast
    // traverse(ast, {VariableDeclarator: {exit: [DelDebuger_one]}});  //禁用debugger删减
    // ast = parse.parse(generator(ast).code);
    // traverse(ast, {FunctionDeclaration: {enter: [DelDebuger_two]}});  //禁用debugger删减
    //
    // TODO 9 +-*/与!![]与|| && 常量计算 可以多处自由放置，来搭配其他的处理
    ast = parse.parse(generator(ast).code);
    traverse(ast, {
        "BinaryExpression|UnaryExpression|LogicalExpression": eval_constant,
    });

    //TODO 13 反控制流平坦化
    ast = parse.parse(generator(ast).code);
    traverse(ast, {WhileStatement: {exit: [replaceWhile]},});   // 反控制流平坦化

    // TODO 14 自执行实参替换形参
    traverse(ast, {ExpressionStatement: convParam,});           // 自执行实参替换形参

    // TODO 15 替换空参数的自执行方法为顺序语句-慎用，涉及作用域问题
    ast = parse.parse(generator(ast).code);
    traverse(ast, {ExpressionStatement: delConvParam,})      // 替换空参数的自执行方法为顺序语句

    //TODO 16 三元表达式转if-else
    ast = parse.parse(generator(ast).code);
    traverse(ast, {"VariableDeclarator|ExpressionStatement": conditionVarToIf});     //三元表达式转if-else


    // TODO 17 未修改常量替换
    traverse(ast, {VariableDeclarator: VarReplace,})      // 未修改常量替换

    // TODO 18 删除if语句中的假
    ast = parse.parse(generator(ast).code);
    traverse(ast, {IfStatement: {exit: [delete_false]},});  // 删除if语句中的假


    //TODO 19 数组简化
    ast = parse.parse(generator(ast).code);
    traverse(ast, {VariableDeclarator: {exit: [NumListReduce]},});


    // TODO 20 标识符简化
    ast = parse.parse(generator(ast).code);
    traverse(ast, {Identifier: {exit: [DelIdent]},});

    // //TODO 21 二次解密-开发人员完全熟悉后，对嵌套的大数组或者大函数进行解密，自行改写
    // // ast = parse.parse(generator(ast).code);//刷新ast
    // // ast = decrypt_arr_A(ast)//大数组还原




} catch (e) {//打印错误信息
    console.log(e);
} finally {
    //TODO Finally ast还原js
    ast = decry_str(ast)//16进制数字还原与字符还原

    code = generator(ast, opts = {jsescOption: {"minimal": true}}).code// 处理中文Unicode
//文件保存
    fs.writeFile(config.file2generate, code, (err) => {
    });
}

function reload_ast(ast) {
    //重新加载ast，主要用于刷新内存中的缓存ast
    code = generator(ast, opts = {jsescOption: {"minimal": true}}).code// 处理中文Unicode
//文件保存
    console.log(code)
    fs.writeFileSync(config.file2generate, code, (err) => {
        console.log(err)
    });
//读取js文件
    const jscode = fs.readFileSync(
        config.file2decrypt, {
            encoding: 'utf-8'
        }
    );
    fs.readFileSync

    return parse.parse(jscode);//js转ast
}

function conditionVarToIf(path) {
    //三元表达式转if-else
    try {
        if (path.type == "VariableDeclarator") {
            let {id, init} = path.node;
            if (!t.isConditionalExpression(init)) return;
            const ParentPath = path.parentPath;
            const ParentNode = path.parent;
            if (!t.isVariableDeclaration(ParentNode)) return;
            if (t.isForStatement(ParentPath.parentPath)) return;
            let kind = ParentNode.kind;
            if (kind == "const") {//因为const特性，会涉及到初始化必须赋值问题，将其修改为let
                kind = 'let';
            }
            let {test, consequent, alternate} = init;
            ParentPath.replaceInline([
                t.variableDeclaration(kind, [t.variableDeclarator(id,)]),
                t.ifStatement(
                    test,
                    t.blockStatement([t.ExpressionStatement(t.AssignmentExpression('=', id, consequent)),]),
                    t.blockStatement([t.ExpressionStatement(t.AssignmentExpression('=', id, alternate)),])
                ),
            ])
        }
        if (path.type == "ExpressionStatement") {
            if (!t.isConditionalExpression(path.node.expression)) return;
            let {test, consequent, alternate} = path.node.expression;
            path.replaceWith(t.ifStatement(
                test,
                t.blockStatement([t.expressionStatement(consequent)],),
                t.blockStatement([t.expressionStatement(alternate)],),
            ));
        }
    } catch (e) {
    }
}

function add_Mem_str(path) {
    let node = path.node;
    if (node.computed && t.isBinaryExpression(node.property) && node.property.operator == '+') {
        let BinNode = node.property;//属性节点
        let tmpast = parse.parse(generator(BinNode).code);
        let addstr = '';
        traverse(tmpast, {
            BinaryExpression: {
                exit: function (_p) {
                    if (t.isStringLiteral(_p.node.right) && t.isStringLiteral(_p.node.left)) {//二进制表达式左右有一个类型为字符型
                        _p.replaceWith(t.StringLiteral(eval(generator(_p.node).code)))      // 值替换节点
                    }
                    addstr = _p.toString();
                }

            }
        })
        node.property = t.Identifier(addstr);
    }
}

function decrypt_arr(ast) {
    //TODO 1 解密三部分的代码执行
    let end = 3;//切片需要处理的代码块
    let newAst = parse.parse('');//新建ast
    let decrypt_code = ast.program.body.slice(0, end);//切片
    newAst.program.body = decrypt_code// 将前3个节点替换进新建ast
    let stringDecryptFunc = generator(newAst, {compact: true},).code;//转为js，由于存在格式化检测，需要指定选项，来压缩代码// 自动转义
    eval(stringDecryptFunc);//执行三部分的代码


    //TODO 2 准备工作及对解密三部分节点删除
    let stringDecryptFuncAst = ast.program.body[end - 1];// 拿到解密函数所在的节点
    let DecryptFuncName;
    try {
        DecryptFuncName = stringDecryptFuncAst.declarations[0].id.name;//拿到解密函数的名字
        // DecryptFuncName = '_0x2217';//拿到解密函数的名字
    } catch (e) {
        DecryptFuncName = stringDecryptFuncAst.id.name;//拿到解密函数的名字
    }


    var rest_code = ast.program.body.slice(end); // 剩下的节点
    ast.program.body = rest_code;//剩下的节点替换


    //TODO 3 加密数组还原
    traverse(ast, {
        CallExpression(path) {//回调表达式匹配--替换加密数组为对应的值
            if (t.isIdentifier(path.node.callee, {name: DecryptFuncName})) {       //当变量名与解密函数名相同时，就执行相应操作
                console.log(eval(path.toString()))
                try {
                    path.replaceWith(t.valueToNode(eval(path.toString())));      // 值替换节点
                } catch (e) {
                    console.log(e);
                }

            }
        },
    });
    traverse(ast, {MemberExpression: {exit: [add_Mem_str]},});  // 成员表达式字符串合并

    return ast;

}

function decrypt_arr_A(ast) {
    //TODO 1 解密三部分的代码执行
    let end = 3;//切片需要处理的代码块
    let newAst = parse.parse('');//新建ast
    let decrypt_code = ast.program.body.slice(0, end);//切片
    newAst.program.body = decrypt_code// 将前3个节点替换进新建ast
    let stringDecryptFunc = generator(newAst, {compact: true},).code;//转为js，由于存在格式化检测，需要指定选项，来压缩代码// 自动转义

    // console.log(eval(stringDecryptFunc))//执行三部分的代码


    //TODO 2 准备工作及对解密三部分节点删除
    let stringDecryptFuncAst = ast.program.body[end - 1];// 拿到解密函数所在的节点
    let DecryptFuncName;
    try {
        // DecryptFuncName = stringDecryptFuncAst.declarations[0].id.name;//拿到解密函数的名字
        //
        DecryptFuncName = '_0x1d0946';//拿到解密函数的名字
    } catch (e) {
        DecryptFuncName = stringDecryptFuncAst.id.name;//拿到解密函数的名字
    }


    let rest_code = ast.program.body.slice(end); // 剩下的节点
    ast.program.body = rest_code;//剩下的节点替换


    //TODO 3 加密数组还原
    traverse(ast, {
        CallExpression(path) {//回调表达式匹配--替换加密数组为对应的值
            if (t.isIdentifier(path.node.callee, {name: DecryptFuncName})) {       //当变量名与解密函数名相同时，就执行相应操作

                console.log(eval(path.toString()))
                try {
                    path.replaceWith(t.valueToNode(eval(path.toString())));      // 值替换节点
                } catch (e) {
                    console.log(e);
                }

            } else {
                if (!t.isMemberExpression(path.node.callee)) return;
                if (!t.isIdentifier(path.node.callee.object)) return;
                if (t.isIdentifier(path.node.callee.object, {name: DecryptFuncName})) {

                    console.log(eval(stringDecryptFunc + path.toString()));
                    try {
                        path.replaceWith(t.valueToNode(eval(stringDecryptFunc + path.toString())));      // 值替换节点
                    } catch (e) {
                        console.log(e);
                    }
                }
            }
        },
    });
    traverse(ast, {MemberExpression: {exit: [add_Mem_str]},});  // 成员表达式字符串合并

    return ast;

}

function merge_obj(path) {
    // 将拆分的对象重新合并
    const {id, init} = path.node;//提取节点指定的值
    if (!t.isObjectExpression(init))//如果指定属性不是对象表达式，退出
        return;

    let name = id.name;//获取id的名称
    let properties = init.properties;//获取初始属性数组
    let scope = path.scope;//获取路径的作用域
    let binding = scope.getBinding(name);//

    if (!binding || binding.constantViolations.length > 0) {//检查该变量的值是否被修改--一致性检测
        return;
    }
    let paths = binding.referencePaths;//绑定引用的路径
    paths.map(function (refer_path) {
        let bindpath = refer_path.parentPath;//父路径
        if (!t.isVariableDeclarator(bindpath.node)) return;//变量声明
        let bindname = bindpath.node.id.name;//获取变量节点声明的值
        bindpath.scope.rename(bindname, name, bindpath.scope.block);//变量名重命名，传作用域参数
        bindpath.remove();//删除节点
    });

    scope.traverse(scope.block, {
        AssignmentExpression: function (_path) {//赋值表达式
            const left = _path.get("left");//节点路径左侧信息
            const right = _path.get("right");//节点路径右侧信息
            if (!left.isMemberExpression())//左侧是否为成员表达式
                return;
            const object = left.get("object");//获取左侧信息的对象
            const property = left.get("property");//获取左侧信息的属性
            //a={},a['b']=5；合并后a={'b':5}
            if (object.isIdentifier({name: name}) && property.isStringLiteral() && _path.scope == scope) {
                properties.push(t.ObjectProperty(t.valueToNode(property.node.value), right.node));
                _path.remove();
            }
            //a={},a.b=5；合并后a={'b':5}
            if (object.isIdentifier({name: name}) && property.isIdentifier() && _path.scope == scope) {
                properties.push(t.ObjectProperty(t.valueToNode(property.node.name), right.node));
                _path.remove();
            }
        }
    })
}

function callToStr(path) {
    // 将对象进行替换
    var node = path.node;//获取路径节点
    if (!t.isObjectExpression(node.init))//不是对象表达式则退出
        return;
    var objPropertiesList = node.init.properties;    // 获取对象内所有属性
    if (objPropertiesList.length == 0) // 对象内属性列表为0则退出
        return;
    var objName = node.id.name;   // 对象名
    let scope = path.scope;//获取路径的作用域
    let binding = scope.getBinding(objName);//

    if (!binding || binding.constantViolations.length > 0) {//检查该变量的值是否被修改--一致性检测
        return;
    }
    let paths = binding.referencePaths;//绑定引用的路径
    let paths_sums = 0;//路径计数

    objPropertiesList.forEach(prop => {
        var key = prop.key.value;//属性名

        if (t.isFunctionExpression(prop.value))//属性值为函数表达式
        {
            var retStmt = prop.value.body.body[0];//定位到ReturnStatement

            path.scope.traverse(path.scope.block, {
                CallExpression: function (_path) {//调用表达式匹配
                    let _path_binding = _path.scope.getBinding(objName);//当前作用域获取绑定
                    if (_path_binding != binding) return;//两者绑定对比
                    if (!t.isMemberExpression(_path.node.callee))//成员表达式判定
                        return;
                    var _node = _path.node.callee;//回调函数节点
                    if (!t.isIdentifier(_node.object) || _node.object.name !== objName)//非标识符检测||节点对象名全等验证
                        return;
                    if (!(t.isStringLiteral(_node.property) || t.isIdentifier(_node.property)))//节点属性非可迭代字符验证||节点属性标识符验证
                        return;
                    if (!(_node.property.value == key || _node.property.name == key))//节点属性值与名称等于指定值验证
                        return;
                    if (!t.isStringLiteral(_node.property) || _node.property.value != key)//节点属性可迭代字符验证与节点属性值与指定值等于验证
                        return;

                    var args = _path.node.arguments;//获取节点的参数

                    // 二元运算
                    if (t.isBinaryExpression(retStmt.argument) && args.length === 2)//二进制表达式判定且参数为两个
                    {
                        _path.replaceWith(t.binaryExpression(retStmt.argument.operator, args[0], args[1]));//二进制表达式替换当前节点
                    }
                    // 逻辑运算
                    else if (t.isLogicalExpression(retStmt.argument) && args.length == 2)//与二元运算一样
                    {
                        _path.replaceWith(t.logicalExpression(retStmt.argument.operator, args[0], args[1]));
                    }
                    // 函数调用
                    else if (t.isCallExpression(retStmt.argument) && t.isIdentifier(retStmt.argument.callee))//回调函数表达式判定及回调参数部分判定
                    {
                        _path.replaceWith(t.callExpression(args[0], args.slice(1)))
                    }
                    paths_sums += 1;//删除计数标志
                }
            })
        } else if (t.isStringLiteral(prop.value)) {//属性值为可迭代字符类型
            var retStmt = prop.value.value;//属性值的值即A:B中的B部分
            path.scope.traverse(path.scope.block, {
                MemberExpression: function (_path) {//成员表达式
                    let _path_binding = _path.scope.getBinding(objName);//当前作用域获取绑定
                    if (_path_binding != binding) return;//两者绑定对比
                    var _node = _path.node;
                    if (!t.isIdentifier(_node.object) || _node.object.name !== objName)//节点对象标识符验证|节点对象名验证
                        return;
                    if (!(t.isStringLiteral(_node.property) || t.isIdentifier(_node.property)))//节点属性可迭代字符验证|标识符验证
                        return;
                    if (!(_node.property.value == key || _node.property.name == key))//节点属性值与名称等于指定值验证
                        return;
                    if (!t.isStringLiteral(_node.property) || _node.property.value != key)//节点属性可迭代字符判定|节点属性值等于指定值验证
                        return;
                    _path.replaceWith(t.stringLiteral(retStmt))//节点替换
                    paths_sums += 1;//删除计数标志
                }
            })
        }
    });
    if (paths_sums == paths.length) {//若绑定的每个路径都已处理 ，则移除当前路径
        path.remove();//删除路径
    }
}

function DelConsole_one(path) {
    // 删除console
    let node = path.parentPath.node;//获取路径节点
    if (!t.isCallExpression(node)) return;//不是回调表达式，退出
    if (node.arguments.length !== 2) return;//形参不等于2个
    if (!t.isThisExpression(node.arguments[0])) return;//this表达式
    if (!t.isFunctionExpression(node.arguments[1])) return;//Func表达式
    if (node.arguments[1].params.length != 0) return;//func表达式存在参数
    let thisname = path.node.name;
    del_scope_path(path, thisname)

}

// function DelConsole_one(path) {
//     // 删除console
//     let node = path.node;//获取路径节点
//     if (!t.isCallExpression(node.init)) return;//不是回调表达式，退出
//     if (node.init.arguments.length !== 2) return;//形参不等于2个
//     if (!t.isThisExpression(node.init.arguments[0])) return;//this表达式
//     let thisname = node.id.name;//节点名称
//
//     let scope = path.scope;//获取路径的作用域
//     let binding = scope.getBinding(thisname);//获取绑定
//     if (!binding || binding.constantViolations.length > 0) {//检查该变量的值是否被修改--一致性检测
//         return;
//     }
//     let paths = binding.referencePaths;//绑定引用的路径
//     paths.map(function (refer_path) {
//         let bindpath = refer_path.parentPath;//父路径
//         if (!t.isCallExpression(bindpath)) return;//回调表达式判断
//         if (!t.isIdentifier(bindpath.node.callee)) return;//标识符判定
//         bindpath.remove();//删除路径
//     });
//     path.remove();//删除路径
// }

function DelConsole_two(path) {
    // 删除console遗留下列未使用的定义变量
    let node = path.node;//获取路径节点
    if (node.init != null) return;
    let thisname = node.id.name;//节点名称
    let scope = path.scope;//获取路径的作用域
    let binding = scope.getBinding(thisname);//获取绑定
    if (!binding || binding.constantViolations.length > 0) {//检查该变量的值是否被修改--一致性检测
        return;
    }
    let paths = binding.referencePaths;//绑定引用的路径

    if (paths.length != 1) return;
    del_scope_path(path, thisname)
    // path.remove();//删除路径
}

function remove_comma(path) {
    // 去除逗号表达式
    let {expression} = path.node
    if (!t.isSequenceExpression(expression))
        return;
    let body = []
    expression.expressions.forEach(
        express => {
            body.push(t.expressionStatement(express))
        }
    )
    path.replaceInline(body)
}

function del_setInterval(path) {
    // 将对象进行替换
    var node = path.node;//获取路径节点
    if (t.isIdentifier(node.callee)) {//是标识符
        if (!t.isIdentifier(node.callee))//不是标识符则退出
            return;
        if (node.callee.name != 'setInterval') return;//不是定时器退出
        if (node.arguments.length !== 2) return;
        if (!t.isFunctionExpression(node.arguments[0]) || node.arguments[0].params.length !== 0) return;
        let InterNode = node.arguments[0].body.body[0];
        if (!t.isExpressionStatement(InterNode)) return;
        if (!t.isCallExpression(InterNode.expression)) return;
        if (!t.isIdentifier(InterNode.expression.callee)) return;
        let InterName = InterNode.expression.callee.name;
        del_scope_path(path, InterName)
    } else {
        if (t.isMemberExpression(node.callee)) {
            let node1 = node.callee;//获取路径节点
            if (node.arguments.length !== 2) return;//回调表达式参数不是2则退出
            if (!t.isStringLiteral(node1.property)) return;//不是字符串类型，退出
            if (node1.property.value != 'setInterval') return;//不是定时器退出

            if (!t.isIdentifier(node.arguments[0])) return;//不是标识符则退出
            del_scope_path(path, node.arguments[0].name)
        }

    }

}

function del_scope_path(path, InterName) {
    //TODO 1 删除路径作用域下指定的标识符
    let scope = path.scope;//获取路径的作用域
    let binding = scope.getBinding(InterName);//
    if (!binding || binding.constantViolations.length > 0) {//检查该变量的值是否被修改--一致性检测
        return;
    }
    let paths = binding.referencePaths;//绑定引用的路径
    if (paths.length == 0) return;//引用路径必须等于1
    let paths_sums = 0;//路径计数

    paths.map(function (refer_path) {
        let bindpath = refer_path.parentPath;//父路径
        let break_sign = true;//while循环控制

        while (break_sign) {
            try {
                bindpath.remove();//路径删除
                paths_sums += 1;//处理数+1
                break_sign = false;//while循环终止
            } catch (e) {
                bindpath = bindpath.parentPath;//父路径
            }
        }

    });
    try {
        if (paths_sums == paths.length) {//若绑定的每个路径都已处理 ，则移除当前路径
            let bindpath = path;//父路径
            let break_sign = true;//while循环控制

            while (break_sign) {
                try {
                    bindpath.remove();//路径删除
                    break_sign = false;//while循环终止
                } catch (e) {
                    bindpath = bindpath.parentPath;//父路径
                }
            }
        }
    } catch (e) {
        console.log(e)
    }
}

function DelDebuger_one(path) {
    // 将对象进行替换
    var node = path.node;//获取路径节点
    if (!t.isCallExpression(node.init)) return;//回调表达式过滤
    if (node.init.arguments.length !== 0) return;//实参个数为0
    if (!t.isFunctionExpression(node.init.callee)) return;//函数表达式过滤
    if (node.init.callee.params.length !== 0) return;//形参个数过滤
    let varName = node.id.name;//定义的变量名称

    let scope = path.scope;//获取路径的作用域

    let binding = scope.getBinding(varName);//

    if (!binding || binding.constantViolations.length > 0) {//检查该变量的值是否被修改--一致性检测
        return;
    }

    let paths = binding.referencePaths;//绑定引用的路径
    // if(paths.length===0)return;//引用路径必须等于1
    let paths_sums = 0;//路径计数

    paths.map(function (refer_path) {
        let bindpath = refer_path.parentPath;//父路径
        let BinNode = bindpath.node;//获取路径节点
        if (!t.isCallExpression(BinNode)) return;//不是回调表达式，退出
        if (BinNode.arguments.length !== 2) return;//形参不等于2个
        if (!t.isThisExpression(BinNode.arguments[0])) return;//this表达式
        let thisname = BinNode.callee.name;//节点名称
        if (thisname !== varName) return;//二次确认，名称不等退出
        let break_sign = true;//while循环控制

        while (break_sign) {
            try {
                bindpath.remove();//路径删除
                paths_sums += 1;//处理数+1
                break_sign = false;//while循环终止
            } catch (e) {
                bindpath = bindpath.parentPath;
            }


        }
    });
    if (paths_sums == paths.length) {//若绑定的每个路径都已处理 ，则移除当前路径
        path.remove();//删除路径
    }
}

function DelDebuger_two(path) {
    //删减deugger未引用的函数
    var node = path.node;//获取路径节点

    let varName = node.id.name;//定义的变量名称

    let scope = path.scope;//获取路径的作用域
    let binding = scope.getBinding(varName);//

    if (!binding || binding.constantViolations.length > 0) {//检查该变量的值是否被修改--一致性检测
        return;
    }
    let paths = binding.referencePaths;//绑定引用的路径
    if (paths.length !== 0) return;//引用路径必须等于1

    path.remove();//删除路径


}

function AddObjPro(path) {
    if (t.isBinaryExpression(path.node.value)) {
        let BinNode = path.node.value;//属性节点
        if (!t.isBinaryExpression(BinNode)) return;//二相式表达式验证
        try {
            path.node.value = t.StringLiteral(eval(generator(BinNode).code));      // 值替换节点
        } catch (e) {
        }
    }
}

function delConvParam(path) {
    // 替换空参数的自执行方法为顺序语句
    let node = path.node;//路径节点
    let node_exp = node.expression;//节点表达式

    //回调表达式|一元表达式
    if (!t.isCallExpression(node_exp) && !t.isUnaryExpression(node_exp))
        return;
    //实参列表为空且长度不大于0
    if (node.expression.arguments !== undefined && node.expression.arguments.length > 0)
        return;
    if (t.isUnaryExpression(node_exp) && node_exp.operator == '!') {//第二种自执行修改为第一种类型
        node_exp = node_exp.argument;
    }
    if (t.isCallExpression(node_exp)) {//第一种自执行
        if (!t.isFunctionExpression(node_exp.callee))//函数表达式判断
            return;
        let paramsList = node_exp.callee.params//形参列表
        if (paramsList.length > 0) {
            paramsList.map(function (letname) {
                if (t.isIdentifier(letname)) {
                    //定义一个变量，并添加到结构体中
                    let varDec = t.VariableDeclarator(t.identifier(letname.name))//
                    let localAST = t.VariableDeclaration('var', [varDec]);//
                    node_exp.callee.body.body.unshift(localAST);//添加
                }
            })
        }
        // 替换节点
        path.replaceInline(node_exp.callee.body.body);
    }

}

function eval_constant(path) {
    // 常量计算

    if (path.type == "UnaryExpression") {//!![]类型的计算
        const {operator, argument} = path.node;
        if (operator != "!") return;//判断
        if (!t.isUnaryExpression(argument) &&!t.isLogicalExpression(argument)&& !t.isBinaryExpression(argument)&&!t.isArrayExpression(argument) && !t.isNumericLiteral(argument)&& !t.isStringLiteral(argument)) return;
    }
    if (path.type == "LogicalExpression") {//true||false && 与或非的运算
        if (!t.isUnaryExpression(path.node.left) &&!t.isLogicalExpression(path.node.left)&& !t.isBinaryExpression(path.node.left)&&!t.isNumericLiteral(path.node.left) && !t.isBooleanLiteral(path.node.left)&& !t.isStringLiteral(path.node.left)) return;//逻辑符左侧既不是数字类型也不是布尔类型，返回
        if (!t.isUnaryExpression(path.node.right) &&!t.isLogicalExpression(path.node.right)&& !t.isBinaryExpression(path.node.right)&&!t.isNumericLiteral(path.node.right) && !t.isBooleanLiteral(path.node.right)&& !t.isStringLiteral(path.node.left)) return;//逻辑符左侧既不是数字类型也不是布尔类型，返回
    }
    if (path.type == "BinaryExpression") {//+-*/ << >> 计算
        /*不做任何处理，下面的做出了限定，发现存在部分不能计算的问题，因此不在做限制，但是不做限制范围过大，会处理回调表达式*/
        if (!t.isUnaryExpression(path.node.left) &&!t.isLogicalExpression(path.node.left)&& !t.isBinaryExpression(path.node.left)&&!t.isNumericLiteral(path.node.left) && !t.isBooleanLiteral(path.node.left) && !t.isStringLiteral(path.node.left)) return;//逻辑符左侧既不是数字类型也不是布尔类型也不是字符串类型，返回
        if (!t.isUnaryExpression(path.node.right) &&!t.isLogicalExpression(path.node.right)&& !t.isBinaryExpression(path.node.right)&&!t.isNumericLiteral(path.node.right) && !t.isBooleanLiteral(path.node.right) && !t.isStringLiteral(path.node.right)) return;//逻辑符左侧既不是数字类型也不是布尔类型也不是字符串类型，返回
    }

    try {

        let value = eval(path.toString())
        // 无限计算则退出，如1/0与-(1/0)
        if (value == Infinity || value == -Infinity)
            return;
        path.replaceWith(t.valueToNode(value));

    } catch (e) {
        // console.log(e)
    }

}
function decry_str(ast) {
    //数字与字符还原
    traverse(ast, {
        'StringLiteral|NumericLiteral|DirectiveLiteral'(path) {//迭代字符串|迭代数组匹配--16进制文本还原
            delete path.node.extra; //删除节点的额外部分-触发原始值处理
        },
    });
    return ast;
}

function FunToRetu(path) {
    // return函数简化
    try {
        let node = path.node;//获取路径节点

        if (!t.isBlockStatement(node.body)) return;//块语句判定
        if (!t.isReturnStatement(node.body.body[0])) return;//return 语句判定
        let funName = node.id.name;//函数名称

        let retStmt = node.body.body[0];//定位到returnStatement
        let paramsName = node.params //函数参数列表

        let scope = path.scope;//获取路径的作用域
        let binding = scope.getBinding(funName);//获取绑定

        if (!binding || binding.constantViolations.length > 0) {//检查该变量的值是否被修改--一致性检测
            return;
        }
        let paths = binding.referencePaths;//绑定引用的路径
        let paths_sums = 0;//路径计数

        paths.map(function (refer_path) {
            let bindpath = refer_path.parentPath;//父路径

            let binnode = bindpath.node;//父路径的节点

            if (!t.isCallExpression(binnode)) return;//回调表达式判断

            if (!t.isIdentifier(binnode.callee)) return;//不是标识符则退出
            if (funName != binnode.callee.name) return;//函数名不等于回调函数名称则退出
            let args = bindpath.node.arguments;//获取节点的参数

            if (paramsName.length != args.length) return;//形参与实参数目不等，退出
            let strA = generator(retStmt.argument).code//return ast语句转js语句

            let tmpAst = parse.parse(strA);//重新解析为ast
            for (var a = 0; a < args.length; a++) {//遍历所有的实参
                let name = paramsName[a].name;//形参
                let strB = generator(args[a]).code//实参
                traverse(tmpAst, {//函数内部
                    Identifier: function (_p) {//调用表达式匹配
                        if (_p.node.name == name) {//return中的形参与传入的形参一致
                            _p.node.name = strB;//实参替换形参
                        }
                    }
                })
            }

            bindpath.replaceWith(t.Identifier(generator(tmpAst).code.replaceAll(';', '')))//子节点信息替换

            // tmpAst=parse.parse(generator(tmpAst).code)
            // bindpath.replaceExpressionWithStatements([tmpAst.program.body[0]])
            paths_sums += 1;//路径+1
        });

        if (paths_sums == paths.length && delete_return) {//若绑定的每个路径都已处理 ，则移除当前路径
            path.remove();//删除路径
        }
    } catch (e) {

    }

}

function convParam(path) {
    // 自执行函数实参替换形参
    var node = path.node;
    if (!t.isCallExpression(node.expression))//回调表达式判断
        return;
    //实参未定义|形参未定义|实参数大于形参数
    if (node.expression.arguments == undefined || node.expression.callee.params == undefined || node.expression.arguments.length > node.expression.callee.params.length)
        return;
    var argumentList = node.expression.arguments;//实参列表
    var paramList = node.expression.callee.params;//形参列表

    for (var i = 0; i < argumentList.length; i++) {//遍历实参
        var paramName = paramList[i].name;//形参
        let argumentName = generator(argumentList[i]).code//实参
        path.traverse({
            Identifier: function (_path) {
                if (_path.node.name.length != paramName.length) return;//长度不等
                if (_path.node.name !== paramName) return;//名称不等
                _path.node.name = argumentName;//更改形参为实参名称
            }
        });
    }
    node.expression.arguments = [];//实参列表置空
    node.expression.callee.params = paramList.slice(argumentList.length,);//形参列表设置

}

function delete_false(path) {
//删除if语句不执行的代码
    try {
        let Ifnode = path.node;//路径的节点
        if (!t.isBooleanLiteral(Ifnode.test) && !t.isNumericLiteral(Ifnode.test)) {//布尔类型判断
            return;
        }
        if (Ifnode.test.value) {//布尔值为真
            path.replaceInline(Ifnode.consequent.body);
        } else {//布尔值为假
            if (Ifnode.alternate) {
                path.replaceInline(Ifnode.alternate.body);
            } else {
                path.remove()
            }

        }
    } catch (e) {

    }


}

function replaceWhile(path) {
    // 反控制流平坦化
    var node = path.node;//路径节点
    // 判断是否是目标节点
    if (!(t.isBooleanLiteral(node.test) || t.isUnaryExpression(node.test)))
        // 如果while中不为true或!![]
        return;
    if (!(node.test.prefix || node.test.value))
        // 如果while中的值不为true
        return;
    if (!t.isBlockStatement(node.body))
        return;
    var body = node.body.body;
    if (!t.isSwitchStatement(body[0]) || !t.isMemberExpression(body[0].discriminant) || !t.isBreakStatement(body[1]))
        return;

    // 获取数组名及自增变量名
    var swithStm = body[0];
    var arrName = swithStm.discriminant.object.name;
    var argName = swithStm.discriminant.property.argument.name
    let arr = [];

    // 找到path节点的前一个兄弟节点，即数组所在的节点，然后获取数组
    let all_presibling = path.getAllPrevSiblings();
    all_presibling.forEach(pre_path => {
        const {declarations} = pre_path.node;
        let {id, init} = declarations[0]
        if (arrName == id.name) {
            // 数组节点
            arr = init.callee.object.value.split('|');
            pre_path.remove()
        }
        if (argName == id.name) {
            // 自增变量节点
            pre_path.remove()
        }
    })

    // SwitchCase节点集合
    var caseList = swithStm.cases;
    // 存放按正确顺序取出的case节点
    var resultBody = [];
    arr.map(targetIdx => {
        var targetBody = caseList[targetIdx].consequent;
        // 删除ContinueStatement块(continue语句)
        if (t.isContinueStatement(targetBody[targetBody.length - 1]))
            targetBody.pop();
        resultBody = resultBody.concat(targetBody)
    });
    path.replaceInline(resultBody);
}

function ReIdent(path) {
    // 标识符简化
    let node = path.node;//获取路径节点
    if (!t.isIdentifier(node.id) || !t.isIdentifier(node.init)) return;

    let leftName = node.id.name;//函数名称
    let rightName = node.init.name;//函数名称

    let scope = path.scope;//获取路径的作用域
    let binding = scope.getBinding(leftName);//获取绑定
    if (!binding || binding.constantViolations.length > 0) {//检查该变量的值是否被修改--一致性检测
        return;
    }
    let paths = binding.referencePaths;//绑定引用的路径
    let paths_sums = 0;
    paths.map(function (refer_path) {
        refer_path.node.name = rightName;//标识符重命名
        paths_sums += 1;//路径+1
    });
    if (paths_sums == paths.length && paths_sums != 0) {//若绑定的每个路径都已处理 ，则移除当前路径
        path.remove();//删除路径
    }
}

function DelIdent(path) {
    // 标识符简化
    try {
        let node = path.node;//获取路径节点
        let funName = node.name;//函数名称

        let scope = path.scope;//获取路径的作用域
        let binding = scope.getBinding(funName);//获取绑定
        if (!binding || binding.constantViolations.length > 0) {//检查该变量的值是否被修改--一致性检测
            return;
        }

        let paths = binding.referencePaths;//绑定引用的路径

        if (paths.length == 0) {//被使用的次数为0，删除
            if (t.isCatchClause(path.parentPath)) return; //如果是try catch中的e,不处理
            path.parentPath.remove();
        } else {
            // console.log(paths.length);
            // console.log(paths.toString())
            // path.remove();
        }

    } catch (e) {
        //此处异常是因为，未使用的变量里面嵌套未使用的变量，删除时，直接从外层进行删除，但是缓存还在，删除内层时发现不存在导致的报错
    }

}

function VarReplace(path) {
    // 常量替换
    let node = path.node;//路径节点
    if (!t.isIdentifier(node.id)) return;//标识符判定
    //过滤条件
    if (!t.isStringLiteral(node.init) && !t.isNumericLiteral(node.init) && !t.isUnaryExpression(node.init) && !t.isIdentifier(node.init) && !t.isCallExpression(node.init) && !t.isBinaryExpression(node.init)) return;

    let name = node.id.name//变量名称
    let scope = path.scope;//获取路径的作用域
    let binding = scope.getBinding(name);//

    if (!binding || binding.constantViolations.length > 0) {//检查该变量的值是否被修改--一致性检测
        return;
    }
    let paths = binding.referencePaths;//绑定引用的路径
    let path_sum = 0;// 路径处理计数
    paths.map(function (refer_path) {
        if (!t.isIdentifier(refer_path)) return; //标识符判定
        refer_path.node.name = generator(node.init).code;     //标识符重命名
        path_sum += 1;                                             //路径计数+1
    });
    if (path_sum == paths.length) {         //所有相关路径都处理，删除路径
        path.remove();
    }

}

function NumListReduce(path) {
    // 数组函数简化

    let node = path.node;//获取路径节点
    if (!t.isIdentifier(node.id)) return;//不是标识符则退出
    if (!t.isArrayExpression(node.init)) return;//不是数组表达式则退出
    let name = node.id.name;//数组的名称
    let init_obj = node.init.elements;//数组元素
    if (init_obj.length == 0) return;//数组元素为空则退出

    let scope = path.scope;//获取路径的作用域
    let binding = scope.getBinding(name);//获取绑定

    if (!binding || binding.constantViolations.length > 0) {//检查该变量的值是否被修改--一致性检测
        return;
    }
    let paths = binding.referencePaths;//绑定引用的路径
    let paths_sums = 0;//路径计数
    paths.map(function (refer_path) {
        let bindpath = refer_path.parentPath;//父路径

        let binnode = bindpath.node;//父路径的节点
        if (!t.isMemberExpression(bindpath.node)) return;//数字表达式判断
        if (binnode.object.name != name) return;//标识符判定
        if (!t.isNumericLiteral(binnode.property)) return;//数字类型判断
        if (t.isAssignmentExpression(bindpath.parentPath)) return;//赋值表达式
        bindpath.replaceInline(init_obj[binnode.property.value])//子节点信息替换
        paths_sums += 1;//路径+1
    });
    if (paths_sums == paths.length) {//若绑定的每个路径都已处理 ，则移除当前路径
        path.remove();//删除路径
    }

}
