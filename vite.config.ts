import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	test: {
		include: ['__tests__/**/*.spec.{ts,tsx}'],
		environment: 'jsdom',
		coverage: {
			branches: 80,
			functions: 80,
			lines: 80
		}
	},
	server: {
		port: 3000
	}

});
