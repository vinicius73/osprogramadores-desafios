<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">
        Resultados
      </p>
    </header>
    <div class="card-content">
      <C3Chart v-bind="chartProps" />
    </div>
  </div>
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
