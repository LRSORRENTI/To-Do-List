const gulp = require('gulp');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');

gulp.task('css', function () {
    return gulp.src('./src/**/*.postcss')
        .pipe(postcss())
        .pipe(rename({ extname: '.css' }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('default', gulp.series('css'));
