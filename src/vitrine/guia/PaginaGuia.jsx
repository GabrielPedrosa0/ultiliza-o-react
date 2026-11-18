import Markdown from './Markdown'
import { SECOES_GUIA } from './guia'

// Uma seção do guia. "Anterior / Próxima" fica no fim de toda seção (Vitrine.jsx).
export default function PaginaGuia({ secao }) {
  return (
    <article className="vt-secao vt-guia">
      <header className="vt-secao__cabecalho">
        <p className="vt-secao__grupo">
          Guia do frontend · {secao.numero} de {SECOES_GUIA.length}
        </p>
        <h1 className="vt-secao__titulo">{secao.titulo}</h1>
      </header>
      <Markdown texto={secao.markdown} />
    </article>
  )
}
