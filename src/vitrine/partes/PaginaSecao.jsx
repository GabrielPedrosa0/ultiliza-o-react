import ArquivoFonte from './ArquivoFonte'
import TextoComCodigo from './TextoComCodigo'

// Moldura de cada seção da vitrine: título, texto, arquivos para copiar e o conteúdo.
export default function PaginaSecao({ grupo, titulo, descricao, arquivos = [], responsavel, children }) {
  return (
    <article className="vt-secao">
      <header className="vt-secao__cabecalho">
        {grupo && <p className="vt-secao__grupo">{grupo}</p>}
        <h1 className="vt-secao__titulo">{titulo}</h1>
        {descricao && (
          <p className="vt-secao__descricao">
            <TextoComCodigo texto={descricao} />
          </p>
        )}
        {responsavel && <p className="vt-secao__resp">Responsável no projeto: {responsavel}</p>}
      </header>
      {arquivos.length > 0 && (
        <section className="vt-bloco">
          <h2 className="vt-bloco__titulo">Arquivos para copiar</h2>
          <p className="vt-bloco__texto">
            Cole no mesmo caminho dentro de <code>frontend/src/</code>. Os arquivos <code>.css</code> da pasta valem
            para todos os componentes dela.
          </p>
          <div className="vt-arquivos">
            {arquivos.map((a) => (
              <ArquivoFonte key={a} caminho={a} />
            ))}
          </div>
        </section>
      )}
      {children}
    </article>
  )
}

export function Bloco({ titulo, texto, children }) {
  return (
    <section className="vt-bloco">
      {titulo && (
        <h2 className="vt-bloco__titulo">
          <TextoComCodigo texto={titulo} />
        </h2>
      )}
      {texto && (
        <p className="vt-bloco__texto">
          <TextoComCodigo texto={texto} />
        </p>
      )}
      {children}
    </section>
  )
}
