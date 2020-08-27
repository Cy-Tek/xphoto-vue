<template>
  <div id="app">
    <Header />
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Home from '@/views/Home.vue'
import Header from '@/components/Header.vue'

@Component({
  components: {
    Header,
    Home
  }
})
export default class App extends Vue {
}
</script>

<style>
body, html {
  margin: 0;
  padding: 0;
  height: 100%;
  background-color: #161616;
  font-family: sans-serif;
}

* {
  box-sizing: border-box;
}

#app {
  height: 100%;
}
</style>
