var yeoman = require('yeoman-generator');
var chalk = require('chalk');//不同的颜色信息
var yosay = require('yosay');
var path = require('path');
var fs = require('fs');
var del = require('del');
var string = require("underscore.string")

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
  trim:function(string){
    return string.replace(/(^\s*)|(\s*$)/g,'');
  },
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
  execCommand:function(_this,commands){
    _this.i = 0;

    var unit = function(){
      var command = commands[_this.i];
      var pos = command.search(/\s/);

      var cmd = command,
          args = [];

      var spawnHanlder = function(code) {
        if(code){
          _this.done(new Error('code:'+code));
        }else{
          _this.i++;
          if(_this.i < commands.length){
            unit();
          }else{
            _this.done();
          }
        }
      }

      if(pos > -1){
        cmd = Util.trim(command.substring(0,pos));
        args = Util.trim(command.substr(pos)).split(/\s+/);
      }

      var spawn = _this.spawnCommand(cmd,args);
      spawn.on('exit',spawnHanlder);
      spawn.on('error',_this.done);
    } 
    unit();
  },
  copy:function(_this,arr){
    var regExp = /json/;

    for(var i=0;i<arr.length;i++){
      if(arr[i].match(regExp)){
        _this.template(arr[i],arr[i]);
      }else{
        _this.copy(arr[i],arr[i]);
      }
    }
  }
};

module.exports = yeoman.Base.extend({
  // //初始化准备工作
  initializing:function(){
    del([__dirname]);
  },
  // 接受用户输入
  prompting: function () {
    var done = this.async();
    var promptHanlder = function(props){
      this.name = props.name;
      this.pkgName = props.name;
      
      this.repo = props.repo;
      this.license = props.license;
      this.author = props.author;
      this.description = props.description;

      done();  //进入下一个生命周期阶段
    }

    this.name = path.basename(process.cwd());
    this.license = '';
    this.description = '';
    this.author = '';

    this.prompt(Util.getPrompts(this),promptHanlder.bind(this));
  },
  writing:{
    app: function (){
      var templates = Util.templates;
      Util.copy(this,templates);
    }
  },
  install:function (){
    this.done = this.async();
    var _self = this;

    Util.execCommand(this,["npm install","bower install"]);
  },
  end:function (){
    var done = this.async();

    Util.execCommand(this,["gulp"]);
  }
});