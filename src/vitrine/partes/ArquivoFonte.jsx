import { useState } from 'react'
import { ChevronDown, FileCode2 } from 'lucide-react'
import { FONTES } from './fontes'
import { BotaoCopiar } from './Copiar'

// Um arquivo do projeto: caminho, botão de copiar o arquivo inteiro e o conteúdo (abre ao clicar).
export default function ArquivoFonte({ caminho }) {
  const [aberto, setAberto] = useState(false)
  const texto = FONTES[caminho]
  if (texto == null) return <p className="vt-erro">Arquivo não encontrado: {caminho}</p>
  const linhas = texto.split('\n').length

  return (
    <div className="vt-arquivo">
      <div className="vt-arquivo__barra">
        <button type="button" className="vt-arquivo__nome" onClick={() => setAberto((v) => !v)} aria-expanded={aberto}>
          <FileCode2 size={16} />
          <span>src/{caminho}</span>
          <span className="vt-arquivo__linhas">{linhas} linhas</span>
          <ChevronDown size={16} className={`vt-arquivo__seta ${aberto ? 'vt-arquivo__seta--aberta' : ''}`} />
        </button>
        <BotaoCopiar texto={texto} rotulo="Copiar arquivo" />
      </div>
      {aberto && (
        <pre className="vt-codigo__pre vt-arquivo__pre">
          <code>{texto}</code>
        </pre>
      )}
    </div>
  )
}
