// Barra branca do topo, no PC: busca geral (placa, cliente ou OS) e o sino. Integrante 6.
// No celular o topo é o CabecalhoPagina de cada tela (título + voltar), então esta barra some.
//
//   <BarraSuperior onBuscar={(texto) => navigate(`/ordens?busca=${texto}`)} />
import { useState } from 'react'
import { Bell } from 'lucide-react'
import BarraBusca from '../ui/BarraBusca'
import Botao from '../ui/Botao'
import './layout.css'

export default function BarraSuperior({ onBuscar, direita }) {
  const [texto, setTexto] = useState('')

  return (
    <header className="barra-superior">
      <BarraBusca
        valor={texto}
        onChange={setTexto}
        onEnviar={(valor) => valor.trim().length >= 2 && onBuscar?.(valor.trim())}
        placeholder="Buscar placa, cliente ou OS"
      />
      <div className="barra-superior__direita">
        {direita}
        {/* Sino: reservado para notificações; sem função nesta versão (especificação 3.2). */}
        <Botao variante="fantasma" icone={Bell} aria-label="Notificações" />
      </div>
    </header>
  )
}
