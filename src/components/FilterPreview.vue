<template>
  <div class="filter">
    <div class="filter--canvas_wrapper">
      <canvas class="filter--canvas" ref="previewCanvas"></canvas>
    </div>
    <div class="filter--label">
      <label class="checkbox">
        <input :name="filterName" type="checkbox">
        <span>{{ filterName | capitalize }}</span>
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { PropType } from 'vue'
import { ImageManager } from 'xphoto-wasm'

@Component({
  filters: {
    capitalize (value: string): string {
      return value.toLocaleUpperCase()
    }
  }
})
export default class FilterPreview extends Vue {
  @Prop({
    required: true,
    type: String
  })
  filterName!: string

  @Prop({
    type: Object as PropType<ImageManager>,
    default: undefined
  })
  manager!: ImageManager | undefined

  @Watch('manager')
  onManagerInitialized (newManager: ImageManager | undefined) {
    if (newManager) {
      const canvas = this.$refs.previewCanvas as HTMLCanvasElement
      newManager.draw_filter_preview(canvas, this.filterName)
    }
  }
}
</script>

<style scoped lang="scss">
.filter {
  height: 260px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border-top: $carbon--gray-90 solid 3px;

  .filter--canvas_wrapper {
    display: flex;
    flex-basis: 100%;
    flex-shrink: 0;

    .filter--canvas {
      margin: 0 auto;
      max-width: 100%;
      height: 200px;
    }
  }

  .filter--label {
    font-size: 18px;
    flex-basis: 100%;
  }
}
</style>
