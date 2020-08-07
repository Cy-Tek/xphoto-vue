<template>
  <div class="home">
    <input type="file" ref="fileLoader">
    <div class="canvas--container">
      <canvas ref="editCanvas"></canvas>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
const xphotoWasm = import('xphoto-wasm')

@Component
export default class Home extends Vue {
  mounted () {
    const input = this.$refs.fileLoader as HTMLInputElement
    const canvas = this.$refs.editCanvas as HTMLCanvasElement

    input.onchange = (event) => {
      const target = event.target as HTMLInputElement
      const image = new Image()

      if (target && target.files) {
        const file = target.files.item(0)
        const ctx = canvas.getContext('2d')

        image.onload = function () {
          if (ctx) {
            console.log(`Image: ${image.width}x${image.height}`)
            canvas.width = image.width
            canvas.height = image.height

            ctx.drawImage(image, 0, 0)

            xphotoWasm.then(xphoto => {
              const image = xphoto.open_image(canvas, ctx)

              xphoto.putImageData(canvas, ctx, image)
            })
          }
        }

        image.src = URL.createObjectURL(file)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.canvas--container {
  padding: 0;
  margin: 0;
  display: block;
  width: 100%;
  height: 100%;
  background: #2c3e50;
}
canvas {
  margin: 0 auto;
  display: block;
  height: 100%;
  max-height: 400px;
}
</style>
