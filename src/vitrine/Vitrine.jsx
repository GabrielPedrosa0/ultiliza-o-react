// Vitrine de componentes do Oficina App: ver, testar e copiar.
import { useEffect, useState } from 'react'
import { NavLink, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { Database, FlaskConical, Wrench } from 'lucide-react'
import { gravarSecaoNoEndereco, secaoDoEndereco } from './ambiente'
import { modoAtual, rodandoNoComputador, trocarModo } from './apiExemplo'
import { SECOES } from './secoes'

function SeletorModo({ modo, onTrocar }) {
  const escolher = (novo) => {
    trocarModo(novo)
    onTrocar(novo)
  }
  return (
    <div className="vt-modo" role="group" aria-label="De onde vêm os dados">
      <button type="button" className={modo === 'exemplo' ? 'ativo' : ''} onClick={() => escolher('exemplo')}>
        <FlaskConical size={14} /> <span className="so-pc">Dados de</span> exemplo
      </button>
      <button type="button" className={modo === 'backend' ? 'ativo' : ''} onClick={() => escolher('backend')}>
        <Database size={14} /> Backend <span className="so-pc">real</span>
      </button>
    </div>
  )
}

function Navegacao() {
  const grupos = [...new Set(SECOES.map((s) => s.grupo))]
  return (
    <nav className="vt-nav" aria-label="Seções da vitrine">
      {grupos.map((g) => (
        <div key={g} className="vt-nav__grupo">
          <p className="vt-nav__titulo">{g}</p>
          {SECOES.filter((s) => s.grupo === g).map((s) => (
            <NavLink key={s.id} to={`/${s.id}`} className={({ isActive }) => `vt-nav__item ${isActive ? 'ativo' : ''}`}>
              {s.titulo}
            </NavLink>
          ))}
        </div>
      ))}
    </nav>
  )
}

// No celular, a navegação vira uma lista de seleção.
function NavegacaoCelular() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  return (
    <select
      className="vt-nav-celular"
      value={pathname.slice(1)}
      onChange={(e) => navigate(`/${e.target.value}`)}
      aria-label="Ir para a seção"
    >
      {SECOES.map((s) => (
        <option key={s.id} value={s.id}>
          {s.grupo} · {s.titulo}
        </option>
      ))}
    </select>
  )
}

// Sobe para o topo ao trocar de seção e mantém "#secao" no endereço (quando o navegador deixa).
function SincronizarSecao() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    window.scrollTo(0, 0)
    if (pathname.length > 1) gravarSecaoNoEndereco(pathname.slice(1))
  }, [pathname])
  useEffect(() => {
    const aoMudar = () => {
      const id = secaoDoEndereco()
      if (id) navigate(`/${id}`)
    }
    window.addEventListener('hashchange', aoMudar)
    return () => window.removeEventListener('hashchange', aoMudar)
  }, [navigate])
  return null
}

export default function Vitrine() {
  const [modo, setModo] = useState(modoAtual)
  return (
    <div className="vt">
      <header className="vt-topo">
        <div className="vt-topo__marca">
          <span className="vt-topo__icone">
            <Wrench size={18} />
          </span>
          <div>
            <p className="vt-topo__nome">Oficina App</p>
            <p className="vt-topo__sub">Vitrine de componentes</p>
          </div>
        </div>
        {rodandoNoComputador() && <SeletorModo modo={modo} onTrocar={setModo} />}
      </header>
      <div className="vt-corpo">
        <aside className="vt-lateral">
          <Navegacao />
        </aside>
        <main className="vt-conteudo">
          <NavegacaoCelular />
          <SincronizarSecao />
          {/* key: ao trocar o modo dos dados, a seção e as molduras carregam de novo */}
          <Routes key={modo}>
            <Route index element={<Navigate to={`/${SECOES[0].id}`} replace />} />
            {SECOES.map((s) => (
              <Route key={s.id} path={`/${s.id}`} element={<s.Componente />} />
            ))}
            <Route path="*" element={<Navigate to={`/${SECOES[0].id}`} replace />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
