/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontSize: {
        // Ajouter des tailles de police personnalisées
        'title': '10rem',
        'subtitle': '2rem',
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          50: "#f0f7ff",
          100: "#e0eefe",
          200: "#bae0fd",
          300: "#7cc8fb",
          400: "#36a9f7",
          500: "#0d8ee6",
          600: "#0072c6",
          700: "#015ba1",
          800: "#064d84",
          900: "#0a416e",
          950: "#072a4a",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Added custom theme colors
        'code-bg': '#1e293b',
        'code-text': '#e2e8f0',
        'code-comment': '#94a3b8',
        'code-keyword': '#7dd3fc',
        'code-function': '#c4b5fd',
        'code-string': '#86efac',

        // Section background colors
        'section-dark': '#0f172a',
        'section-light': '#f8fafc',
        'section-blue': '#f0f7ff',
        'section-accent': '#38bdf8',
        
        // Added gradients
        'gradient-start': '#0ea5e9',
        'gradient-end': '#6366f1',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'glow': '0 0 20px rgba(56, 189, 248, 0.5)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-angular': 'conic-gradient(from 225deg at 50% 50%, #0ea5e9 0%, #6366f1 50%, #ec4899 100%)',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    // Ajouter un plugin personnalisé pour garantir que nos classes de texte ne sont pas purgées
    function({ addUtilities }) {
      const newUtilities = {
        '.text-title': {
          fontSize: '10rem',
          lineHeight: '1',
        },
        '.text-subtitle': {
          fontSize: '2rem',
          lineHeight: '1.2',
        },
        // Responsive versions
        '@media (max-width: 1024px)': {
          '.text-title': {
            fontSize: '7rem',
          },
        },
        '@media (max-width: 768px)': {
          '.text-title': {
            fontSize: '5rem',
          },
        },
        '@media (max-width: 640px)': {
          '.text-title': {
            fontSize: '3.5rem',
          },
          '.text-subtitle': {
            fontSize: '1.5rem',
          },
        },
      }
      addUtilities(newUtilities)
    }
  ],
} 