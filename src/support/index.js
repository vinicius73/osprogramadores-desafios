import $nextTickInSequence from './plugins/next-tick-in-sequence'
import C3Chart from './c3/chart/index.vue'

export const install = Vue => {
  Vue.component('C3Chart', C3Chart)

  Object.defineProperty(Vue.prototype, `$nextTickInSequence`, {
    get: () => $nextTickInSequence
  })
}
