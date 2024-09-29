import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr';
import basicSsl from '@vitejs/plugin-basic-ssl'
import viteTsconfigPaths from 'vite-tsconfig-paths';
import pkg from './package.json';

const htmlTransformPlugin = (_env: string) => {
  return {
    name: 'html-transform',
    transformIndexHtml(html: string) {
      html = html.replace(/(<title>)(.*?)(<\/title>)/, `$1$2 v${pkg.version}$3`);
      return html;
    },
  }
}


export default defineConfig(({mode}) => {
  mode ||= 'local';

  return {
    base: '/',
    define: {
      'process.env': process.env
    },
    plugins: [
      react(), 
      svgr(), 
      basicSsl(),
      htmlTransformPlugin(mode),
      viteTsconfigPaths()
    ],
    build: {
      outDir: 'build'
    }
  };
});
