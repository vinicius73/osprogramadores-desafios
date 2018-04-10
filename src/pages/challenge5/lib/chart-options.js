// export const rounds = ['10K', '50K', '100K', '250K', '500K', '1M', '2M', '3M', '5M', '8M', '12M', '15M', '20M', '25M', '30M']
const rounds = ['1M', '2M', '3M', '5M', '8M', '12M', '15M', '20M', '25M', '30M']

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

const makeChartOptions = values => ({
  data: {
    columns: values
  },
  ...defaultOptions
})

export { makeChartOptions, rounds }
