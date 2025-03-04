/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#3B82F6',
          focus: '#2563EB',
        },
        secondary: {
          DEFAULT: '#10B981',
          focus: '#059669',
        },
        accent: {
          DEFAULT: '#8B5CF6',
          focus: '#7C3AED',
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#3B82F6",
          "secondary": "#10B981",
          "accent": "#8B5CF6",
          "neutral": "#191D24",
          "base-100": "#2A303C",
          "info": "#3ABFF8",
          "success": "#36D399",
          "warning": "#FBBD23",
          "error": "#F87272",
        },
      },
      "dark",
      "light",
    ],
    darkTheme: "mytheme",
  },
}
