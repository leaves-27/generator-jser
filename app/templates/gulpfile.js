var gulp         = require('gulp');
var fs           = require('fs');
var del          = require('del');
var connect      = require('gulp-connect');

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

gulp.task('copy',function(){
  return gulp.src('./src/**/*.*')
    .pipe(gulp.dest(paths.build));
});

gulp.task('default', ['clean','connect']);
