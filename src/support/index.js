import { install as $nextTickInSequence } from './plugins/next-tick-in-sequence'
import { install as http } from './plugins/http'

export const install = Vue => {
  Vue.component('C3Chart', () => import(/* webpackChunkName: "c3" */'./c3/chart/index.vue'))
  http(Vue)
  $nextTickInSequence(Vue)
}
