var gulp = require('gulp'),
  less = require('gulp-less'),
  autoprefixer = require('gulp-autoprefixer'),
  cleancss = require('gulp-clean-css'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename');


gulp.task('styles', function () {
  gulp.src('less/*.less')
    .pipe(less())
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8'))
    .pipe(gulp.dest('css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(cleancss({
      compatibility: 'ie8',
      keepSpecialComments: '*'
    }))
    .pipe(gulp.dest('css'));
});


gulp.task('scripts', function () {
  gulp.src('js/*.js')
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('js'));
});


gulp.task('watch', function() {
  gulp.watch('less/*.less', ['styles']);
  gulp.watch('js/*.js', ['scripts']);
});

gulp.task('default', ['styles', 'scripts']);


