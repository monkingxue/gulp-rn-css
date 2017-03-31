# [gulp][gulp]-rn-css  [![NPM version](https://badge.fury.io/js/gulp-rn-css.svg)](http://badge.fury.io/js/gulp-rn-css)

> a gulp plugin to transform css/nest-css file to javascript object in react-native.

## Tips

Hello guys,this is a plugin but its function is not perfect, so I will imporve this plugin, please read the usage carefully.

## Installation v0.0.1-test 修改

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
        .pipe(rnCss())
        .pipe(gulp.dest('dist/style'))
});
```

## Compile

### before:
```css
.item-get {
	display: flex;
	margin-left: 4px;
	flex-direction: row
}

.item-title {
	padding-top: 4px;
	height: 100px;
	.item-control: {
		border-top: 1px;
		border-color: #fff;
	}
}
```
### after:
```js 
module.exports = {
    "itemGet":{
        "display":"flex",
        "marginLeft":"4",
        "flexDirection":"row",
    },
    "itemTitle":{
        "paddingTop":"4",
        "height":"100",
        "itemControl":{
            "borderTop":"1",
            "borderColor":"#fff",
        }
     }
}
```

## Contributing

Pull requests are welcome. If you add functionality, then please add unit tests
to cover it.

## License

MIT © [monkingxue](https://github.com/monkingxue)

[gulp]: https://github.com/gulpjs/gulp
[npm]:  http://badge.fury.io/js/gulp-rn-css
