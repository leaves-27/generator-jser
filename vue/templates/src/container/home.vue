<style>
  body{
    font-family: "PingFang SC","微软雅黑",Arial,"Hiragino Sans GB","Helvetica Neue",sans-serif;
  }

  html,body,.root{width:100%;height: 100%;overflow-y:auto;}
  .loading-wrap{
    padding:0px;
    height: 100%;
    position: relative;
    margin-top:-30px;
  }
  .loading-btn{
    position: absolute;
    left:50%;
    top:50%;
    margin-left:-40px;
    margin-top:-20px;
  }
  .loading-btn .loading{
    margin-top:0;
  }

  @-webkit-keyframes newload {
    0%,to {
      height: 40px;
      background: #ffbe00;
    }

    50% {
      height: 70px;
      margin: -15px 0;
      background: #dc8a00;
    }
  }

  .loading-btn .loading span{
    background-color: #DC8A00;
    -webkit-animation: newload 1s ease infinite;
  }

</style>
<template>
  <div class="container-fluid loading-wrap" v-else>
    <span v-if="errMsg">{{ errMsg }}</span>
    <span v-else class="loading-btn">
      <loading></loading>
    </span>
  </div>
</template>
<script>
  import loading from '../component/loading.vue'

  const Home = {
    data(){
      return {
        "errMsg" : ""
      }
    },
    components : {
      "loading" : loading
    },
    mounted(){
      let _self = this;
      $("#btn").button('loading');

      this.getData()
      setInterval(function(){
        _self.getData()
      },1000);
    },
    methods:{
      getData(){
        const _self = this;
        let url = "www.baidu.com";

        // $.ajax({
        //   url : url,
        //   type:"get",
        //   timeout: 5000,
        //   dataType:"json",
        //   success(result){
        //     // if(result.code == 0){
        //     //
        //     // }else{
        //     //   _self.errMsg = result.errMsg;
        //     // }
        //   },
        //   error(xhr){
        //     // _self.errMsg = "请稍后再试";
        //   }
        // });
      }
    }
  }

  export default Home
</script>