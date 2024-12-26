/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/*.{ js,jsx,ts,tsx}',
    './src/**/*.{ js,jsx,ts,tsx}', // Include all JavaScript/TypeScript files in the `src` folder
    './src/components/*.{js,jsx,ts,tsx}', // Include all JavaScript/TypeScript files in the `src` folder
    './index.html',        // Include the `index.html` file if applicable
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

