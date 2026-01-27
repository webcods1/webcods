/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Roboto', 'sans-serif'],
            },
            colors: {
                primary: '#3498db',
                'primary-dark': '#217dbb',
                'accent': '#0fc1ca',
            },
        },
    },
    plugins: [],
}
