import { useEffect, useRef, useState } from 'react'
import { ExternalLink, Monitor, Smartphone } from 'lucide-react'
import { linkAbrirApp, propsDoIframe } from '../ambiente'
import { modoAtual } from '../apiExemplo'

// Mostra uma tela do app dentro de um iframe com a largura de verdade (390 px ou 1440 px),
// para as regras de celular/PC (@media) funcionarem. O PC é reduzido para caber.
// A rota e o modo dos dados vão no window.name do iframe (ver ambiente.js).
export default function Moldura({ rota, tipo = 'pc', titulo }) {
  const largura = tipo === 'pc' ? 1440 : 390
  const altura = tipo === 'pc' ? 900 : 844
  const caixa = useRef(null)
  const [escala, setEscala] = useState(1)
  const abrir = linkAbrirApp(rota)
  const iframe = propsDoIframe(rota, modoAtual())

  useEffect(() => {
    const el = caixa.current
    if (!el) return
    const observar = new ResizeObserver(([e]) => setEscala(Math.min(1, e.contentRect.width / largura)))
    observar.observe(el)
    return () => observar.disconnect()
  }, [largura])

  return (
    <figure className={`vt-moldura vt-moldura--${tipo}`}>
      <figcaption className="vt-moldura__legenda">
        {tipo === 'pc' ? <Monitor size={14} /> : <Smartphone size={14} />}
        {titulo ?? (tipo === 'pc' ? 'PC · 1440 px' : 'Celular · 390 px')}
        {abrir && (
          <a href={abrir} target="_blank" rel="noreferrer" className="vt-moldura__abrir">
            Abrir <ExternalLink size={12} />
          </a>
        )}
      </figcaption>
      <div ref={caixa} className="vt-moldura__caixa" style={{ height: altura * escala, maxWidth: largura }}>
        <iframe
          loading="lazy"
          title={titulo ?? rota}
          {...iframe}
          style={{ width: largura, height: altura, transform: `scale(${escala})` }}
        />
      </div>
    </figure>
  )
}
