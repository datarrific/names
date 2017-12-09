import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'
import babel from 'rollup-plugin-babel'

var baseConfig = {
  plugins: [
    resolve({
      jsnext: true,
      main: true
    }),
    commonjs({
      include: [
        'node_modules/**'
      ],
      namedExports: {
        'node_modules/react/react.js': ['Children', 'Component', 'PropTypes', 'createElement'],
        'node_modules/react-dom/index.js': ['render']
      }
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.BUILD === 'production' ? 'production' : 'development')
    }),
    babel({
      exclude: 'node_modules/**'
    })
  ],
}

var clientConfig    = Object.assign({}, baseConfig)
clientConfig.input  = "names.js"
clientConfig.output = { format: 'iife', file: "bundle.js" }

export default [
  clientConfig
]
