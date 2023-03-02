<template>
  <span ref="container"></span>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getDemData } from './ts';
import { DemRender } from './DemRender';
const container = ref<HTMLElement>();
onMounted(async () => {
  const data = await getDemData();
  const painter = new DemRender({
    ncols: data.ncols,
    nrows: data.nrows,
    maxValue: data.maxValue,
    minValue: data.minValue,
    NODATA_value: data.NODATA_value,
  });
  painter.render(data.data);
  container.value?.appendChild(painter.getCanvas());
});
</script>
