import clear from 'rollup-plugin-clear'
import babel from 'rollup-plugin-babel'
import filesize from 'rollup-plugin-filesize'
import pkg from './package.json'

export default [
  {
    input: 'src/index.js',
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ],
    plugins: [
      clear({
        targets: ['dist'],
      }),
      babel(),
      filesize(),
    ],
  },
]
