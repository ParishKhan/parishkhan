/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: [
  				'Inter',
  				'-apple-system',
  				'BlinkMacSystemFont',
  				'Segoe UI',
  				'Roboto',
  				'sans-serif'
  			],
			display: [
				'Inter',
				'system-ui',
				'sans-serif'
			],
  			mono: [
  				'JetBrains Mono',
  				'Fira Code',
  				'Consolas',
  				'monospace'
  			]
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			ring: 'hsl(var(--ring))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			input: 'hsl(var(--input))',
        terminal: {
          green: '#10b981',
          blue: '#3b82f6',
          dark: '#000A13'
        }
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'fade-in': {
  				'0%': { opacity: '0', transform: 'translateY(10px)' },
  				'100%': { opacity: '1', transform: 'translateY(0)' }
  			},
  			'blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.1' }
        },
        'crt-flicker': {
          '0%': { opacity: '0.99' },
          '10%': { opacity: '0.94' },
          '20%': { opacity: '0.98' },
          '30%': { opacity: '0.95' },
          '40%': { opacity: '0.99' },
          '50%': { opacity: '0.96' },
          '60%': { opacity: '0.99' },
          '70%': { opacity: '0.95' },
          '80%': { opacity: '0.99' },
          '90%': { opacity: '0.97' },
          '100%': { opacity: '1' }
        },
        'terminal-glitch': {
          '0%': { transform: 'translate(0)' },
          '10%': { transform: 'translate(-3px, 1px)', filter: 'hue-rotate(90deg)' },
          '20%': { transform: 'translate(3px, -1px)' },
          '30%': { transform: 'translate(-3px, 0px)', filter: 'hue-rotate(0deg)' },
          '40%': { transform: 'translate(1px, 2px)' },
          '50%': { transform: 'translate(-1px, -2px)' },
          '100%': { transform: 'translate(0)' }
        },
        'typing': {
          'from': { width: '0' },
          'to': { width: '100%' }
        }
  		},
  		animation: {
  			'fade-in': 'fade-in 0.6s ease-out',
  			'blink': 'blink 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'crt-flicker': 'crt-flicker 0.15s infinite',
        'terminal-glitch': 'terminal-glitch 0.15s linear infinite',
        'typing': 'typing 2s steps(40, end)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")]
}