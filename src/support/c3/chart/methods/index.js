import { isNil, isEqual } from 'lodash'
import { mapC3Methods } from './map-c3-methods'
import getters from './getters'
import wait from '../../../time/wait'

const methods = {
  ...mapC3Methods(['transform', 'flush', 'unload', 'load']),
  ...getters,
  onDataReaload (value, old) {
    if (isEqual(value, old)) {
      return
    }
    this.log('watch.data.reload')
    try {
      this.reload()
        .catch(e => {
          this.warn('watch.data.reload', e)
        })
    } catch (e) {
      this.warn('watch.data.reload', e)
    }
  },
  update () {
    this.log('update')

    if (isNil(this.$chart)) {
      this.warn('reload', '$chart is unavailable')
      return Promise.reject(new Error('$chart is unavailable'))
    }

    const data = this.getData()
    return this.$nextTickInSequence([
      () => this.load(data),
      () => this.$emit('chart:update', data)
    ])
      .catch(e => {
        this.warn('update', e)
      })
  },
  refresh () {
    if (this.refreshing) {
      this.warn('in process of refreshing.')
      return Promise.resolve()
    }

    this.refreshing = true
    return this.$nextTickInSequence([
      () => this.update(),
      () => this.$emit('chart:refreshing'),
      () => wait(1000),
      () => this.flush()
    ])
      .catch(err => {
        return { err }
      })
      .then(res => {
        const { err } = (res || {})
        this.refreshing = false
        this.$emit('chart:refreshed')
        if (err) {
          return Promise.reject(err)
        }
      })
  },
  reload () {
    this.log('reload')
    this.$emit('chart:reloading')
    if (this.realoading) {
      this.warn('in process of reloading.')
      // this.forseRefresh()
      return Promise.resolve()
    }

    this.realoading = true

    const fn = () => this.$nextTickInSequence([
      () => this.unload(),
      () => wait(1050),
      () => this.refresh()
    ])

    return wait(500)
      .then(() => {
        if (isNil(this.$chart)) {
          this.warn('reload', '$chart is unavailable')
          return Promise.reject(new Error('$chart is unavailable'))
        }
      })
      .then(fn)
      .catch(e => {
        this.warn('reload', e)
      })
      .then(() => {
        this.realoading = false
        this.$emit('chart:reloaded')
      })
  },
  forseRefresh () {
    const run = () => {
      if (this.forcing >= 5) {
        return Promise.resolve()
      }

      return wait(5000)
        .then(() => {
          this.forcing++
          return this.refresh()
        })
        .then(run)
    }

    run()
      .catch(e => {
        this.warn(e)
      })
      .then(() => {
        this.forcing = 0
      })
  }
}

export default methods
