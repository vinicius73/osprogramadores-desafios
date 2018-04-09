import { isFunction, castArray, isArray } from 'lodash'

function $nextTickInSequence (...fns) {
  const fnList = [...castArray(fns)].reverse()

  // call next function
  const callNext = () => {
    const next = fnList.pop()

    // if next is a array of functions
    if (isArray(next)) {
      return $nextTickInSequence.apply(this, next)
    }

    // call function and callNext
    if (isFunction(next)) {
      return new Promise((resolve, reject) => {
        this.$nextTick(() => {
          try {
            Promise
              .resolve(next())
              .then(() => {
                resolve(callNext())
              })
          } catch (e) {
            console.warn('nextTickInSequence', e)
            reject(e)
          }
        })
      })
    }

    // finish
    return Promise.resolve()
  }

  return callNext()
}

export const install = Vue => {
  Object.defineProperty(Vue.prototype, `$nextTickInSequence`, {
    get: () => $nextTickInSequence
  })
}

export default $nextTickInSequence
