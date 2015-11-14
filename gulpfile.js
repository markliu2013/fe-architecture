var gulp = require('gulp'),
    less = require('gulp-less'),
    autoprefix = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    cache = require('gulp-cache'),
    sourcemaps = require('gulp-sourcemaps'),
    htmlreplace = require('gulp-html-replace'),
    htmlmin = require('gulp-htmlmin'),
    del = require('del');

gulp.task('css', function() {
    gulp.src('less/*.less')
        .pipe(less())
        .pipe(autoprefix({ browsers: ['> 1%', 'last 2 versions'] }))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/css'));
});
gulp.task('js', function() {
    gulp.src(['bower_components/jquery/dist/jquery.min.js', 'js/jquery.fancyCountdown.min.js', 'js/swipe.js'])
        //.pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        //.pipe(rename({suffix: '.min'}))
        //.pipe(uglify())
        //.pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest('dist/js'));
});
gulp.task('html', function() {
    gulp.src('index-pc.html')
        .pipe(htmlreplace({
            'css': 'css/main.min.css',
            'js': 'js/main.js'
        }))
        .pipe(gulp.dest('dist'))
        //.pipe(htmlmin({collapseWhitespace: true, conservativeCollapse:false, preserveLineBreaks:false, removeComments: true, removeCommentsFromCDATA: true}))
        .pipe(gulp.dest('dist'));
    ;
});
// Copy all other files to dist directly
gulp.task('copy', function() {
    //copy images
    gulp.src('img/*')
        .pipe(gulp.dest('dist/img'));
    //copy fonts
    gulp.src(['less/*.eot','less/*.svg','less/*.ttf','less/*.woff'])
        .pipe(gulp.dest('dist/css'));
});
gulp.task('clean', function(cb) {
    del(['dist'], cb);
});
gulp.task('watch', function() {
    gulp.watch('less/*.less', ['css']);
    gulp.watch('js/*.js', ['js']);
    gulp.watch('*.html', ['html']);
    gulp.watch('images/**/*', ['images']);
});
gulp.task('default', ['clean', 'css', 'js', 'html', 'copy']);
