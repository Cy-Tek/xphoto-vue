<template>
  <div id="app">
    <CvButton>Hello world!</CvButton>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { CvButton } from '@carbon/vue'

@Component({
  components: {
    CvButton
  }
})
export default class App extends Vue {

}
</script>

<style lang="scss">
@import "./styles/carbon";
</style>
