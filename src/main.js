import Vue from 'vue'
import Root from './root'
import * as support from './support'

Vue.config.productionTip = false

Vue.use(support)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(Root)
})
