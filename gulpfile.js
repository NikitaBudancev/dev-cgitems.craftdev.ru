const { src, dest, watch, parallel, series } = require('gulp');

const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify-es').default;
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const webpHtml = require('gulp-webp-html');
const webpCss = require('gulp-webp-css');
const fileInclude = require('gulp-file-include');
const tildeImporter = require('node-sass-tilde-importer');
const browserSync = require('browser-sync').create();

function server() {
    browserSync.init({
        server: {
            baseDir: './dist'
        }
    })
}

function html() {
    return src('src/html/*.html')
        .pipe(fileInclude())
        .pipe(webpHtml())
        .pipe(dest('dist/'))
        .pipe(browserSync.stream())
}

function scss() {
    return src('src/scss/*.scss')
        .pipe(sass({ outputStyle: 'compressed', importer: tildeImporter }))
        .pipe(webpCss())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 version'],
            grid: true
        }))
        .on('error', sass.logError)
        .pipe(dest('dist/css'))
        .pipe(browserSync.stream())
}

function scripts() {
    return src([
        'node_modules/jquery/dist/jquery.js',
        'node_modules/slick-carousel/slick/slick.js',
        'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js',
        'src/js/mesonry.js',
        'src/js/app.js'
    ])
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(dest('dist/js'))
        .pipe(browserSync.stream())
}

function images() {
    return src('src/images/**/*')
        .pipe(webp())
        .pipe(dest('dist/images'))
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
        .pipe(dest('dist/images'))
        .pipe(browserSync.stream())
}

function watching() {
    watch(['src/html/**/*.html'], html);
    watch(['src/**/*.scss'], scss);
    watch(['src/js/**/*.js'], scripts);
}

exports.scss = scss;
exports.scripts = scripts;
exports.watching = watching;
exports.images = images;
exports.html = html;

exports.default = series(scss, scripts, html, parallel(watching, server));