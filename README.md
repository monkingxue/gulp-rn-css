# [gulp][gulp]-rn-css 

> a gulp-plugin to transform scss/sass/css/less file to javascript object

## Installation

Install via [npm](https://www.npmjs.com/package/gulp-rn-css):

```
npm install gulp-rn-css --save-dev
```

## Example

```js
var gulp = require('gulp');
var rnCss  = require('gulp-rn-css');

gulp.task('default', function() {
    return gulp.src('style/*.scss')
        .pipe(rnCss)
        .pipe(gulp.dest('dist/style'))
});
```

## Contributing

Pull requests are welcome. If you add functionality, then please add unit tests
to cover it.

## License

MIT © [monkingxue](https://github.com/monkingxue)

[gulp]: https://github.com/gulpjs/gulp
[npm]:  http://badge.fury.io/js/gulp-rn-css
