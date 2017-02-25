var assert = require("assert");
var es = require("event-stream");
var File = require("vinyl");
var RNTransformCSS = require("../");

describe("gulp-RNTransformCSS", function () {
  describe("in streaming mode", function () {

    it("转换 css style 字符串", function (done) {

      // 创建伪文件
      var fakeFile = new File({
        contents: es.readArray([".a {b-a: 12px; .b{ xun: control } } .c {d: wer}"])
      });

      // 创建一个 prefixer 流（stream）
      var streamer = RNTransformCSS();

      // 将伪文件写入
      streamer.write(fakeFile);

      // 等文件重新出来
      streamer.once("data", function (file) {
        // 确保它以相同的方式出来
        assert(file.isBuffer());

        // 缓存内容来确保它已经被处理过（加前缀内容）
        file.contents.pipe(es.wait(function (err, data) {
          // 检查内
          assert.equal(file.contents.toString("utf8"), '"a":{"bA":"12px","b":{"xun":"control",}};"c":{"d":"wer",}');
          done();
        }));
      });
    });
  });
});
