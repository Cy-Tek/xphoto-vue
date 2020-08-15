<template>
  <canvas ref="previewCanvas"></canvas>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { PropType } from 'vue'
import { ImageManager } from 'xphoto-wasm'

@Component
export default class FilterPreview extends Vue {
  @Prop({
    required: true,
    type: String
  })
  filterName!: string

  @Prop({
    required: true,
    type: Object as PropType<ImageManager>
  })

  mounted () {
    const canvas = this.$refs.previewCanvas as HTMLCanvasElement
  }
}
</script>

<style scoped>

</style>
