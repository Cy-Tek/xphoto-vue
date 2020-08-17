<template>
  <div class="editor">
    <div class="canvas--container bx--col-sm-4 bx--col-lg-9">
      <canvas ref="editCanvas"></canvas>
    </div>
    <div class="preview--container bx--col-lg-3">
      <div id="filter--menu">
        <h3>Filters:</h3>
        <p id="clear">Clear all</p>
        <div id="filter--search">
          <CvSearch />
        </div>
      </div>
      <div id="filter--list">
        <FilterPreview
          v-for="{ filter, checked } in filters"
          :key="filter"
          :filter="filter"
          :manager="manager"
          :checked="checked"
          @toggled="toggleFilter"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { CvCheckbox, CvSearch } from '@carbon/vue'

import { FilterType, ImageManager } from 'xphoto-wasm'
import FilterPreview from '@/components/FilterPreview.vue'

@Component({
  components: {
    FilterPreview,
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

  manager: ImageManager | null = null

  filters: { filter: FilterType; checked: boolean }[] = [
    {
      filter: FilterType.Oceanic,
      checked: false
    },
    {
      filter: FilterType.Islands,
      checked: false
    },
    {
      filter: FilterType.Marine,
      checked: false
    },
    {
      filter: FilterType.SeaGreen,
      checked: false
    },
    {
      filter: FilterType.FlagBlue,
      checked: false
    },
    {
      filter: FilterType.Liquid,
      checked: false
    },
    {
      filter: FilterType.Diamante,
      checked: false
    },
    {
      filter: FilterType.Radio,
      checked: false
    },
    {
      filter: FilterType.Twenties,
      checked: false
    },
    {
      filter: FilterType.RoseTint,
      checked: false
    },
    {
      filter: FilterType.Mauve,
      checked: false
    },
    {
      filter: FilterType.BlueChrome,
      checked: false
    },
    {
      filter: FilterType.Vintage,
      checked: false
    },
    {
      filter: FilterType.Perfume,
      checked: false
    },
    {
      filter: FilterType.Serenity,
      checked: false
    }
  ]

  mounted () {
    const canvas = this.$refs.editCanvas as HTMLCanvasElement
    const image = new Image()

    const ctx = canvas.getContext('2d')

    image.onload = () => {
      if (ctx) {
        canvas.width = image.width
        canvas.height = image.height

        ctx.drawImage(image, 0, 0)

        this.manager = ImageManager.load_from_canvas(canvas)
      }
    }

    image.src = this.fileName
  }

  toggleFilter (event: { filter: FilterType; checked: boolean }) {
    const filter = this.filters.find(item => item.filter === event.filter)

    if (filter) {
      filter.checked = event.checked

      if (this.manager && event.checked) {
        this.manager.add_filter(event.filter)
      } else if (this.manager && !event.checked) {
        this.manager.remove_filter(event.filter)
      }
    }
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
  width: 90%;
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
}

canvas {
  display: block;
  height: max-content;
  max-width: 90%;
  max-height: 90%;
}
</style>
