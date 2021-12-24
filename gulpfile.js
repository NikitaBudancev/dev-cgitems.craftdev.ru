const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', () => {
    return gulp.src('src/scss/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(autoprefixer('last 2 versions'))
        .on('error', sass.logError)
        .pipe(gulp.dest('dist/css'))
});

gulp.task('sass:watch', function () {
    gulp.watch('src/**/*.scss', gulp.parallel('sass'));
});
