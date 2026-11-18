import { useState } from 'react'
import { Code2 } from 'lucide-react'
import BlocoCodigo from './BlocoCodigo'
import { BotaoCopiar } from './Copiar'
import TextoComCodigo from './TextoComCodigo'

// Um exemplo: o componente funcionando + o código para copiar.
// Links dentro do palco não navegam (para a vitrine não sair do lugar).
export default function Exemplo({
  titulo,
  descricao,
  codigo,
  children,
  fundo = 'pagina',
  coluna = false,
  codigoAberto = false,
}) {
  const [verCodigo, setVerCodigo] = useState(codigoAberto || !children)
  return (
    <div className="vt-exemplo">
      <div className="vt-exemplo__cabecalho">
        <div>
          <h3 className="vt-exemplo__titulo">{titulo}</h3>
          {descricao && (
            <p className="vt-exemplo__descricao">
              <TextoComCodigo texto={descricao} />
            </p>
          )}
        </div>
        {codigo && (
          <div className="vt-exemplo__acoes">
            <BotaoCopiar texto={codigo.trim()} rotulo="Copiar uso" />
            <button
              type="button"
              className={`vt-copiar ${verCodigo ? 'vt-copiar--ativo' : ''}`}
              onClick={() => setVerCodigo((v) => !v)}
            >
              <Code2 size={14} /> {verCodigo ? 'Esconder' : 'Ver código'}
            </button>
          </div>
        )}
      </div>
      {children && (
        <div
          className={`vt-palco vt-palco--${fundo} ${coluna ? 'vt-palco--coluna' : ''}`}
          onClickCapture={(e) => {
            if (e.target.closest('a')) e.preventDefault()
          }}
        >
          {children}
        </div>
      )}
      {codigo && verCodigo && <BlocoCodigo codigo={codigo} titulo="Como usar" />}
    </div>
  )
}
