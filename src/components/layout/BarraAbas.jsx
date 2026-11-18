// Barra de abas fixa no rodapé do celular (Figma "Aba inferior"). Integrante 6.
// Só aparece no celular (até 899 px).
import { NavLink } from 'react-router-dom'
import { ABAS_CELULAR } from './itensMenu'
import './layout.css'

export default function BarraAbas({ abas = ABAS_CELULAR }) {
  return (
    <nav className="barra-abas" aria-label="Navegação">
      {abas.map(({ para, rotulo, icone: Icone }) => (
        <NavLink
          key={para}
          to={para}
          end={para === '/'}
          className={({ isActive }) => `aba ${isActive ? 'aba--ativa' : ''}`}
        >
          <Icone size={24} aria-hidden="true" />
          <span className="aba__rotulo">{rotulo}</span>
        </NavLink>
      ))}
    </nav>
  )
}
