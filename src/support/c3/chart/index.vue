<script>
import c3 from 'c3'
import props from './props'
import watch from './watch'
import methods from './methods'
import computed from './computed'
import DebugMixin from '../../mixins/component-debug'
import useThrottleMixin from '../../mixins/use-throttle'

export default {
  name: 'c3-chart',
  mixins: [DebugMixin(), useThrottleMixin],
  data: () => ({
    forcing: 0,
    realoading: false,
    refreshing: false
  }),
  throttle: {
    onDataReaload: 1500
  },
  props,
  computed,
  watch,
  methods,
  mounted () {
    if (this.$chart) {
      this.warn('mounted', '$chart is already available')
    }

    const args = this.getArgs()

    this.$chart = c3.generate({
      bindto: this.$refs.root,
      ...args
    })
    this.log('mounted')
    this.$emit('chart:init', args)

    // this.forseRefresh()
  },
  destroyed () {
    try {
      this.log('destroyed')
      this.$chart = this.$chart.destroy()
    } catch (e) {
      console.warn('destroyed', e)
    }
  }
}
</script>

<template>
  <div class="d6-chart-root c3--chart">
    <div ref="root"></div>
  </div>
</template>

<style src="../../../../node_modules/c3/c3.min.css"></style>
