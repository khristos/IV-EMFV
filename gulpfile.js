var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync').create();
var del = require('del');
// Create an electron-connect server to enable reloading
//var electron = require('electron-connect').server.create();
//http://lukasholoubek.com/configuring-an-electron-development-environment/

var sourceDirectory = './src';
var targetDirectory  = './dist';

// Clean 'dist'
gulp.task('clean', function() {
  return del(['dist/*.html', 'dist/assets/images']);
});

gulp.task('css', function() {
	return gulp.src(sourceDirectory + '/assets/sass/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest(targetDirectory + '/assets/css'))
		.pipe(browserSync.stream())
});

gulp.task('images', function() {
	return gulp.src(sourceDirectory + '/assets/images/**/*')
		.pipe(imagemin())
		.pipe(gulp.dest(targetDirectory + '/assets/images'))
});
gulp.task('packages', function() {
	return gulp.src(sourceDirectory + '/packages/**/*')
		.pipe(gulp.dest(targetDirectory + '/packages'))
});

gulp.task('copy', function() {
	return gulp.src(sourceDirectory + '/**/*.+(html|js)')
		.pipe(gulp.dest('dist'))
		.pipe(browserSync.stream())
});

gulp.task('browserSync', function() {
	browserSync.init({
		server: {
			baseDir: 'dist'
		}
	})
});

gulp.task('watch', ['browserSync', 'css'], function() {
	gulp.watch(sourceDirectory + '/assets/sass/**/*.scss', ['css'])
	gulp.watch(sourceDirectory + '/**/*.+(html|js)', ['copy'])
});



gulp.task('start', ()=>{
	electron.start();
	//Watch js files and restart Electron if they change
	gulp.watch(['./app/js/*.js'], electron.restart);
	//watch css files, but only reload (no restart necessary)
	gulp.watch(['./app/css/*.css'], electron.reload);
	//watch html
	gulp.watch(['./index.html'], electron.reload);
});

/*gulp.task('name', function() {
	return gulp.src('source-folder/sass/styles.scss')
		.pipe(function)
		.pipe(anotherFunction)
		.pipe(gulp.destination('destination-folder'))
});*/