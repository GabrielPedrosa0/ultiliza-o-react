import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

import { copiarTexto } from './copiarTexto'

export function BotaoCopiar({ texto, rotulo = 'Copiar', escuro = false }) {
  const [copiado, setCopiado] = useState(false)
  return (
    <button
      type="button"
      className={`vt-copiar ${escuro ? 'vt-copiar--escuro' : ''} ${copiado ? 'vt-copiar--ok' : ''}`}
      onClick={async () => {
        if (await copiarTexto(texto)) {
          setCopiado(true)
          setTimeout(() => setCopiado(false), 1600)
        }
      }}
    >
      {copiado ? <Check size={14} /> : <Copy size={14} />}
      {copiado ? 'Copiado!' : rotulo}
    </button>
  )
}
