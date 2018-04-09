import { throttle } from 'lodash'

const useThrottleMixin = {
  created () {
    const times = this.$options.throttle
    const methods = this.$options.methods
    Object.keys(times)
      .forEach(key => {
        this[key] = throttle(methods[key], times[key]).bind(this)
      })
  }
}

export default useThrottleMixin
