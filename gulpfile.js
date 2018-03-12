const gulp = require('gulp')
const browserify = require('browserify')
const source = require('vinyl-source-stream')
const tsify = require('tsify')

const less = require('gulp-less')
const prefix = require('gulp-autoprefixer')
const cssmin = require('gulp-cssmin')

const uglify = require('gulp-uglify')
const buffer = require('vinyl-buffer')

const scripts = () => {
	return browserify({
		basedir: '.',
		debug: false,
		entries: ['./src/ts/main.ts'],
		cache: {},
		packageCache: {}
	})
	.plugin(tsify)
	.bundle()
	.on('error', error => {
		console.log('\x1b[31m' + '[' + error.name + ']: ' + '\x1b[0m', error.message)
	})
	.pipe(source('bundle.js'))
	.pipe(buffer())
	.pipe(uglify())
	.on('error', error => {
		console.log(error)
	})
	.pipe(gulp.dest('dist'))
}

const styles = () => {
	return gulp.src('src/less/styles.less')
		.pipe(less())
		.pipe(prefix('last 8 version', '> 1%'), { cascade: true })
		.pipe(cssmin())
		.pipe(gulp.dest('dist'))
}

const html = () => {
	return gulp.src('src/*.html')
		.pipe(gulp.dest('dist'))
}

exports.watch = () => {
	gulp.watch('src/ts/**/*.ts', scripts)
	gulp.watch('src/less/**/*.less', styles)
	gulp.watch('src/*.html', html)
}

gulp.task('default', gulp.series(gulp.parallel(styles, scripts, html)))
