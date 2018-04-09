import { cloneDeep, defaultsDeep } from 'lodash'

export default {
  getArgs () {
    const data = this.getData()
    const config = this.getConfig()
    return defaultsDeep({ data }, config)
  },
  getData () {
    const { type } = this
    const data = cloneDeep(this.data)
    return defaultsDeep({ type }, data)
  },
  getConfig () {
    const config = cloneDeep(this.config)
    const color = {
      pattern: ['#0a4f8a', '#0a88c2', '#75bcdd', '#E0E1E2', '#21BA45', '#DB2828', '#31CCEC', '#F2C037']
    }
    const axis = {
      x: {
        type: 'category',
        padding: {
          left: 0,
          right: 0
        },
        tick: {
          multiline: true
        }
      }
    }

    const legend = {
      position: 'inset',
      inset: {
        step: 3
      }
    }

    return defaultsDeep({ axis, color, legend }, config)
  }
}
