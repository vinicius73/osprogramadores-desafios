import { reduce, get, orderBy } from 'lodash'
import { rounds } from './chart-options'

const getRounds = result => reduce(rounds, (acc, key) => {
  acc.push(get(result, [key, 'media'], 0))
  return acc
}, [])

const makeLabel = ({ language, creator }) => `${language} (${creator})`

const loadResults = async () => {
  const [tests, results] = await Promise.all([
    import('../data/tests.json'),
    import('../data/results.json')
  ])

  return orderBy(Object.keys(results))
    .reduce((acc, key) => {
      acc.push([
        makeLabel(tests[key]),
        ...getRounds(results[key])
      ])
      return acc
    }, [])
}

export { loadResults }
