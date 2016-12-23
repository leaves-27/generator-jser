var yeoman = require('yeoman-generator');
var chalk = require('chalk');//不同的颜色信息
var yosay = require('yosay');
var path = require('path');
var fs = require('fs');
var del = require('del');
var string = require("underscore.string");
var Util = require("./util");

var templates = [
  "bower.json",
  "package.json",
  "gulpfile.js",
  ".gitignore",
  "src/index.html",
  "src/common/base.styl",
  "src/common/base.js",
  "src/page/index/index.js",
  "src/page/index/index.styl"
];

var config = {
  // //初始化准备工作
  initializing:function(){
    var src = path.join(process.cwd(),'*');
    del([src],{force:true});
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

      //进入下一个生命周期阶段调用
      done();  
    }

    this.name = path.basename(process.cwd());
    this.license = '';
    this.description = '';
    this.author = '';

    this.prompt(Util.getPrompts(this),promptHanlder.bind(this));
  },
  writing:{
    app: function (){
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
};

module.exports = yeoman.Base.extend(config);