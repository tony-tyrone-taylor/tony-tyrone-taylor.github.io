const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-ruby-sass');
const prefix = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const gulpWebpack = require('gulp-webpack');
const notify = require('gulp-notify');
const imagemin = require('gulp-imagemin');
const errorLog = (error)=>{
	console.bind.error(error);
	this.emit('end');
}

gulp.task('browser-sync',[],()=>{
	browserSync.init(null,{
		proxy:'http://tony-tyrone-taylor.github.io.local/',
		port:7000,
		browser:'chrome',
		files:[
			'./dist/css/*.css',
			'./dist/js/*.js',
      './index.html'
		]
	})
});
gulp.task('copy-css-libraries',()=>{

  gulp.src('./node_modules/bootstrap/dist/css/bootstrap.css')
	.pipe(concat('_bootstrap.scss'))
	.pipe(gulp.dest('./src/scss/helpers/'));

	gulp.src('./node_modules/font-awesome/css/font-awesome.css')
  .pipe(concat('_font-awesome.scss'))
  .pipe(gulp.dest('./src/scss/helpers/'));

  gulp.src('./node_modules/font-awesome-animation/dist/font-awesome-animation.css')
  .pipe(concat('_font-awesome-animation.scss'))
  .pipe(gulp.dest('./src/scss/helpers/'));

  gulp.src('./node_modules/animate.css/animate.css')
  .pipe(concat('_animate.scss'))
  .pipe(gulp.dest('./src/scss/helpers/'));

});
gulp.task('copy-fonts',()=>{

  gulp.src('node_modules/bootstrap/fonts/*')
	.pipe(gulp.dest('./dist/fonts/'));

	gulp.src('node_modules/font-awesome/fonts/*')
	.pipe(gulp.dest('./dist/fonts/'));

});
gulp.task('sass',()=>{

	const style = 'compressed';

  return sass([
		'src/scss/**/*.scss'
	],{
		style:style
	})
	.on('error',errorLog)
	.pipe(prefix('last 2 versions'))
	.pipe(gulp.dest('./dist/css/'))
	.pipe(notify('Sass files '+style));

});
gulp.task('copy-scripts',()=>{

  gulp.src([
		'node_modules/jquery/dist/jquery.js',
		'node_modules/bootstrap/dist/js/bootstrap.js'
	])
	.pipe(concat('scripts.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('./dist/js/'))
	.pipe(notify('javascripts compressed'));

});
gulp.task('webpack',()=>{

	return gulp.src('/src/app/main.ts')
	.pipe(gulpWebpack(require('./webpack.config.js')))
	.pipe(gulp.dest('./dist/js/'))
	.pipe(notify('webpack done.'));

});

gulp.task('imagemin',()=>{
	gulp.src('./src/images/*')
	.pipe(imagemin({progressive:true,optimizationLevel:7}))
	.pipe(gulp.dest('./dist/imgs'))
	.pipe(notify('Image(s) compressed'))
});

gulp.task('bootstrap',['copy-css-libraries','copy-fonts','copy-scripts','imagemin']);

gulp.task('watch',()=>{

	gulp.watch('gulpfile.js',[]);

  gulp.watch(['./src/scss/**/*.scss','./src/scss/*.scss'],['sass']);

  gulp.watch([
		'./src/app/**/**/**/*.ts',
    './src/app/**/**/**/*.css',
    './src/app/**/**/**/*.html',
		'./src/app/**/**/*.ts',
    './src/app/**/**/*.css',
    './src/app/**/**/*.html',
		'./src/app/**/*.ts',
    './src/app/**/*.css',
    './src/app/**/*.html',
		'./src/app/*.ts',
	],['webpack']);

	gulp.watch(['./src/imgs/*'],['imagemin'])

});

gulp.task('default',['browser-sync','bootstrap','watch']);
