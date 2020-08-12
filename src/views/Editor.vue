<template>
  <div class="editor">
    <div class="canvas--container bx--col-lg-8">
      <canvas ref="editCanvas"></canvas>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

const xphotoWasm = import('xphoto-wasm')

@Component
export default class Editor extends Vue {
  @Prop({
    required: true,
    type: String
  })
  fileName!: string

  mounted () {
    const canvas = this.$refs.editCanvas as HTMLCanvasElement
    const image = new Image()

    const ctx = canvas.getContext('2d')

    image.onload = function () {
      if (ctx) {
        console.log(`Image: ${image.width}x${image.height}`)
        canvas.width = image.width
        canvas.height = image.height

        ctx.drawImage(image, 0, 0)

        xphotoWasm.then(xphoto => {
          const photonImage = xphoto.open_image(canvas, ctx)
          xphoto.putImageData(canvas, ctx, photonImage)
        })
      }
    }

    image.src = this.fileName
  }
}
</script>

<style scoped lang="scss">
.editor {
  height: calc(100% - 3rem);
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  background: $carbon--gray-100;
}

.canvas--container {
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

canvas {
  display: block;
  height: max-content;
  max-height: 90%;
}
</style>
