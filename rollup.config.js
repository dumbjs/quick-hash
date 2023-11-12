import { dirname, join } from 'node:path'
import { nodeExternals } from 'rollup-plugin-node-externals'
import fs, { mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'

const common = {
  plugins: [nodeExternals(), inlinePlugin(), createPackages()],
}

/**
 * @return {import("rollup").RollupOptions[]}
 */
function main() {
  return [
    ...createEntry('./src/index.js'),
    ...createEntry('./src/djb2.js'),
    ...createEntry('./src/sdbm.js'),
  ]
}

function createEntry(entry) {
  return [
    {
      ...common,
      input: entry,
      output: {
        dir: './dist/esm',
        format: 'esm',
      },
    },
    {
      ...common,
      input: entry,
      output: {
        dir: './dist/cjs',
        format: 'cjs',
      },
    },
  ]
}

function inlinePlugin() {
  return {
    name: 'inline-plugin',
    async transform(code, path) {
      if (/(__inline_(\w+)[ ]?\=)/g.test(code)) {
        // DO NOT REMOVE THESE, as they are used by `eval`
        // to execute the inline path action
        const fs = await import('node:fs')
        const __dirname = dirname(path)
        const { join } = await import('node:path')

        return code.replace(
          /(__inline_(\w+)\s?\=\s?(.+)[;]?[\n]?)/g,
          (...matchers) => {
            return `__inline_${matchers[2]} = \`${escapeJS(
              eval(matchers[3])
            )}\``
          }
        )
      }
    },
  }
}

export default main

function escapeJS(code) {
  return escapeTemplateLiterals(escapeBackticks(code))
}

function escapeBackticks(code) {
  return code.replace(/`/g, '\\`')
}

function escapeTemplateLiterals(code) {
  return code.replace(/\$\{/g, '\\${')
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
      if (info.format == 'cjs') {
        pkg.type = 'commonjs'
      }
      if (['esm', 'es'].includes(info.format)) {
        pkg.type = 'module'
      }
      const pkgPath = join(info.dir, 'package.json')
      await mkdir(info.dir, { recursive: true })

      if (existsSync(pkgPath)) {
        return
      }

      await fs.writeFile(
        join(info.dir, 'package.json'),
        JSON.stringify(pkg, null, 2),
        'utf-8'
      )
    },
  }
}
