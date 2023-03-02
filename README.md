# DEM 渲染工具

使用 webgl2 将 Dem 数据渲染为 canvas

安装:

```bash
npm i @wuch96/dem-render
```

使用:

```vue
<template>
  <span ref="container"></span>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getDemData } from './ts';
import { DemRender } from '@wuch96/dem-render';
const container = ref<HTMLElement>();
onMounted(async () => {
  const data = await getDemData(); //获取原始数据
  const painter = new DemRender({
    ncols: data.ncols, //dem的列数
    nrows: data.nrows, //dem的行数
    maxValue: data.maxValue, //dem文件内的最大值
    minValue: data.minValue, //dem文件内的最小值
  });
  painter.render(data.data); //渲染canvas
  container.value?.appendChild(painter.getCanvas()); //canvas挂到文档中
});
</script>
```
