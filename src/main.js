import Vue from 'vue'
import App from './App'
import './uni.promisify.adaptor'
import {router} from './router/index.js'
import store from './store'
// import 
// my-link
// import Mylink from './node_modules/uni-simple-router/dist/link.vue'     
// Vue.component('my-link',Mylink)
Vue.use(router)
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  store,
  ...App,
})
app.$mount()
