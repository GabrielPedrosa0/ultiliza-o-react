// Mostra `trechos entre crases` como <code>.
export default function TextoComCodigo({ texto }) {
  if (typeof texto !== 'string') return texto
  return texto.split('`').map((parte, i) => (i % 2 ? <code key={i}>{parte}</code> : parte))
}
