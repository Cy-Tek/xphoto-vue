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
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,300;0,400;0,500;1,200;1,300;1,400;1,500&display=swap');

body, html {
  margin: 0;
  padding: 0;
  height: 100%;
  background-color: #161616;
  font-family: 'IBM Plex Sans', sans-serif;
}

* {
  box-sizing: border-box;
}

#app {
  height: 100%;
}
</style>
