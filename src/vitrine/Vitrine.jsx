// Vitrine de componentes do Oficina App: ver, testar e copiar.
// Estrutura: topo | navegação lateral (busca + grupos) | conteúdo | "Nesta página" (telas largas).
// No celular a navegação vira uma gaveta que abre pelo botão do topo.
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, NavLink, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ChevronDown,
  ClipboardList,
  Compass,
  Component,
  Database,
  FlaskConical,
  LayoutTemplate,
  Menu,
  Palette,
  RefreshCw,
  Search,
  Server,
  SquareFunction,
  Wrench,
  X,
} from 'lucide-react'
import { gravarSecaoNoEndereco, secaoDoEndereco } from './ambiente'
import { modoAtual, rodandoNoComputador, trocarModo, verificarBackend } from './apiExemplo'
import { SECOES } from './secoes'

const ICONES_GRUPO = {
  'Guia do frontend': BookOpen,
  Vitrine: Compass,
  Fundações: Palette,
  Componentes: Component,
  'Ordem de serviço': ClipboardList,
  Layout: LayoutTemplate,
  Backend: Server,
  Utilitários: SquareFunction,
}

const semAcento = (t) =>
  String(t ?? '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()

const secaoAtual = (pathname) => SECOES.find((s) => `/${s.id}` === pathname) ?? SECOES[0]

// ------------------------------------------------------------ Backend real
function SeletorModo({ modo, onTrocar }) {
  const escolher = (novo) => {
    trocarModo(novo)
    onTrocar(novo)
  }
  return (
    <div className="vt-modo" role="group" aria-label="De onde vêm os dados">
      <button type="button" className={modo === 'exemplo' ? 'ativo' : ''} onClick={() => escolher('exemplo')}>
        <FlaskConical size={15} /> <span className="vt-so-largo">Dados de</span> exemplo
      </button>
      <button type="button" className={modo === 'backend' ? 'ativo' : ''} onClick={() => escolher('backend')}>
        <Database size={15} /> Backend <span className="vt-so-largo">real</span>
      </button>
    </div>
  )
}

const TEXTO_STATUS = {
  verificando: 'Verificando…',
  conectado: 'Conectado',
  'sem-rota': 'Conectado (sem /api/dashboard)',
  desligado: 'Backend desligado',
}

// Fica perguntando ao backend enquanto ele está desligado, para o aviso sumir sozinho quando ligar.
function useStatusBackend(ativo) {
  const [status, setStatus] = useState('verificando')
  const verificar = useCallback(async () => {
    setStatus('verificando')
    setStatus(await verificarBackend())
  }, [])
  useEffect(() => {
    if (!ativo) return undefined
    let cancelado = false
    let espera
    const rodar = async () => {
      const s = await verificarBackend()
      if (cancelado) return
      setStatus(s)
      if (s === 'desligado') espera = setTimeout(rodar, 5000)
    }
    rodar()
    return () => {
      cancelado = true
      clearTimeout(espera)
    }
  }, [ativo])
  return [status, verificar]
}

function AvisoBackend({ status, onVerificar, onUsarExemplo }) {
  if (status !== 'desligado' && status !== 'sem-rota') return null
  const desligado = status === 'desligado'
  return (
    <div className={`vt-aviso-backend ${desligado ? '' : 'vt-aviso-backend--info'}`} role="status">
      <div className="vt-aviso-backend__texto">
        <p className="vt-aviso-backend__titulo">
          {desligado
            ? 'O backend não respondeu em http://127.0.0.1:8000'
            : 'O backend respondeu, mas sem a rota do painel'}
        </p>
        {desligado ? (
          <>
            <p>
              As telas vão mostrar “Sem conexão com o servidor”. Ligue o backend num terminal (a vitrine confere de novo
              a cada 5 segundos):
            </p>
            <pre className="vt-aviso-backend__comandos">
              {`cd oficina-mecanica-os/backend
python3 -m venv .venv          # só na primeira vez
source .venv/bin/activate      # Windows: .venv\\Scripts\\activate
pip install -r requirements.txt
uvicorn app:app --reload

# em outro terminal, na pasta oficina-mecanica-os:
python scripts/dados_exemplo.py`}
            </pre>
          </>
        ) : (
          <p>
            Rotas que ainda não existem no backend (Mecânicos, Serviços, Peças, Usuários, Apontamentos) aparecem como
            “Essa rota ainda não existe no backend”. Para vê-las funcionando, use os dados de exemplo.
          </p>
        )}
      </div>
      <div className="vt-aviso-backend__acoes">
        <button type="button" className="vt-botao-claro" onClick={onVerificar}>
          <RefreshCw size={15} /> Verificar de novo
        </button>
        <button type="button" className="vt-botao-claro" onClick={onUsarExemplo}>
          <FlaskConical size={15} /> Usar dados de exemplo
        </button>
      </div>
    </div>
  )
}

// ------------------------------------------------------------ Navegação
function Navegacao({ aoEscolher }) {
  const { pathname } = useLocation()
  const atual = secaoAtual(pathname)
  const [busca, setBusca] = useState('')
  // Só o grupo da seção aberta começa aberto; os outros abrem com um clique.
  const [escolhas, setEscolhas] = useState({})
  const termo = semAcento(busca.trim())

  const grupos = useMemo(() => {
    const nomes = [...new Set(SECOES.map((s) => s.grupo))]
    return nomes
      .map((nome) => ({
        nome,
        secoes: SECOES.filter(
          (s) =>
            s.grupo === nome && (!termo || semAcento(`${s.titulo} ${s.grupo} ${s.palavras ?? ''}`).includes(termo)),
        ),
        total: SECOES.filter((s) => s.grupo === nome).length,
      }))
      .filter((g) => g.secoes.length > 0)
  }, [termo])

  const estaAberto = (nome) => Boolean(termo) || (escolhas[nome] ?? nome === atual.grupo)
  const alternar = (nome) => setEscolhas((atuais) => ({ ...atuais, [nome]: !estaAberto(nome) }))

  return (
    <nav className="vt-nav" aria-label="Seções da vitrine">
      <label className="vt-nav__busca">
        <Search size={17} aria-hidden="true" />
        <input
          type="search"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar seção…"
          aria-label="Buscar seção"
        />
      </label>
      {grupos.length === 0 && <p className="vt-nav__nada">Nenhuma seção com “{busca}”.</p>}
      {grupos.map((g) => {
        const Icone = ICONES_GRUPO[g.nome] ?? Component
        // Com busca, todos abrem.
        const aberto = estaAberto(g.nome)
        return (
          <div key={g.nome} className={`vt-nav__grupo ${g.nome === atual.grupo ? 'vt-nav__grupo--atual' : ''}`}>
            <button type="button" className="vt-nav__titulo" aria-expanded={aberto} onClick={() => alternar(g.nome)}>
              <Icone size={17} aria-hidden="true" />
              <span>{g.nome}</span>
              <span className="vt-nav__contagem">{termo ? `${g.secoes.length}/${g.total}` : g.total}</span>
              <ChevronDown size={16} className="vt-nav__seta" aria-hidden="true" />
            </button>
            {aberto && (
              <div className="vt-nav__itens">
                {g.secoes.map((s) => (
                  <NavLink
                    key={s.id}
                    to={`/${s.id}`}
                    onClick={aoEscolher}
                    className={({ isActive }) => `vt-nav__item ${isActive ? 'ativo' : ''}`}
                  >
                    {s.titulo}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </nav>
  )
}

function Gaveta({ aberta, onFechar }) {
  const { pathname } = useLocation()
  const atual = secaoAtual(pathname)
  useEffect(() => {
    if (!aberta) return undefined
    const tecla = (e) => e.key === 'Escape' && onFechar()
    document.addEventListener('keydown', tecla)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', tecla)
      document.body.style.overflow = ''
    }
  }, [aberta, onFechar])
  if (!aberta) return null
  return (
    <div className="vt-gaveta" role="dialog" aria-modal="true" aria-label="Seções da vitrine">
      <button type="button" className="vt-gaveta__fundo" aria-label="Fechar menu" onClick={onFechar} />
      <div className="vt-gaveta__painel">
        <div className="vt-gaveta__topo">
          <span>
            <small>{atual.grupo}</small>
            {atual.titulo}
          </span>
          <button type="button" className="vt-botao-icone" aria-label="Fechar menu" onClick={onFechar}>
            <X size={22} />
          </button>
        </div>
        <Navegacao aoEscolher={onFechar} />
      </div>
    </div>
  )
}

// "Nesta página": os títulos da seção aberta, com o atual marcado enquanto você rola.
function slug(texto, usados) {
  const base =
    semAcento(texto)
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') || 'titulo'
  let id = base
  for (let n = 2; usados.has(id); n += 1) id = `${base}-${n}`
  usados.add(id)
  return id
}

function NestaPagina({ conteudo }) {
  const { pathname } = useLocation()
  const [titulos, setTitulos] = useState([])
  const [ativo, setAtivo] = useState(null)

  useEffect(() => {
    const raiz = conteudo.current
    if (!raiz) return undefined
    let observador
    // Espera a seção desenhar (e o guia montar o markdown) antes de ler os títulos.
    const espera = setTimeout(() => {
      const usados = new Set()
      const elementos = [...raiz.querySelectorAll('.vt-bloco__titulo, .vt-md h3, .vt-exemplo__titulo')].filter(
        (el) => !el.closest('.vt-moldura'),
      )
      const lista = elementos.map((el) => {
        if (!el.id) el.id = `t-${slug(el.textContent, usados)}`
        return { id: el.id, texto: el.textContent, nivel: el.classList.contains('vt-exemplo__titulo') ? 2 : 1 }
      })
      setTitulos(lista)
      setAtivo(lista[0]?.id ?? null)
      observador = new IntersectionObserver(
        (entradas) => {
          const visivel = entradas
            .filter((e) => e.isIntersecting)
            .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
          if (visivel) setAtivo(visivel.target.id)
        },
        { rootMargin: '-80px 0px -65% 0px' },
      )
      elementos.forEach((el) => observador.observe(el))
    }, 120)
    return () => {
      clearTimeout(espera)
      observador?.disconnect()
    }
  }, [pathname, conteudo])

  if (titulos.length < 2) return <aside className="vt-indice" aria-hidden="true" />
  const irPara = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setAtivo(id)
  }
  return (
    <aside className="vt-indice" aria-label="Nesta página">
      <p className="vt-indice__titulo">Nesta página</p>
      <ul>
        {titulos.map((t) => (
          <li key={t.id}>
            <button
              type="button"
              className={`vt-indice__item vt-indice__item--n${t.nivel} ${t.id === ativo ? 'ativo' : ''}`}
              onClick={() => irPara(t.id)}
            >
              {t.texto}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  )
}

// "Anterior / Próxima" no fim de toda seção (o guia e a vitrine seguem uma sequência só).
function AnteriorProxima() {
  const { pathname } = useLocation()
  const i = SECOES.findIndex((s) => `/${s.id}` === pathname)
  if (i < 0) return null
  const anterior = SECOES[i - 1]
  const proxima = SECOES[i + 1]
  return (
    <nav className="vt-guia__navegar" aria-label="Seção anterior e próxima">
      {anterior ? (
        <Link to={`/${anterior.id}`} className="vt-guia__link">
          <ArrowLeft size={18} />
          <span>
            <small>Anterior · {anterior.grupo}</small>
            {anterior.titulo}
          </span>
        </Link>
      ) : (
        <span />
      )}
      {proxima && (
        <Link to={`/${proxima.id}`} className="vt-guia__link vt-guia__link--proxima">
          <span>
            <small>Próxima · {proxima.grupo}</small>
            {proxima.titulo}
          </span>
          <ArrowRight size={18} />
        </Link>
      )}
    </nav>
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
  const [gaveta, setGaveta] = useState(false)
  const local = rodandoNoComputador()
  const [status, verificar] = useStatusBackend(local && modo === 'backend')
  const conteudo = useRef(null)
  const { pathname } = useLocation()
  const atual = secaoAtual(pathname)
  const fecharGaveta = useCallback(() => setGaveta(false), [])
  const largura = atual.grupo === 'Guia do frontend' ? 'texto' : 'larga'

  const usarExemplo = () => {
    trocarModo('exemplo')
    setModo('exemplo')
  }

  return (
    <div className="vt">
      <header className="vt-topo">
        <button
          type="button"
          className="vt-botao-icone vt-topo__menu"
          aria-label="Abrir menu"
          onClick={() => setGaveta(true)}
        >
          <Menu size={24} />
        </button>
        <Link to={`/${SECOES[0].id}`} className="vt-topo__marca">
          <span className="vt-topo__icone">
            <Wrench size={20} />
          </span>
          <span>
            <span className="vt-topo__nome">Oficina App</span>
            <span className="vt-topo__sub">Guia e vitrine de componentes</span>
          </span>
        </Link>
        <span className="vt-topo__secao">
          {atual.grupo} <b>·</b> {atual.titulo}
        </span>
        {local && (
          <div className="vt-topo__dados">
            {modo === 'backend' && (
              <span className={`vt-status vt-status--${status}`} title="Situação do backend em http://127.0.0.1:8000">
                <span className="vt-status__ponto" />
                <span className="vt-so-largo">{TEXTO_STATUS[status]}</span>
              </span>
            )}
            <SeletorModo modo={modo} onTrocar={setModo} />
          </div>
        )}
      </header>
      <Gaveta aberta={gaveta} onFechar={fecharGaveta} />
      <div className="vt-corpo">
        <aside className="vt-lateral">
          <Navegacao />
        </aside>
        <main className={`vt-conteudo vt-conteudo--${largura}`} ref={conteudo}>
          <SincronizarSecao />
          {local && modo === 'backend' && (
            <AvisoBackend status={status} onVerificar={verificar} onUsarExemplo={usarExemplo} />
          )}
          {/* key: ao trocar o modo dos dados, a seção e as molduras carregam de novo */}
          <Routes key={modo}>
            <Route index element={<Navigate to={`/${SECOES[0].id}`} replace />} />
            {SECOES.map((s) => (
              <Route key={s.id} path={`/${s.id}`} element={<s.Componente />} />
            ))}
            <Route path="*" element={<Navigate to={`/${SECOES[0].id}`} replace />} />
          </Routes>
          <AnteriorProxima />
        </main>
        <NestaPagina conteudo={conteudo} />
      </div>
    </div>
  )
}
