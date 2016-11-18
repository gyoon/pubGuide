var gulp = require ('gulp'),
    sass = require ('gulp-sass'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    filter = require('gulp-filter'),
    flatten = require('gulp-flatten'),
    browserSync = require ('browser-sync'),
    reload = browserSync.reload;

var target = {
    main :'app',
    sassSrc : '/scss/*.scss',
    resourceSrc : '/resource/**/*',
    htmlSrc : '/**/*.html',
    jsSrc : '/view/**/*.js',
    indexJsSrc : '/*.js',
    guideJsSrc : '/guide/**/*.js',
    dest : 'build/',
    bowerComponents : 'bower_components',
    libFiles : '/**/*'
};

gulp.task ('scss', [ 'clean' ], function (){
    gulp.src(target.main + target.sassSrc)
        .pipe(sass({/*outputStyle: 'compressed'*/}).on('error', sass.logError))
        .pipe(gulp.dest(target.dest +'scss'))
        .pipe(reload({stream:true}));
});

gulp.task('vendor', [ 'clean' ], function() {
    var fontFilter = filter([ 'bower_components/**/*.eot', 'bower_components/**/*.svg', 'bower_components/**/*.ttf', 'bower_components/**/*.woff', 'bower_components/**/*.woff2' ], {restore: true});
    gulp
        .src(['bower_components/nvd3/build/nv.d3.min.css', 'bower_components/nvd3/build/nv.d3.min.css.map'])
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest(target.dest +'scss'));

    gulp
        .src(['bower_components/font-awesome/**/*.eot', 'bower_components/font-awesome/**/*.svg', 'bower_components/font-awesome/**/*.ttf', 'bower_components/font-awesome/**/*.woff', 'bower_components/font-awesome/**/*.woff2'])
        .pipe(fontFilter)
        .pipe(gulp.dest(target.dest +'font'));
});

gulp.task('resource', [ 'clean' ], function() {
    gulp
        .src(target.main + target.resourceSrc)
        .pipe(gulp.dest(target.dest +'resource'));
});

gulp.task('html', [ 'clean' ], function() {
    gulp
        .src(target.main + target.htmlSrc)
        .pipe(gulp.dest(target.dest))
});

gulp.task('html-w', function() {
    gulp
        .src(target.main + target.htmlSrc)
        .pipe(gulp.dest(target.dest))
});

gulp.task('resource-w', function() {
    gulp
        .src(target.main + target.resourceSrc)
        .pipe(gulp.dest(target.dest +'resource'));
});


gulp.task('html-watch', ['html-w', 'resource-w'], function (done) {
    reload
    done();
});

gulp.task('lib', [ 'clean' ], function() {
    return gulp
        .src(target.bowerComponents + target.libFiles)
        .pipe(gulp.dest(target.dest +'lib'));
});

gulp.task('javascript', [ 'clean' ], function() {
    gulp
        .src(target.main + target.jsSrc)
        .pipe(gulp.dest(target.dest + '/view'));
    gulp
        .src(target.main + target.indexJsSrc)
        .pipe(gulp.dest(target.dest));
    gulp
        .src(target.main + target.guideJsSrc)
        .pipe(gulp.dest(target.dest + '/guide'));
});


gulp.task( 'clean', function() {
    return gulp
        .src([ 'tmp', target.dest ], { read: false })
        .pipe( clean({ force: true }));
});

gulp.task('dev', ['resource', 'html', 'javascript', 'vendor', 'scss', 'lib'], function() {

    browserSync.init({
        server: './build'
    });

    gulp.watch('app/scss/*.scss', ['scss']);
    gulp.watch('app/**/*.html', ['html-watch']);
    gulp.watch('app/**/*.html').on('change', reload);
});

gulp.task('build', ['resource', 'html', 'javascript', 'vendor', 'scss', 'lib'], function(){

});