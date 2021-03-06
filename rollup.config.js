import babel from "rollup-plugin-babel";
import sourcemaps from "rollup-plugin-sourcemaps";

export default {
  input: 'compiled-js/filterbucks.js',
  output: {
    file: 'js/filterbucks.js',
    format: 'iife',
    sourcemap: true,
    globals: {
      jquery: 'jQuery'
    }
  },
  external: [
    'jquery'
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
    sourcemaps()
  ]
};