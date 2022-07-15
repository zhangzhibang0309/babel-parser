const fs = require("fs");

const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generator = require("@babel/generator").default;
const types = require("@babel/types");

const fileName = "source.js";

// 读取文件
const source = fs.readFileSync(fileName).toString();

// 转换成AST
const ast = parser.parse(source);

// walker
traverse(ast, {
  // 访问者
  CallExpression(path) {
    const calleeStr = generator(path.node.callee).code;
    if (["console.log", "console.error"].includes(calleeStr)) {
      const { line, column } = path.node.loc.start;
      path.node.arguments.unshift(
        types.stringLiteral(`${fileName}(${line}:${column})`)
      );
    }
  },
});

// 生成修改后的代码
const { code } = generator(ast);
fs.writeFileSync(fileName, code);
