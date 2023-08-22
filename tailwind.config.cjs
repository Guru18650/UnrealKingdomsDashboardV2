// @ts-check
import { join } from 'path';
import forms from '@tailwindcss/forms'

// 1. Import the Skeleton plugin
import { skeleton } from '@skeletonlabs/tw-plugin';

/** @type {import('tailwindcss').Config} */
export default {
	// 2. Opt for dark mode to be handled via the class method
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		// 3. Append the path to the Skeleton package
		join(require.resolve(
			'@skeletonlabs/skeleton'),
			'../**/*.{html,js,svelte,ts}'
		)
	],
	theme: {
		extend: {
			boxShadow: {
				'4xl': '0 0px 100px 0px rgba(0, 0, 0, 0.4)',
			  }
		},
	},
	plugins: [forms,
		// 4. Append the Skeleton plugin (after other plugins)
		skeleton({
			themes: {
				// Register each theme within this array:
				preset: [ { name: "modern", enhancements: true }, { name: "wintry", enhancements: true }] 
			}
		}) 
	]
}