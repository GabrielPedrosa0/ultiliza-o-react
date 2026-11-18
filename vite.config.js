import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// `npm run dev`      vitrine em http://localhost:5174 (com /api -> FastAPI na porta 8000)
// `npm run build`    gera dist/ normal
// `npm run arquivo`  gera um único dist/index.html (dá para abrir sem servidor e mandar para o grupo)
export default defineConfig(({ mode }) => ({
  plugins: [react(), ...(mode === 'arquivo' ? [viteSingleFile()] : [])],
  base: './',
  server: {
    port: 5174,
    proxy: { '/api': 'http://127.0.0.1:8000' },
  },
}))
