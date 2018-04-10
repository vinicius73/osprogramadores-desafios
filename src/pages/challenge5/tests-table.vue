<script>
import { loadTests } from './lib/load-tests'

export default {
  components: {
    Sparkline: () => import(/* webpackChunkName: "c3" */'../../support/c3/components/sparkline')
  },
  data: () => ({ tests: [], loading: true }),
  mounted () {
    loadTests()
      .then(tests => {
        this.tests = tests
      })
  }
}
</script>

<template>
  <div class="card">
    <div class="card-content">
      <table class="table is-fullwidth is-hoverable">
        <thead>
          <tr>
            <th>Criador</th>
            <th>Linguagem</th>
            <th>Média (30K)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="test in tests">
            <td>{{ test.creator }}</td>
            <td>
              <a :href="test.source" target="_blank" title="clique para ver o código fonte">
                {{ test.language }}
              </a>
            </td>
            <td>
              <Sparkline :width="200" :values="test.results[0].values" />
              {{ test.results[0].avg }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
  .sparkline {
    display: inline-block;
  }
</style>
