<template>
  <span ref="container" />
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getDemData } from './ts'
import { DemRender } from './DemRender'
const container = ref<HTMLElement>()
onMounted(async () => {
  const data = await getDemData()
  const painter = new DemRender({
    ncols: data.description.ncols,
    nrows: data.description.nrows,
    maxValue: data.description.maxValue,

    minValue: data.description.minValue,
  })
  painter.render(data.dem)
  container.value?.appendChild(painter.getCanvas())
})
</script>
