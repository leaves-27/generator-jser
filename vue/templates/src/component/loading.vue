<style>
  .loading-text-desc{
    color:#F3F086;
    margin-top:10px;
  }
</style>
<template>
  <div class="loading-wrap text-center">
    <loading-line></loading-line>
    <div class="loading-text-desc">数据正在加载中,请稍后...</div>
  </div>
</template>
<script type="text/javascript">
  import tbjVueComponents from 'tbj-vue-components'
  const Loading = {
    components : {
      "loading-line" : tbjVueComponents.Loading.line
    }
  }
  export default Loading
</script>