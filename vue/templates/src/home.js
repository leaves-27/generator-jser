import Vue from 'vue'

import $ from 'jquery'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import home from './container/home.vue'

const app = new Vue({
  el : "#root",
  components : {
    "home" : home
  }
})