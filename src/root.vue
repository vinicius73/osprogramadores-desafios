<script>
import RootHeader from './components/header.vue'

export default {
  name: 'root',
  components: {
    RootHeader,
    Page: () => import('./pages/challenge5/index.vue')
  }
}
</script>

<template>
  <div id="app">
    <RootHeader class="is-fixed-top" />
    <main class="root">
      <Page class="container is-fluid" />
    </main>
  </div>
</template>

<style scoped>
  .root {
    padding-top: 65px;
  }
</style>

<style>
  body, html {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
  }
</style>
