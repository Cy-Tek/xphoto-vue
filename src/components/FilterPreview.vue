<template>
  <div class="filter">
    <div class="filter--canvas_wrapper">
      <canvas class="filter--canvas" ref="previewCanvas"></canvas>
    </div>
    <div class="filter--label">
      <label class="checkbox">
        <input :name="filter" type="checkbox">
        <span>{{ filterName }}</span>
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { PropType } from 'vue'
// eslint-disable-next-line @typescript-eslint/camelcase
import { FilterType, get_filter_name, ImageManager } from 'xphoto-wasm'

@Component
export default class FilterPreview extends Vue {
  @Prop({
    required: true,
    type: Object as PropType<FilterType>
  })
  filter!: FilterType

  @Prop({
    type: Object as PropType<ImageManager>,
    default: undefined
  })
  manager!: ImageManager | undefined

  @Watch('manager')
  onManagerInitialized (newManager: ImageManager | undefined) {
    if (newManager) {
      const canvas = this.$refs.previewCanvas as HTMLCanvasElement
      newManager.draw_filter_preview(canvas, this.filter)
    }
  }

  get filterName (): string {
    return get_filter_name(this.filter).toLocaleUpperCase()
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
  border-top: $carbon--gray-80 solid 3px;

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

.checkbox {
  display: inline-flex;
  cursor: pointer;
  position: relative;
}

.checkbox > span {
  color: $carbon--gray-10;
  padding: 8px 4px;
}

.checkbox > input {
  height: 25px;
  width: 25px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: 2px solid $carbon--gray-10;
  outline: none;
  transition-duration: 0.3s;
  background-color: transparent;
  cursor: pointer;
}

.checkbox > input:checked + span::before {
  content: '\2713';
  display: block;
  text-align: center;
  font-size: 22px;
  color: $carbon--gray-10;
  position: absolute;
  left: 8px;
  top: 4px;
}

.checkbox > input:active {
  border: 2px solid $carbon--blue-50;
}

</style>
