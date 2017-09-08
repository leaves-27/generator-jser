import $ from 'jquery'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'

const app = {
  init(){
    $("button").on("click",this.createNotice);
  },
  createNotice(){
    let options = {
      type: "list",
      title: "桌面提醒",
      message: "msg",
      iconUrl: "images/icon128.png",
      items: [{ 
        title: "1.", message: "下班了"
      },
      { 
        title: "2.", message: "吃饭了."
      },
      { 
        title: "3.", message: "中奖了."
      }]
    }

    if(chrome.notifications) {
      chrome.notifications.create('',options,function(id){});
    }else{
      alert("sorry")
    }
  }
}

app.init();