import { useMemo, useState } from 'react'
import {
  ArrowLeft,
  Banknote,
  BatteryCharging,
  Bell,
  CalendarDays,
  Camera,
  Car,
  CarFront,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  CircleCheck,
  CircleX,
  ClipboardList,
  Clock,
  Cog,
  Copy,
  CreditCard,
  Disc3,
  Download,
  Drill,
  Droplets,
  EllipsisVertical,
  Eye,
  EyeOff,
  FileText,
  Fuel,
  Funnel,
  Gauge,
  Hammer,
  HardHat,
  Info,
  KeyRound,
  LayoutDashboard,
  Lock,
  LogOut,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Motorbike,
  Package,
  PackageSearch,
  Paperclip,
  Pencil,
  Phone,
  Plus,
  Printer,
  QrCode,
  ReceiptText,
  RefreshCw,
  Save,
  Search,
  Send,
  Settings,
  Share2,
  Thermometer,
  Timer,
  Trash2,
  TrendingDown,
  TrendingUp,
  TriangleAlert,
  Truck,
  Upload,
  User,
  Users,
  Wallet,
  Wrench,
  X,
} from 'lucide-react'
import PaginaSecao, { Bloco } from '../partes/PaginaSecao'
import BlocoCodigo from '../partes/BlocoCodigo'
import { BotaoCopiar } from '../partes/Copiar'
import { copiarTexto } from '../partes/copiarTexto'

const FUNCOES = {
  Fundo: [
    'pagina',
    'superficie',
    'sutil',
    'desabilitado',
    'invertido',
    'invertido-ativo',
    'primario',
    'primario-hover',
    'primario-sutil',
    'perigo',
    'perigo-hover',
  ],
  Texto: ['principal', 'secundario', 'apoio', 'desabilitado', 'invertido', 'invertido-apoio', 'primario', 'perigo'],
  Borda: ['padrao', 'forte', 'foco', 'perigo', 'invertida'],
}
const STATUS = ['neutro', 'info', 'atencao', 'sucesso', 'perigo', 'entregue']
const PALETA = {
  grafite: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  laranja: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900],
  verde: [100, 600, 700],
  ambar: [100, 500, 700],
  vermelho: [100, 600, 700],
  azul: [100, 600, 700],
}

function valorVar(nome) {
  return getComputedStyle(document.documentElement).getPropertyValue(nome).trim()
}

function Amostra({ variavel, tipo }) {
  const estilo =
    tipo === 'texto'
      ? {
          color: `var(${variavel})`,
          background: variavel.includes('invertido') ? 'var(--fundo-invertido)' : 'var(--fundo-superficie)',
        }
      : tipo === 'borda'
        ? { border: `3px solid var(${variavel})`, background: 'var(--fundo-superficie)' }
        : { background: `var(${variavel})` }
  return (
    <button
      type="button"
      className="vt-amostra"
      onClick={() => copiarTexto(`var(${variavel})`)}
      title="Clique para copiar"
    >
      <span className="vt-amostra__cor" style={estilo}>
        {tipo === 'texto' && 'Aa'}
      </span>
      <code>{variavel}</code>
      <span className="vt-amostra__hex">{valorVar(variavel)}</span>
    </button>
  )
}

