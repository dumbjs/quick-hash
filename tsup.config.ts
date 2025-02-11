import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['./src/index.ts', 'src/djb2.ts', 'src/sdbm.ts'],
  bundle: true,
  format: ['esm', 'cjs'],
  outDir: 'dist',
  dts: true,
})
