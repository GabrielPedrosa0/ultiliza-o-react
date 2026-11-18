import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Markdown from './Markdown'
import { SECOES_GUIA } from './guia'

// Uma seção do guia, com "anterior / próxima" no fim.
export default function PaginaGuia({ secao }) {
  const anterior = SECOES_GUIA[secao.numero - 2]
  const proxima = SECOES_GUIA[secao.numero]
  return (
    <article className="vt-secao vt-guia">
      <header className="vt-secao__cabecalho">
        <p className="vt-secao__grupo">
          Guia do frontend · {secao.numero} de {SECOES_GUIA.length}
        </p>
        <h1 className="vt-secao__titulo">{secao.titulo}</h1>
      </header>
      <Markdown texto={secao.markdown} />
      <nav className="vt-guia__navegar" aria-label="Seções do guia">
        {anterior ? (
          <Link to={`/${anterior.id}`} className="vt-guia__link">
            <ArrowLeft size={16} />
            <span>
              <small>Anterior</small>
              {anterior.titulo}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {proxima && (
          <Link to={`/${proxima.id}`} className="vt-guia__link vt-guia__link--proxima">
            <span>
              <small>Próxima</small>
              {proxima.titulo}
            </span>
            <ArrowRight size={16} />
          </Link>
        )}
      </nav>
    </article>
  )
}
