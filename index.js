var compiler = require("./compiler");
var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;

var PLUGIN_NAME = 'gulp-react-native-css';

module.exports = function gulpRNTransformCSS() {

  return through.obj(function (file, enc, cb) {

    if (file.isNull()) {
      throw new PluginError(PLUGIN_NAME, "filename is not allowed to be null.")
    }

    if (file.isStream()) {
      this.emit('error', new Error(PLUGIN_NAME + ': Streaming not supported'));
      return cb();
    }

    if (file.isBuffer()) {
      file.contents = new Buffer(compiler(file.contents.toString()));
    }

    this.push(file);
    cb();
  });
};