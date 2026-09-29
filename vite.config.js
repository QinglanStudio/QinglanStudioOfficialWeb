import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  // Relative URLs support both repository Pages and custom domains.
  base: './',
  build: {
    rollupOptions: {
      input: Object.fromEntries(
        ['index', 'mc', 'file', 'sb'].map((name) => [
          name,
          fileURLToPath(new URL(`./${name}.html`, import.meta.url)),
        ]),
      ),
    },
  },
})
