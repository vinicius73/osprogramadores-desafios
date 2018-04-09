import { reduce, get } from 'lodash'
// export const rounds = ['10K', '50K', '100K', '250K', '500K', '1M', '2M', '3M', '5M', '8M', '12M', '15M', '20M', '25M', '30M']
export const rounds = ['1M', '2M', '3M', '5M', '8M', '12M', '15M', '20M', '25M', '30M']

const getRounds = result => reduce(rounds, (acc, key) => {
  acc.push(get(result, [key, 'media'], 0))
  return acc
}, [])

export const loadResults = () => import('../../data/results.json')
  .then(json => Object.keys(json)
    .reduce((acc, key) => {
      acc.push([
        key,
        ...getRounds(json[key])
      ])
      return acc
    }, [])
  )

export const loadTests = () => import('../../data/tests.json')
  .then(json => Object.keys(json)
    .map(key => ({
      key,
      ...json[key]
    }))
  )
