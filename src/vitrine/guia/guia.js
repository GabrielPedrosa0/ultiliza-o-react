// Lê o guia (o mesmo docs/guia_frontend.md do repositório) e divide em seções pelos títulos "## ".
import texto from './guia_frontend.md?raw'

// "3. React: componentes e JSX" -> "3-react-componentes-e-jsx" (o mesmo jeito do GitHub, sem acentos)
export function slug(titulo) {
  return titulo
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

const partes = texto.split(/^## /m)
const introducao = partes[0].replace(/^# .*\n/, '').trim() // texto antes da seção 1

export const SECOES_GUIA = partes.slice(1).map((parte, i) => {
  const quebra = parte.indexOf('\n')
  const titulo = parte.slice(0, quebra).trim()
  const corpo = parte.slice(quebra + 1).trim()
  return {
    id: slug(titulo),
    titulo: titulo.replace(/^\d+\.\s*/, ''),
    numero: i + 1,
    markdown: i === 0 ? `${introducao}\n\n${corpo}` : corpo,
  }
})
