<template>
  <div>
    <Sparkline :values="[1,2,5,3,2,6,4,1,2,6,2,2,3,4,5]" />
  </div>
</template>

<script>
import Sparkline from '../support/c3/components/sparkline.js'
export default {
  components: { Sparkline }
}
</script>

<style lang="css">
</style>