export function Cores() {
  return (
    <PaginaSecao
      grupo="Fundações"
      titulo="Cores"
      descricao="Grafite para a base e laranja para a ação principal, como marcação de segurança em oficina. Nas telas use sempre as cores por função; a paleta existe só para montá-las. Clique numa amostra para copiar a variável."
      arquivos={['styles/tokens.css', 'styles/global.css']}
    >
      {Object.entries(FUNCOES).map(([grupo, nomes]) => (
        <Bloco key={grupo} titulo={`${grupo} \`--${grupo.toLowerCase()}-*\``}>
          <div className="vt-amostras">
            {nomes.map((n) => (
              <Amostra key={n} variavel={`--${grupo.toLowerCase()}-${n}`} tipo={grupo.toLowerCase()} />
            ))}
          </div>
        </Bloco>
      ))}
      <Bloco
        titulo="Status `--status-*-fundo` e `--status-*-texto`"
        texto="Usados pelos selos e avisos. Cada status tem um par fundo + texto com contraste AA."
      >
        <div className="vt-amostras">
          {STATUS.map((s) => (
            <div
              key={s}
              className="vt-par-status"
              style={{ background: `var(--status-${s}-fundo)`, color: `var(--status-${s}-texto)` }}
            >
              <strong>{s}</strong>
              <code>--status-{s}-fundo</code>
              <code>--status-{s}-texto</code>
            </div>
          ))}
        </div>
      </Bloco>
      <Bloco titulo="Paleta (não usar direto)">
        {Object.entries(PALETA).map(([nome, tons]) => (
          <div key={nome} className="vt-paleta">
            <span className="vt-paleta__nome">{nome}</span>
            <div className="vt-paleta__tons">
              {tons.map((t) => (
                <span
                  key={t}
                  className="vt-paleta__tom"
                  style={{ background: `var(--${nome}-${t})`, color: t >= 500 ? '#fff' : 'var(--grafite-900)' }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </Bloco>
      <Bloco titulo="No seu CSS">
        <BlocoCodigo
          titulo="minha-tela.css"
          codigo={`
.minha-caixa {
  background: var(--fundo-superficie);
  border: 1px solid var(--borda-padrao);
  border-radius: var(--raio-g);
  padding: var(--espaco-4);
  color: var(--texto-principal);
}
.minha-caixa__apoio {
  color: var(--texto-apoio);   /* nunca #6B7480 */
}`}
        />
      </Bloco>
    </PaginaSecao>
  )
}

const TIPOS = [
  [
    't-display',
    'Display/Grande',
    'Barlow Condensed SemiBold 48/52',
    'Login e números de capa (só PC)',
    'Revisão completa',
  ],
  ['t-h1', 'Título/H1', 'Barlow Condensed SemiBold 36/40', 'Título da página no PC', 'Revisão completa'],
  [
    't-h2',
    'Título/H2',
    'Barlow Condensed SemiBold 28/32',
    'Título da tela (celular) e seções (PC)',
    'Revisão completa',
  ],
  ['t-h3', 'Título/H3', 'Barlow SemiBold 20/28', 'Seções (celular) e título de cartão (PC)', 'Revisão completa'],
  ['t-h4', 'Título/H4', 'Barlow SemiBold 16/24', 'Título de cartão (celular) e de bloco (PC)', 'Revisão completa'],
  ['t-corpo-g', 'Corpo/Grande', 'Barlow Regular 16/24', 'Texto padrão no celular', 'Revisão completa'],
  ['t-corpo-m', 'Corpo/Médio', 'Barlow Regular 14/20', 'Texto padrão no PC', 'Revisão completa'],
  ['t-corpo-p', 'Corpo/Pequeno', 'Barlow Regular 12/16', 'Legendas', 'Revisão completa'],
  ['t-rotulo', 'Rótulo/Campo', 'Barlow Medium 13/16', 'Rótulo de campo e cabeçalho de tabela', 'Revisão completa'],
  ['t-valor', 'Dado/Valor', 'Barlow Condensed SemiBold 32/36', 'Totais e indicadores', 'R$ 18.240'],
  ['t-placa', 'Dado/Placa', 'JetBrains Mono Medium 14/20', 'Placa e nº da OS', 'QRS4F21'],
  ['t-codigo', 'Dado/Código', 'JetBrains Mono Regular 12/16', 'Código de peça', 'FLT-OL-0098'],
]

export function Tipografia() {
  return (
    <PaginaSecao
      grupo="Fundações"
      titulo="Tipografia"
      descricao="Barlow nasceu da sinalização de estrada e das placas de veículos: legível em tela pequena, de longe e com pressa. As fontes vêm do npm (@fontsource), então funcionam sem internet. Use as classes abaixo em vez de escrever font-size solto."
      arquivos={['styles/global.css']}
    >
      <Bloco>
        <div className="vt-tipos">
          {TIPOS.map(([classe, nome, spec, uso, amostra]) => (
            <div key={classe} className="vt-tipo">
              <div className="vt-tipo__meta">
                <code>.{classe}</code>
                <span>{nome}</span>
                <span className="vt-tipo__spec">{spec}</span>
                <span className="vt-tipo__spec">{uso}</span>
              </div>
              <span className={classe}>{amostra}</span>
              <BotaoCopiar texto={`className="${classe}"`} rotulo="Copiar classe" />
            </div>
          ))}
        </div>
      </Bloco>
      <Bloco titulo="Variáveis de fonte">
        <BlocoCodigo
          codigo={`
font-family: var(--fonte-titulo);  /* Barlow Condensed: títulos e números grandes */
font-family: var(--fonte-texto);   /* Barlow: texto, botões e campos */
font-family: var(--fonte-mono);    /* JetBrains Mono: placas, códigos e nº de OS */`}
        />
      </Bloco>
    </PaginaSecao>
  )
}

export function Espacos() {
  const espacos = [1, 2, 3, 4, 5, 6, 8, 10, 12, 16]
  const raios = [
    ['p', '4 px', 'Selos pequenos'],
    ['m', '8 px', 'Botões e campos'],
    ['g', '12 px', 'Cartões'],
    ['total', '999 px', 'Status e avatar'],
  ]
  return (
    <PaginaSecao
      grupo="Fundações"
      titulo="Espaços e raios"
      descricao="Múltiplos de 4 px. Celular: margem lateral de 16 px e controles de 48 px. PC: margem de 32 px e controles de 40 px. As variáveis --altura-controle e --margem-pagina já mudam sozinhas no corte de 900 px."
      arquivos={['styles/tokens.css']}
    >
      <Bloco titulo="Espaços `--espaco-*`">
        <div className="vt-espacos">
          {espacos.map((e) => (
            <div key={e} className="vt-espaco">
              <code>--espaco-{e}</code>
              <span className="vt-espaco__barra" style={{ width: `var(--espaco-${e})` }} />
              <span className="texto-apoio">{e * 4} px</span>
            </div>
          ))}
        </div>
      </Bloco>
      <Bloco titulo="Raios `--raio-*`">
        <div className="vt-raios">
          {raios.map(([n, px, uso]) => (
            <div key={n} className="vt-raio">
              <span className="vt-raio__caixa" style={{ borderRadius: `var(--raio-${n})` }} />
              <code>--raio-{n}</code>
              <span className="texto-apoio">
                {px} · {uso}
              </span>
            </div>
          ))}
        </div>
      </Bloco>
      <Bloco titulo="Classes de apoio do global.css">
        <BlocoCodigo
          codigo={`
<div className="pagina">          {/* margem certa para PC e celular + espaço entre blocos */}
<div className="pilha">           {/* coluna com 16 px entre os itens */}
<div className="linha">           {/* linha com 12 px entre os itens */}
<div className="grade-indicadores">  {/* 4 colunas no PC, 2 no celular */}
<h2 className="titulo-secao">     {/* "Ordens recentes", "Entregas de hoje" */}
<div className="so-pc">  /  <div className="so-celular">   {/* mostrar só num dos dois */}`}
        />
      </Bloco>
    </PaginaSecao>
  )
}

// Os ícones do catálogo do Figma, com o nome do componente na lucide-react.
const COMPONENTES = {
  ArrowLeft,
  Banknote,
  BatteryCharging,
  Bell,
  CalendarDays,
  Camera,
  Car,
  CarFront,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  CircleCheck,
  CircleX,
  ClipboardList,
  Clock,
  Cog,
  Copy,
  CreditCard,
  Disc3,
  Download,
  Drill,
  Droplets,
  EllipsisVertical,
  Eye,
  EyeOff,
  FileText,
  Fuel,
  Funnel,
  Gauge,
  Hammer,
  HardHat,
  Info,
  KeyRound,
  LayoutDashboard,
  Lock,
  LogOut,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Motorbike,
  Package,
  PackageSearch,
  Paperclip,
  Pencil,
  Phone,
  Plus,
  Printer,
  QrCode,
  ReceiptText,
  RefreshCw,
  Save,
  Search,
  Send,
  Settings,
  Share2,
  Thermometer,
  Timer,
  Trash2,
  TrendingDown,
  TrendingUp,
  TriangleAlert,
  Truck,
  Upload,
  User,
  Users,
  Wallet,
  Wrench,
  X,
}
const ICONES = {
  'Navegação e interface': [
    'LayoutDashboard',
    'ClipboardList',
    'Users',
    'Car',
    'Package',
    'CalendarDays',
    'Settings',
    'Menu',
    'Search',
    'Bell',
    'ChevronRight',
    'ChevronLeft',
    'ChevronDown',
    'ArrowLeft',
    'X',
    'Plus',
    'EllipsisVertical',
    'LogOut',
    'Funnel',
    'User',
  ],
  'Oficina e veículos': [
    'Wrench',
    'Hammer',
    'CarFront',
    'Truck',
    'Motorbike',
    'Gauge',
    'Fuel',
    'Droplets',
    'BatteryCharging',
    'Cog',
    'Disc3',
    'Thermometer',
    'KeyRound',
    'HardHat',
    'Drill',
  ],
  Ações: [
    'Pencil',
    'Trash2',
    'Save',
    'Printer',
    'Share2',
    'Download',
    'Upload',
    'Camera',
    'Paperclip',
    'Check',
    'Copy',
    'RefreshCw',
    'Send',
  ],
  Contato: ['Phone', 'MessageCircle', 'Mail', 'MapPin'],
  'Documentos e pagamento': ['FileText', 'ReceiptText', 'CreditCard', 'Banknote', 'Wallet', 'QrCode'],
  'Status e indicadores': [
    'CircleCheck',
    'Clock',
    'TriangleAlert',
    'CircleAlert',
    'Info',
    'CircleX',
    'Timer',
    'PackageSearch',
    'TrendingUp',
    'TrendingDown',
    'Eye',
    'EyeOff',
    'Lock',
  ],
}

export function Icones() {
  const [filtro, setFiltro] = useState('')
  const [copiado, setCopiado] = useState('')
  const grupos = useMemo(
    () =>
      Object.entries(ICONES)
        .map(([g, nomes]) => [g, nomes.filter((n) => n.toLowerCase().includes(filtro.toLowerCase()))])
        .filter(([, nomes]) => nomes.length),
    [filtro],
  )
  return (
    <PaginaSecao
      grupo="Fundações"
      titulo="Ícones"
      descricao="Os ícones de linha do catálogo do Figma, da Lucide (pacote lucide-react). Grade de 24 px e traço de 2 px. Sempre como componente, nunca emoji. Clique para copiar o código."
    >
      <Bloco>
        <BlocoCodigo
          codigo={`
import { Wrench } from 'lucide-react'

<Wrench size={20} />                       {/* botões e listas */}
<Wrench size={24} />                       {/* navegação */}
<Wrench size={16} aria-hidden="true" />    {/* junto de texto pequeno; decorativo */}
<Botao icone={Wrench}>Serviço</Botao>      {/* nos componentes, passe o ícone sem < /> */}`}
        />
        <input
          className="vt-filtro-icones"
          placeholder="Filtrar ícones (ex.: car, check)"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
        {grupos.map(([g, nomes]) => (
          <div key={g}>
            <h3 className="vt-exemplo__titulo" style={{ margin: '16px 0 8px' }}>
              {g}
            </h3>
            <div className="vt-icones">
              {nomes.map((n) => {
                const Icone = COMPONENTES[n]
                return (
                  <button
                    key={n}
                    type="button"
                    className={`vt-icone ${copiado === n ? 'vt-icone--ok' : ''}`}
                    onClick={async () => {
                      await copiarTexto(`import { ${n} } from 'lucide-react'\n<${n} size={20} />`)
                      setCopiado(n)
                    }}
                  >
                    <Icone size={24} />
                    <span>{copiado === n ? 'Copiado!' : n}</span>
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </Bloco>
    </PaginaSecao>
  )
}
