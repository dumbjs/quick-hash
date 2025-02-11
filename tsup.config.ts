import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['./src/index.js', 'src/djb2.js', 'src/sdbm.js'],
  bundle: true,
  format: ['esm', 'cjs'],
  outDir: 'dist',
  dts: true,
})
