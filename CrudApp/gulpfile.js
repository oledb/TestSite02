/// <binding BeforeBuild='build' Clean='clean' />
"use strict";

var gulp = require("gulp"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
    gutil = require("gulp-util"),
    ts = require("gulp-typescript");

var paths = {
    webroot: "./wwwroot/"
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

gulp.task("clean:js", function (cb) {
    rimraf(paths.concatJsDest, cb);
});

gulp.task("clean", ["clean:js"]);

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