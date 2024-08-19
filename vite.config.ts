import react from '@vitejs/plugin-react';
import dns from 'node:dns';
import path from 'path';
import { AliasOptions, defineConfig, ProxyOptions } from 'vite';
import svgr from 'vite-plugin-svgr';
import tsconfig from './tsconfig.app.json';

dns.setDefaultResultOrder('verbatim');

const formatAliasInfo = (info: string) => info.replace(/\/\*?$/, '');

const generateAlias = () => {
  const aliases: AliasOptions = {};

  const { baseUrl, paths } = tsconfig.compilerOptions;

  for (const pathKey in paths) {
    const pathEntries = paths[pathKey as keyof typeof paths];

    if (pathEntries.length !== 1) throw new Error('Incorrect paths length');

    const pathEntry = formatAliasInfo(pathEntries[0]);

    const resolvedPath = path.resolve(__dirname, baseUrl, pathEntry);

    aliases[formatAliasInfo(pathKey)] = resolvedPath;
  }

  return aliases;
};

const getDevProxy = (): Record<string, ProxyOptions> => ({
  '/fruitsApi': {
    target: 'https://www.fruityvice.com/',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/fruitsApi/, '/api'),
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      include: './src/assets/icons/*.svg',
    }),
  ],
  resolve: {
    alias: generateAlias(),
  },
  server: {
    cors: true,
    port: 8080,
    proxy: getDevProxy(),
    open: true,
    host: true,
  },
});
