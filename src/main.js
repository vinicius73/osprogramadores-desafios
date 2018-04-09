import Vue from 'vue'
import Root from './root'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(Root)
})
