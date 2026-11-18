// Menu lateral escuro do PC (Figma "Barras e menu"). Integrante 6.
// Só aparece no PC (a partir de 900 px); no celular quem navega é a BarraAbas.
//
//   <MenuLateral usuario={{ nome: 'Ana', perfil: 'Recepção' }} nomeOficina="Oficina do Raimundo" />
import { NavLink } from 'react-router-dom'
import Avatar from '../ui/Avatar'
import Logo from './Logo'
import { ITEM_CONFIGURACOES, ITENS_MENU } from './itensMenu'
import './layout.css'

function ItemMenu({ para, rotulo, icone: Icone, emBreve }) {
  return (
    <NavLink
      to={para}
      end={para === '/'}
      className={({ isActive }) => `menu-item ${isActive ? 'menu-item--ativo' : ''}`}
    >
      <Icone size={20} className="menu-item__icone" aria-hidden="true" />
      <span className="menu-item__rotulo">{rotulo}</span>
      {emBreve && <span className="menu-item__breve">Em breve</span>}
    </NavLink>
  )
}

export default function MenuLateral({
  nomeOficina = 'Sua Oficina',
  usuario = { nome: 'Usuário', perfil: 'Recepção' },
  itens = ITENS_MENU,
  rodape,
}) {
  return (
    <aside className="menu-lateral" aria-label="Menu principal">
      <div className="menu-lateral__topo">
        <Logo nome={nomeOficina} />
      </div>

      <nav className="menu-lateral__nav">
        {itens.map((item) => (
          <ItemMenu key={item.para} {...item} />
        ))}
      </nav>

      <div className="menu-lateral__rodape">
        <ItemMenu {...ITEM_CONFIGURACOES} />
        {rodape}
        {usuario && (
          <div className="menu-lateral__usuario">
            <Avatar nome={usuario.nome} tamanho={32} />
            <span className="menu-lateral__usuario-textos">
              <span className="menu-lateral__usuario-nome">{usuario.nome}</span>
              <span className="menu-lateral__usuario-perfil">{usuario.perfil}</span>
            </span>
          </div>
        )}
      </div>
    </aside>
  )
}
