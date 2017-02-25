const UPBRACKET = /\{/;
const UDBRACKET = /\}/;
const DOT = /\./;
const IGNORE = /\s|:|,|;/;
const varTERS = /[a-z]/i;
const PROPERTY = {
  key: /([a-z]|-)+/i,
  value: /([a-z]|[0-9]|\.)+/i
};
const NUMBERS = /[0-9]/;

function tokenizer(input) {

  var current = 0;
  var tokens = [];
  var isKey = true;

  while (current < input.length) {

    var char = input[current];
    switch (true) {

      case UPBRACKET.test(char) :
        current++;
        tokens.push({
          type: "paren",
          value: "{"
        });
        break;

      case UDBRACKET.test(char):
        current++;
        tokens.push({
          type: "paren",
          value: "}"
        });
        break;

      case IGNORE.test(char):
        current++;
        break;

      case DOT.test(char):
        var name = "";
        char = input[++current];
        while (varTERS.test(char)) {
          name += char;
          char = input[++current];
        }
        tokens.push({
          type: "name",
          value: name
        });
        break;

      case varTERS.test(char):
        var key = "", type = "";
        type = isKey ? "key" : "value";
        while (PROPERTY[type].test(char)) {
          key += char;
          char = input[++current];
        }
        isKey = !isKey;
        tokens.push({
          type: type,
          value: key
        });
        break;

      case NUMBERS.test(char):
        var value = "";
        while (PROPERTY.value.test(char)) {
          value += char;
          char = input[++current];
        }
        isKey = true;
        tokens.push({
          type: "value",
          value: value
        });
        break;

      default :
        throw new TypeError("I dont know what this character is: " + char);
    }
  }
  return tokens;
}

function parser(tokens) {

  var current = 0;

  function walk() {
    var token = tokens[current];

    if (token.type === "key") {
      current++;
      var key = {
        type: "AttributeKey",
        value: token.value
      };
      token = tokens[current++];
      var value = {
        type: "AttributeValue",
        value: token.value
      };

      return {
        type: "Attribute",
        value: {
          key: key,
          value: value
        }
      }
    }

    if (token.type === "name") {

      var node = {
        type: "NestClass",
        name: token.value,
        childs: [],
        attibutes: []
      };

      //跳过上括号
      current++;
      //获取下一个符号
      token = tokens[++current];

      while (
      (token.type !== "paren") ||
      (token.type === "paren" && token.value !== "}")
        ) {
        if (token.type === "key") {
          node.attibutes.push(walk());
        } else {
          node.childs.push(walk());
        }
        token = tokens[current]
      }
      //跳过下括号
      current++;
      return node;
    }

    throw new TypeError(token.type);
  }

  var ast = {
    type: "Program",
    body: []
  };

  while (current < tokens.length) {
    ast.body.push(walk());
  }

  return ast;
}

function codeGenerator(node) {

  function wrapQuotation(str) {
    return "\"" + str + "\""
  }

  function camelCase(str) {
    return str.replace(/-[a-z]/, function (match) {
      return match.charAt(1).toUpperCase();
    })
  }

  switch (node.type) {

    case "Program":
      return node.body.map(codeGenerator)
        .join(";");

    case "Attribute":
      return (
        codeGenerator(node.value.key) +
        codeGenerator(node.value.value) +
        ","
      );

    case "NestClass":
      return wrapQuotation(node.name) + ":{" +
        node.attibutes.map(codeGenerator) +
        node.childs.map(codeGenerator) + "}";

    case "AttributeKey":
      return wrapQuotation(camelCase(node.value)) + ":";

    case "AttributeValue":
      return wrapQuotation(node.value);

    default:
      throw new TypeError(node.type);
  }
}

function compiler(input) {
  var tokens = tokenizer(input);
  var ast = parser(tokens);
  var output = codeGenerator(ast);

  return output;
}

module.exports = compiler;