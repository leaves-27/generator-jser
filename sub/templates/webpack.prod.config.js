var gulp         = require('gulp');
var fs           = require('fs');
var del          = require('del');
var connect      = require('gulp-connect');

var stylus = require('gulp-stylus');
var nib = require('nib');
var uglify = require('gulp-uglify');

var bower = require('gulp-bower');

var jsonObj = JSON.parse(fs.readFileSync('./package.json'));

//基础变量
var paths = {
  name : jsonObj.name,
  version : jsonObj.version,
  src:"./src",
  build : './build/' + jsonObj.name
}

gulp.task("connect",['copy'],function(){
  connect.server({
    root : './build/'+jsonObj.name,
    port : "5000",
    host: "localhost",
    livereload : false
  });
});

gulp.task('clean',function(cb) {
  del(['build'], cb);
});

gulp.task('copy',['stylCompile','bower','uglifyJs'],function(){
  return gulp.src(paths.src + '/**/*.html')
    .pipe(gulp.dest(paths.build+'/'));
});

gulp.task('stylCompile', function(){
  return gulp.src(paths.src + '/**/*.styl')
    .pipe(stylus({
      use : nib(),
      compress : true
    }))
    .pipe(gulp.dest(paths.build +'/'))
});

gulp.task('bower', function() {
  return bower()
    .pipe(gulp.dest(paths.build +'/common/lib'))
});

gulp.task("uglifyJs",function(){
  return gulp.src(paths.src + "/**/*.js")
    .pipe(uglify())
    .pipe(gulp.dest(paths.build +'/'))
});
gulp.task('watch', function(){
  gulp.watch(paths.src +'/**/*.*', ['copy']);
});
gulp.task('default', ['clean','connect']);
