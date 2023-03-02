import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import glsl from 'vite-plugin-glsl';
import dts from 'vite-plugin-dts';
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: 'es2015',
    lib: {
      entry: './src/DemRender/index.ts',
      name: 'demRender',
      fileName: 'dem-render',
      formats: ['umd', 'es'],
    },
  },
  plugins: [
    vue(),
    glsl(),
    dts({
      entryRoot: './src/DemRender',
      outputDir: './dist/types',
    }),
  ],
});
