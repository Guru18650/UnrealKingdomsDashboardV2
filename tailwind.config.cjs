import { join } from 'path'
import forms from '@tailwindcss/forms'
import skeleton from '@skeletonlabs/skeleton/tailwind/skeleton.cjs'

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}', join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')],
	theme: {
		extend: {
			boxShadow: {
				'4xl': '0 0px 100px 0px rgba(0, 0, 0, 0.4)',
			  }
		},
	},
	plugins: [forms,...skeleton()],
}
