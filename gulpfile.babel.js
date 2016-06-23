import babel from "gulp-babel";
import concat from "gulp-concat"
import del from "del";
import gulp from "gulp";
import path from "path";
import runSequence from "run-sequence";

const dirs = {
  build: "build",
  es6: "src/**/*.js",
  json: "src/**/*/.json",
  html: "src/**/*.html",
  views: "src/views/**/*.js",
  libs: "src/views/libs/**"
};

const { build, es6, json, html, views, libs } = dirs;

gulp.task("copy:static", () =>
  gulp.src(html).pipe(gulp.dest(build)));

gulp.task("copy:libs", () =>
  gulp.src(libs).pipe(gulp.dest(path.join(build, "views", "libs"))));

gulp.task("build:express", () => {
  return gulp.src([es6, `!${views}`, `!${libs}`])
    .pipe(babel())
    .pipe(gulp.dest(build));
});

gulp.task("build:angular", () => {
  return gulp.src([views, `!${libs}`])
    .pipe(babel())
    .pipe(concat("views/app/app.js"))
    .pipe(gulp.dest(build));
});

gulp.task("clean", () => del([dirs.build]));

gulp.task("build", callback =>
  runSequence("clean", "copy:static", "copy:libs", "build:express", "build:angular", callback));

gulp.task("default", callback =>
  runSequence("clean", "build", callback));
