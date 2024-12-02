/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin'

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {},
	},
	plugins: [
		plugin(function ({ addBase, theme }) {
			addBase({
				'ol': {
					listStyleType: theme('listStyleType.decimal'),
					listStylePosition: 'inside',
				},
			})
		})
	],
}
