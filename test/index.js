var assert = require("assert");
var es = require("event-stream");
var File = require("vinyl");
var RNTransformCSS = require("../index");

describe("gulp-RNTransformCSS", function () {
  describe("in buffer mode", function () {

    it("to transform css to js object", function (done) {

      var fakeFile = new File({
        contents: es.readArray([".a {b-a: 12px; .b{ xun: control } } .c {d: wer}"])
      });

      var streamer = RNTransformCSS();

      streamer.write(fakeFile);

      streamer.once("data", function (file) {

        assert(file.isBuffer());

        file.contents.pipe(es.wait(function (err, data) {
          assert.equal(file.contents.toString("utf8"), '"a":{"bA":"12px","b":{"xun":"control",}};"c":{"d":"wer",}');
          done();
        }));
      });
    });
  });
});
