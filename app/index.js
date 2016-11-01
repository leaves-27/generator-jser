var generators = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var fs = require('fs');

var Util = {
  templates : [
    "bower.json",
    "package.json",
    "gulpfile.js",
    ".gitignore",
    "src/index.html",
    "src/common/base.styl",
    "src/common/base.js",
    "src/page/index/index.js",
    "src/page/index/index.styl"
  ],
  getPrompts:function(_this){
    var prompts = [{
        type: 'input',
        name: 'name',
        message: 'name of app:', 
        default: _this.name
      },
      {
        type: 'input',
        name: 'description',
        message: 'description:', 
        default: _this.description
      },
      {
        type: 'input',
        name: 'repo',
        message: 'git repository:', 
        default: _this.repo
      },
      {
        type: 'input',
        name: 'license',
        message: 'license:', 
        default: _this.license
      },
      {
        type: 'input',
        name: 'author',
        message: 'author:', 
        default: _this.author
      }
    ];
    return prompts;
  },
  copy:function(_this,arr){
    for(var i=0;i<arr.length;i++){
      _this.copy(arr[i],arr[i]);
    }
  },
  resetConfig:function(filePath,_this){
    var packagePath = path.join(__dirname,filePath);
    var info = JSON.parse(fs.readFileSync(packagePath));

    info.name = _this.name;
    info.description = _this.description;
    info.author = _this.author;

    fs.writeFileSync(packagePath,JSON.stringify(info,null,2));
  }
};

module.exports = generators.Base.extend({
  initializing: function () {    //初始化准备工作

  },
  prompting: function () {// 接受用户输入
    var done = this.async(); 
    this.name = path.basename(process.cwd());
    this.license = 'ISC';
    this.description = '';
    this.author = '';

    var prompts = Util.getPrompts(this);

    this.prompt(prompts, function (props) {
      this.name = props.name;
      this.pkgName = props.name;
      
      this.repo = props.repo;
      this.license = props.license;
      this.author = props.author;
      this.description = props.description;

      // var packagePath = path.join(__dirname,'templates/package.json');
      // var info = JSON.parse(fs.readFileSync(packagePath));

      // info.name = this.name;
      // info.description = this.description;
      // info.author = this.author;

      // fs.writeFileSync(packagePath,JSON.stringify(info,null,2));
      Util.resetConfig('templates/package.json',this);
      Util.resetConfig('templates/bower.json',this);

      done();  //进入下一个生命周期阶段
    }.bind(this));
  },
  writing:{
    app: function (){
      var templates = Util.templates;
      Util.copy(this,templates);
    }
  },
  install:function (){
    var done = this.async();
    this.spawnCommand('npm',['install']).on('exit',function(code) {
      if(code){
        done(new Error('code:'+code));
        // console.log(code)
      }else{
        done();
      }
    }).on('error', done);

    this.spawnCommand('bower',['install']).on('exit',function(code) {
      if(code){
        done(new Error('code:'+code));
        // console.log(code)
      }else{
        done();
      }
    }).on('error', done);
  },
  end:function (){
    var done = this.async();
    this.spawnCommand('gulp').on('exit',function(code) {
      if(code){
        done(new Error('code:'+code));
      }else{
        done();
      }
    }).on('error', done);
  }
});