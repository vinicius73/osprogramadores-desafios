import { install as $nextTickInSequence } from './plugins/next-tick-in-sequence'
import { install as http } from './plugins/http'
import C3Chart from './c3/chart/index.vue'

export const install = Vue => {
  Vue.component('C3Chart', C3Chart)
  http(Vue)
  $nextTickInSequence(Vue)
}
