module.exports = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}', 'app/**/*.{ts,tsx}', 'components/**/*.{ts,tsx}'],
  theme: {
  	extend: {
  		colors: {
  			'blue-gray200': 'var(--blue-gray200)',
  			'cool-gray50': 'var(--cool-gray50)',
  			'gray-400': 'var(--gray-400)',
  			'gray-500': 'var(--gray-500)',
  			primaryColor: '#6AB240',
  			greenLight: '#8EC038',
  			secondColor: '#C2E66E',
  			greenShadeLight: '#6AB24063',
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			'bold-11px-CAP': 'var(--bold-11px-CAP-font-family)',
  			'regular-13px': 'var(--regular-13px-font-family)',
  			'regular-16px': 'var(--regular-16px-font-family)',
  			'semi-bold-16px': 'var(--semi-bold-16px-font-family)',
  			'text-sm-normal': 'var(--text-sm-normal-font-family)',
  			sans: [
  				'ui-sans-serif',
  				'system-ui',
  				'sans-serif',
  				'Apple Color Emoji"',
  				'Segoe UI Emoji"',
  				'Segoe UI Symbol"',
  				'Noto Color Emoji"'
  			]
  		},
  		screens: {
  			xl2: '1440px'
  		},
  		boxShadow: {
  			'shadow-xs': 'var(--shadow-xs)',
  			header: '0px 12px 51px 0px #00000017',
  			cart: '9px 33px 61px 0 #0000000A'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			'fade-in': {
  				from: {
  					opacity: 0
  				},
  				to: {
  					opacity: 1
  				}
  			},
  			'fade-out': {
  				from: {
  					opacity: 1
  				},
  				to: {
  					opacity: 0
  				}
  			},
  			'scale-in': {
  				'0%': {
  					opacity: 0,
  					transform: 'translate(-50%, -48%) scale(0.96)'
  				},
  				'100%': {
  					opacity: 1,
  					transform: 'translate(-50%, -50%) scale(1)'
  				}
  			},
  			'scale-out': {
  				'0%': {
  					opacity: 1,
  					transform: 'translate(-50%, -50%) scale(1)'
  				},
  				'100%': {
  					opacity: 0,
  					transform: 'translate(-50%, -48%) scale(0.96)'
  				}
  			},
  			shimmer: {
  				'0%': {
  					transform: 'translateX(-100%)'
  				},
  				'100%': {
  					transform: 'translateX(100%)'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'fade-in': 'fade-in 200ms ease-out forwards',
  			'fade-out': 'fade-out 150ms ease-in forwards',
  			'scale-in': 'scale-in 250ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
  			'scale-out': 'scale-out 200ms ease-in forwards',
  			shimmer: 'shimmer 2s infinite'
  		}
  	},
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	}
  },
  plugins: [require('tailwindcss-animate')],
  darkMode: ['class'],
};
