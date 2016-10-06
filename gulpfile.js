var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    sass = require('gulp-sass'),
    reload = browserSync.reload,
    bower = require('gulp-bower'),
    filesort = require('gulp-angular-filesort'),
    inject = require('gulp-inject'),
    merge = require('merge-stream'),
    wiredep = require('wiredep').stream
    minifycss   = require('gulp-minify-css'),
    annotate    = require('gulp-ng-annotate'),
    rename      = require('gulp-rename'),
    usemin      = require('gulp-usemin'),
    uglify = require('gulp-uglify'),
    del = require('del');

// usar ng-annotate al escribir el task de build.
    
var globs = {
    styles: 'app/styles/**/*.scss',
    html: 'app/**/*.html',
    js: 'app/scripts/**/*.js',
    assets: [
        './app/fonts/**/*',
        './app/images/**/*',
        './app/views/**/*'
    ]
};

var fontExts = ['eot', 'ttf', 'woff', 'woff2', 'otf'];

gulp.task('install', ['bower']);

gulp.task('sass', function () {
    return gulp.src(globs.styles)
        .pipe(sass())
        .pipe(gulp.dest('app/styles'))
        .pipe(reload({ stream: true }));
});

gulp.task('bower', function () {
    return bower({ cmd: 'install' })
        .pipe(gulp.dest('app/bower_components'));
});

gulp.task('wiredep', ['bower'], function () {
    return gulp.src('app/index.html')
        .pipe(wiredep({
            directory: 'app/bower_components'
        }))
        .pipe(gulp.dest('app/'));
});

gulp.task('inject', ['wiredep'], function () {
    var js = gulp.src(globs.js).pipe(filesort());
    var scss = gulp.src(globs.styles);
    return gulp.src('app/index.html')
        .pipe(inject(merge(js, scss), {
            relative: true
        }))
        .pipe(gulp.dest('app/'));
});

gulp.task('ngdocs', [], function () {
  var gulpDocs = require('gulp-ngdocs');
  var options = {
    html5Mode: true,
    startPage: '/api',
    title: "Prueba Pilito",
    titleLink: "/api"
  };
  return gulp.src('app/scripts/**/*.js')
    .pipe(gulpDocs.process(options))
    .pipe(gulp.dest('./docs'));
});

gulp.task('serve', ['sass', 'inject'], function () {
    browserSync({
        server: {
            baseDir: 'app'
        },
        port: 8083,
        ui: {
            port: 8084
        }
    });

    gulp.watch('/bower_components', ['bower']);

    gulp.watch(globs.styles, ['sass']);
    gulp.watch([globs.html, globs.js])
        .on('change', reload);
});

gulp.task('fonts', [], function () {
    return gulp.src(fontExts.map(function (ext) {
        return 'app/styles/**/*.' + ext;
    }))
    .pipe(rename({
        dirname: ''
    }))
    .pipe(gulp.dest('app/fonts/'));
});

gulp.task('mv',['fonts','usemin'], function () {
    return gulp.src(globs.assets,{base:'app'})
      .pipe(gulp.dest('dist/'));
});

gulp.task('usemin', ['install'], function () {
    return gulp.src('app/index.html')
        .pipe(usemin({
            css: [minifycss(), 'concat'],
            scss: [minifycss(), 'concat'],
            app: [annotate()],
            vendor: [uglify],
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('clean',function(){
    return del(['dist/**/*']);
});


gulp.task('build', ['clean','sass','usemin', 'mv']);

gulp.task('default', ['serve']);
