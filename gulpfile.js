import gulp from 'gulp';

import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import uglify from 'gulp-uglify';
import babel from 'gulp-babel';
import concat from 'gulp-concat';
import imagemin from 'gulp-imagemin';
import webp from 'gulp-webp';
import webpHtml from 'gulp-webp-html';
import webpCss from 'gulp-webp-css';
import fileInclude from 'gulp-file-include';
import tildeImporter from 'node-sass-tilde-importer';
import browserSync from 'browser-sync';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';


function server() {
    browserSync.init({
        server: {
            baseDir: './dist'
        }
    });
}

function html() {
    return gulp.src('src/html/*.html')
        .pipe(fileInclude())
        .pipe(webpHtml())
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.stream())
}

const sass = gulpSass(dartSass);

function scss() {
    return gulp.src('src/scss/*.scss')
        .pipe(sass({ outputStyle: 'compressed', importer: tildeImporter }))
        .pipe(webpCss())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 version'],
            grid: true
        }))
        .on('error', sass.logError)
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream())
}

function scripts() {
    return gulp.src([
        'node_modules/jquery/dist/jquery.js',
        'node_modules/slick-carousel/slick/slick.js',
        'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js',
        'src/js/mesonry.js',
        'src/js/app.js'
    ])
        .pipe(concat('app.js'))
        .pipe(babel())
        .pipe(webpackStream({mode: "development"}))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream())
}

function images() {
    return gulp.src('src/images/**/*')
        .pipe(webp())
        .pipe(gulp.dest('dist/images'))
        .pipe(src('src/images/**/*'))
        .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.mozjpeg({ quality: 75, progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({
                plugins: [
                    { removeViewBox: true },
                    { cleanupIDs: false }
                ]
            })
        ]))
        .pipe(gulp.dest('dist/images'))
        .pipe(browserSync.stream())
}

function watching() {
    gulp.watch(['src/html/**/*.html'], html);
    gulp.watch(['src/**/*.scss'], scss);
    gulp.watch(['src/js/**/*.js'], scripts);
}

export { scss, scripts, watching, images, html }

export default gulp.series(scss, scripts, html, gulp.parallel(watching, server));