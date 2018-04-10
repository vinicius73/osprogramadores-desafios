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
            <th>Média (30M)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="test in tests">
            <td>{{ test.creator }}</td>
            <td>
              <span v-if="test.source.length === 0">{{ test.language }}</span>
              <a v-else :href="test.source" target="_blank" class="button is-small" title="clique para ver o código fonte">
                <i class="fa fa-code-branch"></i>  {{ test.language }}
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
  .fa {
    margin-right: 5px;
  }
  .sparkline {
    display: inline-block;
  }
</style>
