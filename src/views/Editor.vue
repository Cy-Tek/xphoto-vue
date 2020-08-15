<template>
  <div class="editor">
    <div class="canvas--container bx--col-lg-9">
      <canvas ref="editCanvas"></canvas>
    </div>
    <div class="preview--container bx--col-lg-3">
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
      <div id="filter--list">
        <div class="filter">
          <div class="filter--canvas_wrapper">
            <canvas class="filter--canvas" ref="previewCanvas"></canvas>
          </div>
          <div class="filter--label">
            <label>
              RADIO
              <input name="radio" type="checkbox">
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { CvCheckbox, CvSearch } from '@carbon/vue'

import { ImageManager } from 'xphoto-wasm'

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

  manager!: ImageManager

  mounted () {
    const canvas = this.$refs.editCanvas as HTMLCanvasElement
    const image = new Image()

    const ctx = canvas.getContext('2d')

    image.onload = () => {
      if (ctx) {
        console.log(`Image: ${image.width}x${image.height}`)
        canvas.width = image.width
        canvas.height = image.height

        ctx.drawImage(image, 0, 0)

        const previewCanvas = this.$refs.previewCanvas as HTMLCanvasElement

        this.manager = ImageManager.load_from_canvas(canvas)
        this.manager.gen_filter_preview(previewCanvas.scrollWidth, previewCanvas.scrollHeight)

        this.manager.draw_filter_preview(previewCanvas, 'radio')
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
  margin-top: 16px;
  margin-bottom: 16px;
}

#filter--list {
  flex-basis: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;

  .filter {
    height: 320px;
    width: 95%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;

    .filter--canvas_wrapper {
      flex-basis: 100%;
      flex-shrink: 0;

      .filter--canvas {
        max-width: 100%;
        height: 200px;
      }
    }

    .filter--label {
      flex-basis: 100%;
    }
  }
}

canvas {
  display: block;
  height: max-content;
  max-height: 90%;
}
</style>
