import { BotaoCopiar } from './Copiar'

export default function BlocoCodigo({ codigo, titulo, alturaMax }) {
  const texto = codigo.trim()
  return (
    <div className="vt-codigo">
      <div className="vt-codigo__barra">
        <span className="vt-codigo__titulo">{titulo ?? 'Código'}</span>
        <BotaoCopiar texto={texto} escuro />
      </div>
      <pre className="vt-codigo__pre" style={alturaMax ? { maxHeight: alturaMax } : undefined}>
        <code>{texto}</code>
      </pre>
    </div>
  )
}
