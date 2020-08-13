<template>
  <div class="editor">
    <div class="canvas--container bx--col-lg-8">
      <canvas ref="editCanvas"></canvas>
    </div>
    <div class="preview--container bx--col-lg-4">
      <div id="filter--menu">
        <h3>Filters:</h3>
        <label>
          <input name="preview" type="checkbox" checked aria-checked="true" />
          Preview
        </label>
        <p id="clear">Clear all</p>
        <div id="filter--search">
          <CvSearch />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { CvCheckbox, CvSearch } from '@carbon/vue'

const xphotoWasm = import('xphoto-wasm')

@Component({
  components: {
    CvCheckbox,
    CvSearch
  }
})
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
  color: $carbon--gray-10;
}

.canvas--container {
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.preview--container {
  display: flex;
  flex-direction: column;
  height: 100%;
  border-left: $carbon--gray-90 solid 3px;
}

input[type='checkbox'] {
  border: $carbon--gray-10 solid 2px;

  &:checked {
    background-color: $carbon--gray-10;
  }
}

#filter--menu {
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

#filter--search {
  flex-basis: 100%;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

canvas {
  display: block;
  height: max-content;
  max-height: 90%;
}
</style>
