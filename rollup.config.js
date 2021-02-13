import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'

export default {
	input: './index.js',
	external: ['@pelagiccreatures/sargasso'],

	output: [{
		format: 'iife',
		name: 'PelagicCreatures.FlyingFish',
		file: './dist/flyingfish.iife.js',
		globals: {
			'@pelagiccreatures/sargasso': 'PelagicCreatures'
		},
		sourcemap: true
	}],

	plugins: [
		json(),
		nodeResolve(),
		commonjs()
	]
}
