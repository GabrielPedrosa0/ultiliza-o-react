import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// `npm run dev`      vitrine em http://localhost:5174 (com /api -> FastAPI na porta 8000)
// `npm run build`    gera dist/ normal
// `npm run preview`  serve o dist/ em http://localhost:4173 (também repassa /api para o FastAPI)
// `npm run arquivo`  gera um único dist/index.html (dá para abrir sem servidor e mandar para o grupo)
// "Backend real" só aparece rodando no computador (localhost ou IP da rede de casa);
// publicada (Vercel, GitHub Pages, claude.ai) a vitrine usa sempre os dados de exemplo.
export default defineConfig(({ mode }) => ({
  plugins: [react(), ...(mode === 'arquivo' ? [viteSingleFile()] : [])],
  base: './',
  server: {
    port: 5174,
    proxy: { '/api': 'http://127.0.0.1:8000' },
  },
  preview: {
    proxy: { '/api': 'http://127.0.0.1:8000' },
  },
}))
