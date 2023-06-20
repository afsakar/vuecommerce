/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: 'class', // or 'media' or 'class'
    theme: {
        extend: {}
    },
    daisyui: {
        utils: true,
        themes: [
            'dark',
            {
                bootstrap: {
                    primary: '#0d6efd',
                    secondary: '#6c757d',
                    accent: '#1FB2A5',
                    neutral: '#191D24',
                    'base-100': '#ffffff',
                    info: '#0dcaf0',
                    success: '#198754',
                    warning: '#ffc107',
                    error: '#dc3545'
                },
                bootstrapDark: {
                    primary: '#0d6efd',
                    secondary: '#a7acb1',
                    accent: '#1FB2A5',
                    neutral: '#191D24',
                    'base-100': '#212529',
                    'base-200': '#343a40',
                    'base-300': '#495057',
                    info: '#0dcaf0',
                    success: '#198754',
                    warning: '#ffc107',
                    error: '#dc3545'
                }
            }
        ]
    },
    plugins: [require('daisyui'), require('@tailwindcss/forms')]
};
