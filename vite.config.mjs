import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command, mode }) => {
  return {
    base: command === 'build' ? 'https://cdn.jsdelivr.net/gh/DrtSinX98/DrtSinX98.github.io@gh-pages/' : '/',
    build: {
      outDir: 'build',
    },
    plugins: [react()],
  };
});