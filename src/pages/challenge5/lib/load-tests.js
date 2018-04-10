import { omit, get, mean } from 'lodash'
const size = '30M'

const normaliseTest = (test, result) => {
  const values = get(result, [size, 'tempos'], [])
  const avg = mean(values)
  return {
    ...omit(test, ['exec']),
    results: [{ size, values, avg }]
  }
}

const loadTests = async () => {
  const [tests, results] = await Promise.all([
    import('../data/tests.json'),
    import('../data/results.json')
  ])

  return Object.keys(tests)
    .map(key => normaliseTest(tests[key], results[key]))
}

export { loadTests }
