import { isNil } from 'lodash'

function mapC3Methods (methods) {
  return methods.reduce((acc, method) => {
    const fn = function (...args) {
      this.log(`call ${method}`)
      if (isNil(this.$chart)) {
        this.warn(`method:${method}`, '$chart is unavailable')
        return Promise.reject(new Error('$chart is unavailable'))
      }

      return Promise.resolve(this.$chart[method](...args))
    }

    acc[method] = fn

    return acc
  }, {})
}

export { mapC3Methods }
