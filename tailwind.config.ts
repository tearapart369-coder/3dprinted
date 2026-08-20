import type { Config } from 'tailwindcss';
const config: Config = { content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'], theme: { extend: { colors: { midnight: '#0A0E1A', ivory: '#F5F0E8', gold: '#C9A84C', muted: '#A0A4B8' }, fontFamily: { serif: ['var(--font-playfair)'], sans: ['var(--font-inter)'] } } }, plugins: [] };
export default config;
