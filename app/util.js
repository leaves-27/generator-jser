var files = require("dir-to-files");

var Util = {
  trim:function(string){
    return string.replace(/(^\s*)|(\s*$)/g,'');
  },
  getTemplate:function(){
    var currutDir = __dirname+"/templates";
    var filePaths = files.geFileList(currutDir);
    
    var tmp = [];

    for(var i in filePaths){
      var regExp = new RegExp(currutDir+"/(.+)");
      tmp.push(regExp.exec(filePaths[i].path)[1]);
    }
    return tmp;
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

module.exports = Util;