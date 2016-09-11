var generators = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');

var copy = function(_this,arr){
  for(var i=0;i<arr.length;i++){
    _this.template('gulpfile.js', 'gulpfile.js');
  }
}

module.exports = generators.Base.extend({
  initializing: function () {    //初始化准备工作
  },
  prompting: function () {// 接受用户输入
    var done = this.async(); 
    this.name = path.basename(process.cwd());
    this.license = 'ISC';
    this.description = '';
    this.author = '';

    var prompts = [{
          type: 'input',
          name: 'name',
          message: 'name of app:', default: this.name
        },
        {
          type: 'input',
          name: 'description',
          message: 'description:', default: this.description
        },
        {
          type: 'list',   // 提供选择的列表
          name: 'kissy',
          message: 'which version of kissy',
          choices: [{
                name: 'KISSY@1.4.x',
                value: '1.4.x'
            },
            {
                name: 'KISSY@6.0.x',
                value: '6.0.x'
            }
          ]
        },
        {
            type: 'input',
            name: 'repo',
            message: 'git repository:', default: this.repo
        },
        {
            type: 'input',
            name: 'license',
            message: 'license:', default: this.license
        },
        {
            type: 'input',
            name: 'author',
            message: 'author:', default: this.author
        }
    ];
    this.prompt(prompts, function (props) {
      this.name = props.name;
      this.pkgName = props.name;
      
      this.repo = props.repo;
      this.license = props.license;
      this.author = props.author;
      this.description = props.description;

      done();  //进入下一个生命周期阶段
    }.bind(this));
  },
  writing:{
    app: function (){
      var templates = ["package.json","gulpfile.js"];
      copy(this,templates);
    }
  },
  install:function (){
    var done = this.async();
    this.spawnCommand('npm', ['install'])
      .on('exit', function (code) {
        if (code) {
          done(new Error('code:' + code));
        }else {
          done();
        }
      })
      .on('error', done);
  },
  end: function () {

  }
});