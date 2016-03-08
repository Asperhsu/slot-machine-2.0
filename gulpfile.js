var gulp = require('gulp');
var sass = require('gulp-sass');
var notify = require("gulp-notify");
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var path = {
	js: 'src/js/*.js',
	react: 'src/react/*.js',
	styles: 'src/scss/*.scss',
}

gulp.task('default', ['styles', 'react', 'js']);

gulp.task('watch', function () {
	gulp.watch('src/scss/**/*.scss', ['styles']);
	gulp.watch(path.react, ['react']);
	gulp.watch(path.js, ['js']);
});

gulp.task('js', function () {
	gulp.src(path.js)
	.pipe(concat('all.js'))
	.pipe(uglify())
	.pipe(gulp.dest('js'))
	.pipe(notify("js complie success"));
});

gulp.task('react', function () {
	gulp.src(path.react)
	.pipe( babel( {presets: ['es2015', 'react']} ) )
	.on('error', notify.onError(function (error) {
		return "Error: " + error.message;
	}))
	.pipe(concat('react.js'))
	.pipe(uglify())
	.pipe(gulp.dest('js'))
	.pipe(notify("react complie success"));
});

gulp.task('styles', function () {
	gulp.src(path.styles)
	.pipe(sass())
	.pipe(gulp.dest('css'))
	.pipe(notify("scss complie success"));
});