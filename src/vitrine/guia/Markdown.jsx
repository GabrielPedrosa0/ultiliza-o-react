// Mostra um trecho do guia: texto pelo `marked`, código com botão de copiar e,
// no lugar de <!-- demo:nome -->, o exemplo funcionando.
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { marked } from 'marked'
import BlocoCodigo from '../partes/BlocoCodigo'
import { DEMOS } from './Demos'
import { SECOES_GUIA, slug } from './guia'

const IDS = new Set(SECOES_GUIA.map((s) => s.id))

function htmlDo(token, links) {
  const lista = [token]
  lista.links = links
  return marked
    .parser(lista)
    .replace(LINK_LOCAL, '<code>$1</code>')
    .replace(/<a href="(https?:)/g, '<a target="_blank" rel="noreferrer" href="$1')
}

// Endereços do computador de quem roda o projeto (localhost, 127.0.0.1) não abrem na vitrine
// publicada: viram texto (código) para copiar, e não um link quebrado.
const LINK_LOCAL = /<a href="https?:\/\/(?:localhost|127\.0\.0\.1)[^"]*">([^<]*)<\/a>/g

export default function Markdown({ texto }) {
  const navigate = useNavigate()
  const tokens = useMemo(() => marked.lexer(texto), [texto])

  // Links do guia: "#7-telas-e-rotas" abre a seção; links de arquivo do repositório não fazem nada aqui.
  function aoClicar(e) {
    const a = e.target.closest('a')
    if (!a) return
    const href = a.getAttribute('href') ?? ''
    if (href.startsWith('http')) return
    e.preventDefault()
    const destino = slug(decodeURIComponent(href.replace(/^#/, '')).replace(/-/g, ' '))
    if (IDS.has(destino)) navigate(`/${destino}`)
  }

  return tokens.map((token, i) => {
    if (token.type === 'space') return null
    if (token.type === 'code') {
      const primeira = token.text.split('\n')[0]
      const arquivo = primeira.startsWith('// ') && /\.(jsx?|css)$/.test(primeira) ? primeira.slice(3) : null
      return <BlocoCodigo key={i} codigo={token.text} titulo={arquivo ?? (token.lang || 'código')} />
    }
    if (token.type === 'html') {
      const demo = token.text.match(/<!--\s*demo:([a-z-]+)\s*-->/)
      if (!demo) return null
      const Demo = DEMOS[demo[1]]
      return Demo ? <Demo key={i} /> : null
    }
    return (
      <div
        key={i}
        className="vt-md"
        onClick={aoClicar}
        dangerouslySetInnerHTML={{ __html: htmlDo(token, tokens.links) }}
      />
    )
  })
}
