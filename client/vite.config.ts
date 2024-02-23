import svgr from '@svgr/rollup'
import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

const __filename = import.meta.url.substring(
  import.meta.url.lastIndexOf('/') + 1
)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@types': path.resolve(__dirname, 'src/types')
    }
  }
})
