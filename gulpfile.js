const gulp = require('gulp');

const { src, dest, watch, parallel } = require('gulp');

const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');

function scss() {
    return src('src/scss/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(autoprefixer('last 2 version'))
        .on('error', sass.logError)
        .pipe(dest('dist/css'))
}

function scssWatch() {
    watch(['src/**/*.scss'], parallel(scss));
}

exports.scss = scss;
exports.scssWatch = scssWatch;