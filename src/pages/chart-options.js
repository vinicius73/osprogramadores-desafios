import { rounds } from './lib/load'

const defaultOptions = {
  config: {
    size: {
      height: 480
    },
    axis: {
      x: {
        type: 'category',
        categories: rounds
      }
    }
  },
  type: 'area-spline'
}

export const makeChartOptions = values => ({
  data: {
    columns: values
  },
  ...defaultOptions
})
