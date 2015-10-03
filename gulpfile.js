var gulp = require('gulp'),
    less = require('gulp-less'),
    autoprefix = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    cache = require('gulp-cache'),
    sourcemaps = require('gulp-sourcemaps'),
    htmlreplace = require('gulp-html-replace'),
    htmlmin = require('gulp-htmlmin'),
    del = require('del');

gulp.task('css', function() {
    gulp.src('less/master.less')
        .pipe(less())
        .pipe(autoprefix({ browsers: ['> 1%', 'last 2 versions'] }))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/css'));
});
gulp.task('js', function() {
    gulp.src(['js/jQuery.js', 'js/util.js', 'js/Grid.js', 'js/Bullet.js', 'js/Tank.js', 'js/NPCTank.js', 'js/MyTank.js', 'js/TankContainer.js', 'js/Game.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest('dist/js'));
});
gulp.task('images', function() {
    return gulp.src('images/**/*')
        .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(gulp.dest('dist/images'));
});
gulp.task('html', function() {
    gulp.src('index.html')
        .pipe(htmlreplace({
            'css': 'css/master.min.css',
            'js': 'js/main.min.js'
        }))
        .pipe(gulp.dest('dist'))
        .pipe(htmlmin({collapseWhitespace: true, conservativeCollapse:false, preserveLineBreaks:false, removeComments: true, removeCommentsFromCDATA: true}))
        .pipe(gulp.dest('dist'));
    ;
});
gulp.task('clean', function(cb) {
    del(['dist/*'], cb);
});
gulp.task('watch', function() {
    gulp.watch('less/*.less', ['css']);
    gulp.watch('js/*.js', ['js']);
    gulp.watch('*.html', ['html']);
    gulp.watch('images/**/*', ['images']);
});
gulp.task('default', ['clean', 'css', 'js', 'html']);
