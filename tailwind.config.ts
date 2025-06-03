
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				// cinefluent brand colors
				royalBlue: { 
					500: '#1580FF',
					600: '#0D6FE8'
				},
				magenta: { 500: '#D11AFF' },
				spruce: { 500: '#22C55E' },
				persimmon: { 500: '#EF4444' },
				amber: { 400: '#FFB547' },
				navy: { 900: '#0B1B3B' },
				slate: { 
					50: '#F7FAFE',
					400: '#9CA3AF',
					500: '#5B6B8E',
					600: '#27344F',
					700: '#1E273C',
					800: '#E2E8F0',
					900: '#111827'
				},
				
				// Semantic tokens
				'bg-canvas-light': '#F7FAFE',
				'bg-card-light': '#FFFFFF',
				'content-primary-light': '#0B1B3B',
				'content-secondary-light': '#5B6B8E',
				'border-light': '#E2E8F0',
				'accent-solid-light': '#1580FF',
				'state-success-light': '#22C55E',
				'state-error-light': '#EF4444',
				'spark-light': '#FFB547',
				
				'bg-canvas-dark': '#111827',
				'bg-card-dark': '#1E273C',
				'content-primary-dark': '#E2E8F0',
				'content-secondary-dark': '#9CA3AF',
				'border-dark': '#27344F',
				'accent-solid-dark': '#1580FF',
				'state-success-dark': '#22C55E',
				'state-error-dark': '#EF4444',
				'spark-dark': '#FFB547',

				// Legacy shadcn colors for compatibility
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
			},
			backgroundImage: {
				'accent-gradient': 'linear-gradient(90deg, #1580FF 0%, #8C2BFF 50%, #D11AFF 100%)',
				'accent-gradient-light': 'linear-gradient(90deg, #1580FF 0%, #8C2BFF 50%, #D11AFF 100%)',
				'accent-gradient-dark': 'linear-gradient(90deg, #1580FF 0%, #8C2BFF 50%, #D11AFF 100%)',
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
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
