<template>
  <header>
    <div class="logo">
      <img src="@/assets/logo.png" alt="X Photo Logo"/>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Header extends Vue {
}
</script>

<style scoped lang="scss">

header {
  display: flex;
  align-items: center;
  height: 3rem;
  background: $carbon--gray-100;
  border-bottom: $carbon--gray-90 solid 3px;
}

.logo {
  margin-left: 1rem;
}

img {
  height: 100%;
}
</style>
