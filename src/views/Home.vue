<template>
  <div class="home">
    <input type="file" ref="loadFileInput" @change="onFileChange" hidden />
    <button @click="onLoadClick">
      Load Image
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Home extends Vue {
  onLoadClick () {
    const imageLoader = this.$refs.loadFileInput as HTMLInputElement
    imageLoader.click()
  }

  onFileChange (event: Event) {
    const target = event.target as HTMLInputElement

    if (target && target.files) {
      const file = target.files.item(0)
      const fileName = URL.createObjectURL(file)

      this.$router.push({ path: 'editor', query: { file: fileName } })
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  height: calc(100% - 3rem);
  display: flex;
  align-items: center;
  justify-content: center;
  background: $carbon--gray-100;
}

button {
  color: $carbon--gray-10;
  border: none;
  width: 20%;
  height: 3rem;
  font-size: 2rem;
  background: $carbon--blue-60;
}

button:hover {
  cursor: pointer;
  background: $carbon--blue-70;
}
</style>
