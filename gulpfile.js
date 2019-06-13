var gulp         = require('gulp');
var concatCss    = require('gulp-concat-css');
var uncss        = require('gulp-uncss');
var concat       = require('gulp-concat');
var sass         = require('gulp-sass');
var browserSync  = require('browser-sync');
var uglify       = require('gulp-uglifyjs');
var cssnano      = require('gulp-cssnano');
var del          = require('del');
var imagemin     = require('gulp-imagemin');
var pngquant     = require('imagemin-pngquant');
var cache        = require('gulp-cache');
var autoprefixer = require('gulp-autoprefixer');
var pug          = require('gulp-pug');
let cleanCSS     = require('gulp-clean-css');

 
gulp.task('css', function () {
  return gulp.src('app/css/*.css')
    .pipe(concatCss("/libs.min.css"))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(uncss({
      html: ['app/index.html']
    }))
    .pipe(gulp.dest('app/css/'));
});
gulp.task('css-libs', ['sass'], function() {
  return gulp.src('app/css/libs.min.css')
  .pipe(cssnano())
  .pipe(gulp.dest('app/css'));
});

gulp.task('scripts', function() {
  return gulp.src([
    'app/libs/jquery/dist/jquery.min.js',
    'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js',
    'app/libs/slick-carousel/slick/slick.min.js',
    ])
  .pipe(concat('libs.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('app/js'));
});

gulp.task('sass', function() {
  return gulp.src('app/scss/*.scss')
    .pipe(sass())
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}))
});
gulp.task('pug', function() {
  return gulp.src('app/pug/**/*.pug')
  .pipe(pug({pretty: true}))
  .pipe(gulp.dest('app/'))
  .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: 'app'
    },
    notify: false
  });
});

gulp.task('clean', function() {
  return del.sync('dist');
});
gulp.task('clear', function() {
  return cache.clearAll();
});

gulp.task('img', function() {
  return gulp.src('app/img/**/*')
    .pipe(cache(imagemin({
      interlaced: true,
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      une: [pngquant()]
    })))
    .pipe(gulp.dest('dist/img'));
});

gulp.task('watch', ['browser-sync', 'pug', 'css', 'scripts'], function() {
  gulp.watch('app/scss/*.scss', ['sass']);
  gulp.watch('app/*.html');
  gulp.watch('app/js/**/*.html', ['scripts']);
  gulp.watch('app/pug/**/*.pug', ['pug']);
});

gulp.task('build', ['clean', 'sass', 'scripts'] ,function() {
  
  var buildCss = gulp.src([
      'app/css/style.css',
      'app/css/libs.min.css',
    ])
    .pipe(gulp.dest('dist/css'));

  var buildIco = gulp.src('app/*.ico')
    .pipe(gulp.dest('dist'));

  var buildJs = gulp.src('app/js/**/*')
    .pipe(gulp.dest('dist/js'));

  var buildImg = gulp.src('app/img/**/*')
    .pipe(gulp.dest('dist/img'));

  var buildLibs = gulp.src('app/libs/**/*')
    .pipe(gulp.dest('dist/libs'));

  var buildHtml = gulp.src('app/*.html')
    .pipe(gulp.dest('dist'));
  var buildPlagins = gulp.src('app/plugins/**/*')
    .pipe(gulp.dest('dist/plugins'));

});