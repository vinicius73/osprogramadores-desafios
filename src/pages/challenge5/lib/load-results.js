import { reduce, orderBy } from 'lodash'
import { rounds } from './chart-options'

const getRounds = result => reduce(rounds, (acc, key) => {
  acc.push(result[key].media || 0)
  return acc
}, [])

const makeLabel = ({ language, creator }) => `${language} (${creator})`

const loadResults = async () => {
  const [tests, results] = await Promise.all([
    import(/* webpackChunkName: "data" */'../data/tests.json'),
    import(/* webpackChunkName: "data" */'../data/results.json')
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
