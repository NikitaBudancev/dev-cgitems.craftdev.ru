const { src, dest, watch, parallel } = require('gulp');

const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify-es').default;
const concat = require('gulp-concat');
// const imagemin = require('gulp-imagemin');

function scss() {
    return src('src/scss/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 version'],
            grid: true
        }))
        .on('error', sass.logError)
        .pipe(dest('dist/css'))
}

function scripts() {
    return src([
        'node_modules/jquery/dist/jquery.js',
        'node_modules/owl.carousel/dist/owl.carousel.js',
        'src/js/app.js'
    ])
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(dest('dist/js'))
}

// function images() {
//     return src('images/**/*')
//         .pipe(imagemin([
//             imagemin.gifsicle({ interlaced: true }),
//             imagemin.mozjpeg({ quality: 75, progressive: true }),
//             imagemin.optipng({ optimizationLevel: 5 }),
//             imagemin.svgo({
//                 plugins: [
//                     { removeViewBox: true },
//                     { cleanupIDs: false }
//                 ]
//             })
//         ]))
//         .pipe(dest('dist/images'))
// }

function watching() {
    watch(['src/**/*.scss'], scss);
    watch(['src/js/**/*.js'], scripts);
}

exports.scss = scss;
exports.scripts = scripts;
exports.watching = watching;
// exports.images = images;

exports.default = parallel(scripts, watching);