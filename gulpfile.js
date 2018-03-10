const gulp = require('gulp')
const browserify = require('browserify')
const source = require('vinyl-source-stream')
const tsify = require('tsify')

const less = require('gulp-less')
const prefix = require('gulp-autoprefixer')
const cssmin = require('gulp-cssmin')

const uglify = require('gulp-uglify')
const buffer = require('vinyl-buffer')
const plumber = require('gulp-plumber')

const processTs = debug => {
	return browserify({
		basedir: '.',
		debug: debug,
		entries: ['src/ts/main.ts'],
		cache: {},
		packageCache: {}
	})
		.plugin(tsify)
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(buffer())
		.pipe((() => debug ? buffer() : uglify())())
		.pipe(gulp.dest('dist'))
}

gulp.task('copy-html', () => {
	return gulp.src('src/*.html')
		.pipe(gulp.dest('dist'))
})

gulp.task('less', () => {
	return gulp.src('src/less/styles.less')
		.pipe(plumber())
		.pipe(less({
			paths: ['src/less']
		}))
		.pipe(prefix('last 8 version', '> 1%'), { cascade: true })
		.pipe(cssmin().on('error', error => {
			console.log(error)
		}))
		.pipe(gulp.dest('dist'))
})

gulp.task('watch-ts', () => {
	gulp.watch('src/**/*.ts', () => processTs(true))
})

gulp.task('watch-html', () => {
	gulp.watch('src/**/*.html', ['copy-html'])
})

gulp.task('watch-less', () => {
	gulp.watch('src/**/*.less', ['less'])
})

gulp.task('watch', ['watch-ts', 'watch-html', 'watch-less'])

gulp.task('dev', ['less', 'copy-html'], () => processTs(true))

gulp.task('default', ['less', 'copy-html'], () => processTs(false))
