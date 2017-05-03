/// <binding BeforeBuild='build' Clean='clean' />
"use strict";

var gulp = require("gulp"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
    gutil = require("gulp-util"),
    ts = require("gulp-typescript"),
    jasmineBrowser = require('gulp-jasmine-browser'),
    watch = require('gulp-watch');

var paths = {
    webroot: "./wwwroot/",
    webrootlib: "./wwwroot/lib/"
};

var input = {
    typescript: "./Scripts/",
    typescriptTest: "./Scripts.test/"
};

paths.js = input.typescript + "core/**/*.js";
paths.jquery = paths.webroot + "lib/jQuery/dist/jquery.min.js";
paths.minJs = paths.webroot + "js/**/*.min.js";
paths.concatJsDest = paths.webroot + "site.min.js";
//TS Prod
paths.tsconfig = input.typescript + "tsconfig.json";
paths.jsOutput = input.typescript + "core/";
//TS Test
paths.tsconfigTest = input.typescriptTest + "tsconfig.json";
paths.jsOutputTest = input.typescriptTest;
paths.jsJasmine = input.typescriptTest + "*_spec.js";
paths.jsJasmineMocks = input.typescriptTest + "Mocks/*.js";

var vendor = {
    jQuery: paths.webrootlib +   "/jquery/dist/jquery.min.js",
    jasminjq: paths.webrootlib + "/jasmine-jquery/lib/jasmine-jquery.js"
};

gulp.task("compile:ts", function () {
    let tsProject = ts.createProject(paths.tsconfig); 
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest(paths.jsOutput));
});

gulp.task("compile:ts_test", function () {
    let tsProject = ts.createProject(paths.tsconfigTest); 
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest(paths.jsOutputTest));
});

gulp.task("clean:jsmin", function (cb) {
    rimraf(paths.concatJsDest, cb);
});

gulp.task("clean:jsts", function (cb) {
    rimraf(paths.js, cb);
});

gulp.task("clean", ["clean:jsmin", "clean:jsts"]);

gulp.task("min:js", function () {
    return gulp.src([ paths.jquery, paths.js, "!" + paths.minJs], { base: "." })
        .pipe(concat(paths.concatJsDest))
        .pipe(uglify())
        .on('error', gutil.log)
        .pipe(gulp.dest("."));
});

gulp.task("build", ['compile:ts'], function () {
    gulp.start("min:js");
});

gulp.task("test", ['compile:ts', "compile:ts_test"]);

gulp.task('jasmine', function () {
    return gulp.src([vendor.jQuery, vendor.jasminjq, paths.jsJasmine,
        paths.jsJasmineMocks, paths.js])
        .pipe(watch([paths.jsJasmine, paths.js, paths.jsJasmineMocks]))
        .pipe(jasmineBrowser.specRunner())
        .pipe(jasmineBrowser.server({ port: 80 }));
});