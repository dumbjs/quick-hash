import { existsSync } from 'node:fs'
import fs, { mkdir } from 'node:fs/promises'
import { join } from 'node:path'
import { nodeExternals } from 'rollup-plugin-node-externals'
import typescriptPlugin from 'rollup-plugin-typescript2'

const common = {
  plugins: [
    nodeExternals(),
    createPackages(),
    typescriptPlugin({
      useTsconfigDeclarationDir: true,
      include: ['./src/*.js+(|x)', './src/**/*.js+(|x)'],
      exclude: ['**/node_modules/**/*', '**/tests/**/*'],
      tsconfigDefaults: {
        compilerOptions: {
          declarationDir: './dist/types',
          allowJs: true,
          declaration: true,
          skipLibCheck: true,
          emitDeclarationOnly: true,
        },
        include: ['src'],
        exclude: ['tests'],
      },
    }),
  ],
}

/**
 * @return {import("rollup").RollupOptions[]}
 */
export default function main() {
  return [
    {
      ...common,
      input: {
        index: './src/index.js',
        djb2: './src/djb2.js',
        sdbm: './src/sdbm.js',
      },
      output: {
        dir: './dist/esm',
        format: 'esm',
      },
    },
    {
      ...common,
      input: {
        index: './src/index.js',
        djb2: './src/djb2.js',
        sdbm: './src/sdbm.js',
      },
      output: {
        dir: './dist/cjs',
        format: 'cjs',
      },
    },
  ]
}

/**
 *
 * @returns {import("rollup").Plugin}
 */
function createPackages() {
  return {
    name: 'create-final-packages',
    async renderStart(info) {
      const pkg = {}
      if (info.format == 'cjs') pkg.type = 'commonjs'

      if (['esm', 'es'].includes(info.format)) pkg.type = 'module'

      const pkgPath = join(info.dir, 'package.json')
      await mkdir(info.dir, { recursive: true })

      if (existsSync(pkgPath)) return

      await fs.writeFile(
        join(info.dir, 'package.json'),
        JSON.stringify(pkg, null, 2),
        'utf-8'
      )
    },
  }
}
