// Определяем константы Gulp
// const { src, dest, series, parallel, watch } = require('gulp');
const gulp = require('gulp');

var sass = require('gulp-sass')(require('sass'));

// function sass() {
//     return src('src/sass/**/*.sass')     // берём все SASS-файлы 
//         .pipe(sass())                    // компилируем SASS в CSS 
//         .pipe(dest('dist/aseets/css/')); // выгружаем результат 
// }

// exports.sass = sass;

gulp.task('sass', () => {
    return gulp.src('src/scss/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        })
        .on('error', sass.logError))
        .pipe(gulp.dest('dist/css'))
        
});

gulp.task('sass:watch', function(){
    gulp.watch('src/**/*.scss', gulp.parallel('sass'));
  });