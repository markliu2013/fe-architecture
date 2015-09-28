var gulp = require('gulp'),
    less = require('gulp-less'),
    autoprefix = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del');

gulp.task('css', function() {
    gulp.src('less/master.less')
        .pipe(less())
        .pipe(autoprefix({ browsers: ['> 1%', 'last 2 versions'] }))
        .pipe(gulp.dest('dist/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/css'))
        .pipe(notify({ message: 'Styles task complete' }));
});
gulp.task('js', function() {
    gulp.src('js/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(notify({ message: 'Scripts task complete' }));
});
gulp.task('images', function() {
    return gulp.src('images/**/*')
        .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(gulp.dest('dist/images'))
        .pipe(notify({ message: 'Images task complete' }));
});
gulp.task('clean', function(cb) {
    del(['dist/css', 'dist/js', 'dist/images'], cb)
});
gulp.task('watch', function() {
    gulp.watch('less/*.less', ['css']);
    gulp.watch('js/*.js', ['js']);
    gulp.watch('images/**/*', ['images']);
});
