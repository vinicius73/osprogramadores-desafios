import axios from 'axios'

export const install = Vue => {
  Object.defineProperty(Vue.prototype, `$http`, {
    get: () => axios
  })
}
