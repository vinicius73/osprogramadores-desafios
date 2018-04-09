import { defaultsDeep } from 'lodash'
import Chart from '../chart/index.vue'

const configBase = {
  data: {
  },
  legend: {
    show: false
  },
  tooltip: { show: false },
  axis: {
    x: { show: false },
    y: { show: false }
  },
  size: { height: 30, width: 100 },
  point: {
    show: false
  }
}

export default {
  functional: true,
  props: {
    width: {
      type: [Number, String, Boolean],
      default: 100
    },
    height: {
      type: [Number, String],
      default: 30
    },
    values: Array,
    color: String
  },
  render (h, { props, data }) {
    const config = defaultsDeep({
      size: { width: props.width, height: props.height }
    }, configBase, {
      data: {
        columns: [['sample', ...props.values]],
        colors: {
          sample: props.color
        }
      }
    })

    const options = defaultsDeep({
      props: { config, type: 'line' },
      staticClass: 'sparkline'
    }, data)

    return h(Chart, options)
  }
}
