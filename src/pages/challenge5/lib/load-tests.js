import { omit, mean, orderBy } from 'lodash'
const size = '30M'

const normaliseTest = (test, result) => {
  const values = result[size].tempos || []
  const avg = mean(values)
  return {
    ...omit(test, ['exec']),
    results: [{ size, values, avg }]
  }
}

const loadTests = async () => {
  const [tests, results] = await Promise.all([
    import(/* webpackChunkName: "data" */'../data/tests.json'),
    import(/* webpackChunkName: "data" */'../data/results.json')
  ])

  const list = Object.keys(tests)
    .map(key => normaliseTest(tests[key], results[key]))

  return orderBy(list, row => row.results[0].avg)
}

export { loadTests }
