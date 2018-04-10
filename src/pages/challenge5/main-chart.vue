<script>
import { loadResults } from './lib/load-results'
import { makeChartOptions } from './lib/chart-options'

export default {
  data: () => ({ results: [], loading: true }),
  computed: {
    chartProps () {
      return makeChartOptions(this.results)
    }
  },
  mounted () {
    loadResults()
      .then(results => {
        this.results = results
        this.$nextTick(() => {
          this.loading = false
        })
      })
  }
}
</script>

<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">
        Resultados
      </p>
    </header>
    <div class="card-content">
      <C3Chart v-if="!loading" v-bind="chartProps" />
    </div>
  </div>
</template>
