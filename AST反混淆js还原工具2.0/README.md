# ob混淆还原工具v2

| Author  | jia666666 |
| :-----: | :---: |
| 说明 | 基于丁仔ob混淆还原工具的二次开发 |

## 使用说明

### 一、ob混淆网站

https://obfuscator.io/  
ob混淆特征：
```javascript
// 开头一个大数组
var _0xa441 = ['\x49\x63\x4b\x72\x77\x70\x2f\x44\x6c\x67\x3d\x3d', ···]
// 自执行函数对数组进行位移
(function (_0x56a234, _0xa44115) {
    var _0x532345 = function (_0x549d7c) {
        while (--_0x549d7c) {
            _0x56a234['push'](_0x56a234['shift']());
        }
    };
    _0x532345(++_0xa44115);
}(_0xa441, 0x1d0));
// 解密函数
var _0x5323 = function (_0x56a234, _0xa44115) {
    // 里面有段自执行函数生成atob函数
    ······
}
// 下方多处调用解密函数，如
var _0x239123 = _0x5323('\x30\x78\x32\x30', '\x70\x59\x48\x73');
```

### 二、依赖
1. npm install @babel/core -g  

### 三、文件说明

1. config.js：配置选项文件
2. ObDecryMain.js：写死的处理流程主要运行代码
3. ObDecryFuMain.js：功能模块自由拼接，处理流程自我修改，及功能模块测试修改
4. demo.js：示例代码(还原前)
5. demoNew.js：示例代码(还原后)
6. 功能说明文档.md：各功能说明文档

### 四、使用

1. 将要还原的、**未格式化前**的ob混淆代码复制到本地
2. 修改config.js配置选项
3. 执行ObDecryMain.js即可
4. 如果有报错，可能暂不适配，或可联系本人

注意：ObDecryMain.js中已包含所有功能模块
1.针对ob混淆，已经写死了处理流程，不能灵活处理，兼容性较小

ObDecryFuMain.js是ObDecryMain的备份
1.灵活度较高，自由修改功能模块、处理流程顺序，可以满足大部分需求
2.自由开启一个或多个功能模块，便于调试
建议使用ObDecryFuMain灵活修改，以达到目的

使用之前建议阅读：AST反混淆实战-低级难度
https://jia666666.blog.csdn.net/article/details/120369644

混淆整理部分，确保前三个分别为大数组+自执行偏移函数+解密函数

### 五、其它
Ast反混淆样例专栏
https://blog.csdn.net/jia666666/category_11353500.html

### 六、参考

babel中文文档
https://www.babeljs.cn/docs/babel-generator
babel插件手册
https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md

反爬虫AST原理与还原混淆实战（书籍与视频）
丁仔ob解混淆源码
### 7、特别说明及感谢
作者：丁仔
参考ob解混淆源码
https://github.com/DingZaiHub/ob-decrypt
