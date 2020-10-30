/* Variables */
const gulp = require('gulp'); // Таск-менеджер Gulp
const sass = require('gulp-sass'); // Препроцессор Sass
const browserSync = require('browser-sync'); // Сервер для работы и автоматического обновления страниц
const notify = require("gulp-notify"); // Плагин для информирование о найденных ошибках
const rename = require('gulp-rename'); // Плагин для переименования файлов
const autoprefixer = require('gulp-autoprefixer'); // Плагин для автоматической расстановки префиксов
const cleanCSS = require('gulp-clean-css'); // Плагин для минимизации CSS с использованием clean-css
const concat = require('gulp-concat'); // Плагин для конкатенации файлов
const del = require('del'); // Плагин для удаления файлов и каталогов
const imagemin = require('gulp-imagemin'); // Плагин для сжатия JPEG, GIF и SVG изображений
const cache = require('gulp-cache'); // Плагин для кэширования
const imageminpngquant = require('imagemin-pngquant'); // Плагин для сжатия PNG изображений
const jpegrecompress = require('imagemin-jpeg-recompress'); // Плагин для сжатия JPEG
const uglify = require('gulp-uglify-es').default; //Плагин для минификации js-файлов
const webpack = require('webpack');
const webpackStream = require('webpack-stream'); // webpack с интеграцией с gulp

/* Sass */

gulp.task('sass', function () {
	return gulp.src('app/sass/**/*.sass')
		.pipe(sass({
			outputStyle: 'expanded'
		}).on("error", notify.onError()))
		.pipe(rename({
			suffix: '.min',
			prefix: ''
		}))
		.pipe(autoprefixer(['last 15 versions']))
		.pipe(cleanCSS())
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.stream());
});

/* Browser-sync */

gulp.task('browser-sync', function () {
	browserSync.init({
		server: {
			baseDir: 'app'
		},
		notify: false,
	});
});

/* browserSyncHTML */

gulp.task('codeHTML', function () {
	return gulp.src('app/*.html')
		.pipe(browserSync.stream());
});

/* CommonJS */

gulp.task('common-js', function () {
	return gulp.src([
			'app/CommonJs/Build.js',
		])
		.pipe(webpackStream(require('./webpack.config.js'), webpack))
		// .pipe(uglify())
		.pipe(gulp.dest('app/js'))
		.pipe(browserSync.stream());
});

/* libsJS */

gulp.task('libs-js', function () {
	return gulp.src([
			'app/libsBower/three.js/build/three.min.js',
			'app/libsBower/vanta/dist/vanta.waves.min.js',
			'app/libsBower/vantaConfig/vantaConfig.js',
		])
		.pipe(gulp.dest('app/libs'))
		.pipe(browserSync.stream());
});

/* Imagemin */

gulp.task('imagemin', function () {
	return gulp.src('app/images/**/*')
		.pipe(cache(imagemin([ // сжатие изображений
			imagemin.gifsicle({
				interlaced: true
			}),
			jpegrecompress({
				progressive: true,
				max: 90,
				min: 80
			}),
			imageminpngquant(),
			imagemin.svgo({
				plugins: [{
					removeViewBox: false
				}]
			})
		])))
		.pipe(gulp.dest('dist/images/')); // выгрузка готовых файлов
});

// /* CodeJS */

// gulp.task('codeJS', gulp.parallel('common-js'), function () {
// 	return gulp.src([
// 			'app/libs/CommonJs/common.min.js', //CommonJs всегда в конце
// 		])
// 		.pipe(concat('script.min.js'))
// 		.pipe(gulp.dest('app/js'))
// 		.pipe(browserSync.stream());
// });

/* Watch */

gulp.task('watch', function () {
	gulp.watch('app/sass/**/*.sass', gulp.parallel('sass'));
	gulp.watch('app/CommonJs/**/*.js', gulp.parallel('common-js'));
	gulp.watch('app/*.html', gulp.parallel('codeHTML'));
});

/* Default (команда gulp) */

gulp.task('default', gulp.parallel('browser-sync', 'sass', 'common-js', 'libs-js', 'watch'));

/* Remove dist */

gulp.task('removedist', function () {
	return del(['dist']);
});

/* Build Files */

gulp.task('dist', function () {

	var buildFiles = gulp.src([
		'app/*.html',
		//	'app/.htaccess',
	]).pipe(gulp.dest('dist'));

	var buildCss = gulp.src([
		'app/css/main.min.css',
	]).pipe(gulp.dest('dist/css'));

	var buildJs = gulp.src([
		'app/js/scripts.min.js',
	]).pipe(gulp.dest('dist/js'));

	var buildFonts = gulp.src([
		'app/fonts/**/*',
	]).pipe(gulp.dest('dist/fonts'));


	return buildFiles, buildCss, buildJs, buildFonts;

});

/* Built */

gulp.task('build', gulp.series('removedist', 'sass', 'common-js', 'dist', 'imagemin'));

/* Clear cache */

gulp.task('clearcache', function () {
	return cache.clearAll();
});