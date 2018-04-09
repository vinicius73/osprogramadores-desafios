<template>
  <C3Chart v-bind="chartProps" />
</template>

<script>
import { loadTests, loadResults } from './lib/load'
import { makeChartOptions } from './chart-options'

export default {
  data: () => ({ tests: [], results: [] }),
  computed: {
    chartProps () {
      return makeChartOptions(this.results)
    }
  },
  mounted () {
    Promise.all([loadTests(), loadResults()])
      .then(([tests, results]) => {
        this.tests = tests
        this.results = results
      })
  }
}
</script>
