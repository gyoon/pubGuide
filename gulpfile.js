var gulp = require ('gulp'),
    sass = require ('gulp-sass'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    filter = require('gulp-filter'),
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
        .src([
            'bower_components/angular-bootstrap-toggle-switch/style/bootstrap3/angular-toggle-switch-bootstrap-3.css',
            'bower_components/chosen/chosen.css',
            'bower_components/bootstrap-daterangepicker/daterangepicker.css',
            'bower_components/angular-bootstrap/ui-bootstrap-csp.css',
            'bower_components/bootstrap/dist/css/bootstrap.min.css',
            'bower_components/angular-ui-select/dist/select.min.css',
            'bower_components/angular-datatables/dist/css/angular-datatables.css',
            'bower_components/ng-tags-input/ng-tags-input.min.css',
            'bower_components/nvd3/build/nv.d3.min.css',
            'bower_components/nvd3/build/nv.d3.min.css.map'])
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest(target.dest +'scss'));

    gulp
        .src([
            'bower_components/bootstrap/fonts/*.eot',
            'bower_components/bootstrap/fonts/*.svg',
            'bower_components/bootstrap/fonts/*.ttf',
            'bower_components/bootstrap/fonts/*.woff',
            'bower_components/bootstrap/fonts/*.woff2'])
        .pipe(fontFilter)
        .pipe(gulp.dest(target.dest +'fonts'));
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
        .pipe(reload({stream:true}));
});

gulp.task('lib', [ 'clean' ], function() {
    return gulp
        .src(target.bowerComponents + target.libFiles)
        .pipe(gulp.dest(target.dest +'lib'));
});

gulp.task('javascript', [ 'clean' ], function() {
    gulp
        .src(target.main + target.jsSrc)
        .pipe(gulp.dest(target.dest + '/view'))
        .pipe(reload({stream:true}));
    gulp
        .src(target.main + target.indexJsSrc)
        .pipe(gulp.dest(target.dest))
        .pipe(reload({stream:true}));
    gulp
        .src(target.main + target.guideJsSrc)
        .pipe(gulp.dest(target.dest + '/guide'))
        .pipe(reload({stream:true}));
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

    gulp.watch('app/scss/**/*.scss', ['scss']);
    gulp.watch('app/**/*.js', ['javascript']);
    gulp.watch('app/**/*.html', ['html']);

    gulp.watch('build/**/*.html').on('change', reload);

});

gulp.task('build', ['resource', 'html', 'javascript', 'vendor', 'scss', 'lib'], function(){

});