import { useState } from 'react'
import {
  Banknote,
  Car,
  CircleCheck,
  PackageSearch,
  Pencil,
  Plus,
  Save,
  Send,
  Trash2,
  Users,
  Wrench,
  X,
} from 'lucide-react'
import PaginaSecao, { Bloco } from '../partes/PaginaSecao'
import Exemplo from '../partes/Exemplo'
import TabelaProps from '../partes/TabelaProps'
import Botao from '../../components/ui/Botao'
import Campo from '../../components/ui/Campo'
import SeloStatus, { Selo } from '../../components/ui/SeloStatus'
import Placa from '../../components/ui/Placa'
import Avatar from '../../components/ui/Avatar'
import Indicador from '../../components/ui/Indicador'
import Filtros from '../../components/ui/Filtros'
import Cartao, { Dado, GradeDados } from '../../components/ui/Cartao'
import ItemLista from '../../components/ui/ItemLista'
import BarraBusca from '../../components/ui/BarraBusca'
import Aviso from '../../components/ui/Aviso'
import { EstadoCarregando, EstadoErro, EstadoVazio } from '../../components/ui/Estados'
import Modal, { ModalConfirmacao } from '../../components/ui/Modal'
import EmConstrucao from '../../components/ui/EmConstrucao'
import { FILTROS_OS, LISTA_STATUS } from '../../constants/statusOS'

const UI = 'components/ui/'
const CSS = `${UI}ui.css`

/* ------------------------------------------------------------------ Botão */
export function SecBotao() {
  const [carregando, setCarregando] = useState(false)
  return (
    <PaginaSecao
      grupo="Componentes"
      titulo="Botão"
      descricao="Grande (48 px) no celular e Médio (40 px) no PC, sozinho. Um único Primário por tela. Com `para` vira link do react-router."
      arquivos={[`${UI}Botao.jsx`, CSS]}
    >
      <Exemplo
        titulo="Variantes"
        codigo={`
import { Plus } from 'lucide-react'
import Botao from '../../components/ui/Botao'

<Botao icone={Plus}>Nova ordem</Botao>
<Botao variante="secundario">Cancelar</Botao>
<Botao variante="sutil">Filtrar</Botao>
<Botao variante="fantasma">Esqueci minha senha</Botao>
<Botao variante="perigo">Excluir</Botao>`}
      >
        <Botao icone={Plus}>Nova ordem</Botao>
        <Botao variante="secundario">Cancelar</Botao>
        <Botao variante="sutil">Filtrar</Botao>
        <Botao variante="fantasma">Esqueci minha senha</Botao>
        <Botao variante="perigo" icone={Trash2}>
          Excluir
        </Botao>
      </Exemplo>
      <Exemplo
        titulo="Tamanhos"
        descricao="Sem `tamanho`, ele segue a tela: 48 px no celular e 40 px no PC."
        codigo={`
<Botao tamanho="grande">Salvar</Botao>   {/* 48 px */}
<Botao tamanho="medio">Salvar</Botao>    {/* 40 px */}
<Botao tamanho="pequeno">Salvar</Botao>  {/* 32 px: dentro de cartões e tabelas */}`}
      >
        <Botao tamanho="grande" icone={Save}>
          Salvar
        </Botao>
        <Botao tamanho="medio" icone={Save}>
          Salvar
        </Botao>
        <Botao tamanho="pequeno" icone={Save}>
          Salvar
        </Botao>
      </Exemplo>
      <Exemplo
        titulo="Estados: desabilitado e carregando"
        descricao="Enquanto `carregando`, o botão fica bloqueado e mostra o giro no lugar do ícone."
        codigo={`
const { executar, executando } = useAcao(cadastrarOrdem)

<Botao carregando={executando} onClick={() => executar(form)}>Criar ordem</Botao>
<Botao disabled>Salvar</Botao>`}
      >
        <Botao
          icone={Send}
          carregando={carregando}
          onClick={() => {
            setCarregando(true)
            setTimeout(() => setCarregando(false), 1500)
          }}
        >
          Clique para testar
        </Botao>
        <Botao disabled>Salvar</Botao>
        <Botao variante="secundario" disabled>
          Salvar
        </Botao>
      </Exemplo>
      <Exemplo
        titulo="Só ícone, link e largura total"
        codigo={`
<Botao variante="fantasma" icone={X} aria-label="Fechar" />   {/* aria-label é obrigatório */}
<Botao para="/ordens/nova" icone={Plus}>Nova ordem</Botao>    {/* vira <Link> */}
<Botao larguraTotal>Entrar</Botao>                            {/* ocupa a linha toda */}`}
        coluna
      >
        <div className="linha">
          <Botao variante="fantasma" icone={X} aria-label="Fechar" />
          <Botao variante="secundario" icone={Pencil} aria-label="Editar" />
          <Botao para="/ordens/nova" icone={Plus}>
            Nova ordem
          </Botao>
        </div>
        <div style={{ maxWidth: 360 }}>
          <Botao larguraTotal>Entrar</Botao>
        </div>
      </Exemplo>
      <Bloco titulo="Propriedades">
        <TabelaProps
          linhas={[
            [
              'variante',
              "'primario' | 'secundario' | 'sutil' | 'fantasma' | 'perigo'",
              "'primario'",
              'Cor e peso do botão.',
            ],
            [
              'tamanho',
              "'grande' | 'medio' | 'pequeno'",
              'automático',
              'Força uma altura. Sem ele: 48 px celular, 40 px PC.',
            ],
            ['icone', 'componente Lucide', '', 'Ícone à esquerda. Passe sem < />: icone={Plus}.'],
            ['iconeDireita', 'componente Lucide', '', 'Ícone à direita (ex.: ChevronRight).'],
            ['carregando', 'boolean', 'false', 'Mostra o giro e bloqueia o clique.'],
            ['larguraTotal', 'boolean', 'false', 'Ocupa toda a largura.'],
            ['para', 'string', '', 'Caminho do react-router: renderiza um <Link>.'],
            ['type', "'button' | 'submit'", "'button'", "Use 'submit' dentro de <form>."],
            ['...resto', 'props do <button>', '', 'onClick, disabled, aria-label, etc.'],
          ]}
        />
      </Bloco>
    </PaginaSecao>
  )
}

/* ------------------------------------------------------------------ Campo */
export function SecCampo() {
  const [placa, setPlaca] = useState('qrs-4f2')
  const [problema, setProblema] = useState('Barulho ao frear')
  const erroPlaca = /^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/.test(placa.toUpperCase().replace(/[^A-Z0-9]/g, ''))
    ? null
    : 'Placa inválida. Use ABC1234 ou ABC1D23.'
  return (
    <PaginaSecao
      grupo="Componentes"
      titulo="Campo"
      descricao="Um componente para texto, número, data, senha (com botão de mostrar), texto longo e seleção. Rótulo sempre visível; erro aparece embaixo, em vermelho, e é lido pelo leitor de tela."
      arquivos={[`${UI}Campo.jsx`, CSS]}
    >
      <Exemplo
        titulo="Texto com validação"
        descricao="Digite uma placa válida (ABC1234 ou ABC1D23) para o erro sumir."
        codigo={`
import Campo from '../../components/ui/Campo'
import { validarPlaca } from '../../utils/validadores'

const [placa, setPlaca] = useState('')

<Campo
  rotulo="Placa"
  value={placa}
  onChange={(e) => setPlaca(e.target.value)}
  erro={validarPlaca(placa)}
/>`}
        coluna
      >
        <div className="vt-largura-campo">
          <Campo rotulo="Placa" value={placa} onChange={(e) => setPlaca(e.target.value)} erro={erroPlaca} />
        </div>
      </Exemplo>
      <Exemplo
        titulo="Tipos"
        codigo={`
<Campo rotulo="E-mail" tipo="email" placeholder="voce@oficina.com.br" />
<Campo rotulo="Senha" tipo="senha" autoComplete="current-password" />
<Campo rotulo="Quilometragem" tipo="number" min="0" ajuda="Não pode ser menor que a última registrada." />
<Campo rotulo="Previsão" tipo="datetime-local" opcional />
<Campo rotulo="Mecânico" tipo="select" opcional>
  <option value="">A definir</option>
  <option value="Rafael">Rafael</option>
</Campo>
<Campo rotulo="Problema relatado" tipo="textarea" maxLength={1000} value={problema} onChange={...} />
<Campo rotulo="Cliente" disabled value="Marina Souza" />`}
      >
        <div className="vt-grade-campos">
          <Campo rotulo="E-mail" tipo="email" placeholder="voce@oficina.com.br" />
          <Campo rotulo="Senha" tipo="senha" defaultValue="oficina123" />
          <Campo
            rotulo="Quilometragem"
            tipo="number"
            min="0"
            defaultValue="82300"
            ajuda="Não pode ser menor que a última registrada."
          />
          <Campo rotulo="Previsão" tipo="datetime-local" opcional />
          <Campo rotulo="Mecânico" tipo="select" opcional defaultValue="">
            <option value="">A definir</option>
            <option value="Rafael">Rafael</option>
            <option value="Diego">Diego</option>
          </Campo>
          <Campo rotulo="Cliente" disabled value="Marina Souza" />
          <Campo
            rotulo="Problema relatado"
            tipo="textarea"
            maxLength={1000}
            value={problema}
            onChange={(e) => setProblema(e.target.value)}
          />
        </div>
      </Exemplo>
      <Bloco titulo="Propriedades">
        <TabelaProps
          linhas={[
            ['rotulo', 'string', '', 'Texto acima do campo (sempre visível).'],
            [
              'tipo',
              "'text' | 'email' | 'number' | 'senha' | 'textarea' | 'select' | 'date' | ...",
              "'text'",
              "'senha' tem o botão de mostrar; 'select' recebe <option> como filhos.",
            ],
            ['erro', 'string | null', '', 'Mensagem de erro: borda vermelha e texto embaixo.'],
            ['ajuda', 'string', '', 'Texto de apoio embaixo (quando não há erro).'],
            ['opcional', 'boolean', 'false', 'Mostra “(opcional)” no rótulo.'],
            ['icone', 'componente Lucide', '', 'Ícone dentro do campo, à esquerda.'],
            ['maxLength', 'number', '', "No 'textarea', mostra o contador (ex.: 18/1000)."],
            ['...resto', 'props do <input>', '', 'value, onChange, placeholder, disabled, autoComplete, min...'],
          ]}
        />
      </Bloco>
    </PaginaSecao>
  )
}

/* ------------------------------------------------------------------- Selo */
export function SecSelo() {
  return (
    <PaginaSecao
      grupo="Componentes"
      titulo="Selo de status"
      descricao="O status da OS sempre aparece com texto. A cor vem de constants/statusOS.js; o backend manda o código (EM_SERVICO) e o selo mostra “Em serviço”."
      arquivos={[`${UI}SeloStatus.jsx`, CSS, 'constants/statusOS.js']}
    >
      <Exemplo
        titulo="Os 6 status da OS"
        codigo={`
import SeloStatus from '../../components/ui/SeloStatus'

<SeloStatus status={os.status} />   {/* 'ORCAMENTO', 'EM_SERVICO', 'AGUARDANDO_PECA', 'PRONTA', 'ENTREGUE', 'CANCELADO' */}`}
      >
        {LISTA_STATUS.map((s) => (
          <SeloStatus key={s.valor} status={s.valor} />
        ))}
      </Exemplo>
      <Exemplo
        titulo="Selo genérico"
        descricao="Para outras etiquetas (garantia, perfil...), use <Selo> com um tom."
        codigo={`
import { Selo } from '../../components/ui/SeloStatus'

<Selo tom="sucesso" icone={CircleCheck}>Garantia até 18/02</Selo>
<Selo tom="primario">Gerente</Selo>`}
      >
        <Selo tom="sucesso" icone={CircleCheck}>
          Garantia até 18/02
        </Selo>
        <Selo tom="primario">Gerente</Selo>
        <Selo tom="info">Mecânico</Selo>
      </Exemplo>
      <Bloco titulo="Propriedades">
        <TabelaProps
          linhas={[
            ['status (SeloStatus)', 'código do backend', '', 'Escolhe texto e cor sozinho.'],
            [
              'tom (Selo)',
              "'neutro' | 'info' | 'atencao' | 'sucesso' | 'perigo' | 'entregue' | 'primario'",
              "'neutro'",
              'Cor do selo genérico.',
            ],
            ['icone (Selo)', 'componente Lucide', '', 'Ícone de 14 px antes do texto.'],
          ]}
        />
      </Bloco>
    </PaginaSecao>
  )
}

/* ---------------------------------------------------------- Placa e Avatar */
export function SecPlacaAvatar() {
  return (
    <PaginaSecao
      grupo="Componentes"
      titulo="Placa e Avatar"
      descricao="A placa usa fonte mono com borda (lembra a placa de verdade) e já limpa hífen e minúsculas. O avatar mostra as iniciais do nome."
      arquivos={[`${UI}Placa.jsx`, `${UI}Avatar.jsx`, CSS]}
    >
      <Exemplo
        titulo="Placa"
        codigo={`
import Placa from '../../components/ui/Placa'

<Placa placa="QRS4F21" />
<Placa placa="qrs-4f21" tamanho="grande" />   {/* Detalhe da OS */}
<Placa placa="TUV7G84" tamanho="pequena" />
<Placa placa="MNP2K56" tamanho="texto" />     {/* sem caixa: embaixo do modelo, na tabela */}`}
      >
        <Placa placa="QRS4F21" />
        <Placa placa="qrs-4f21" tamanho="grande" />
        <Placa placa="TUV7G84" tamanho="pequena" />
        <Placa placa="MNP2K56" tamanho="texto" />
      </Exemplo>
      <Exemplo
        titulo="Avatar"
        codigo={`
import Avatar from '../../components/ui/Avatar'

<Avatar nome="Marina Souza" />            {/* MS, 32 px */}
<Avatar nome="João Pereira" tamanho={40} />
<Avatar nome="Usuário" tamanho={56} />    {/* U */}`}
      >
        <Avatar nome="Marina Souza" />
        <Avatar nome="João Pereira" tamanho={40} />
        <Avatar nome="Usuário" tamanho={56} />
      </Exemplo>
    </PaginaSecao>
  )
}

/* -------------------------------------------------------------- Indicador */
export function SecIndicador() {
  return (
    <PaginaSecao
      grupo="Componentes"
      titulo="Indicador"
      descricao="Os cartões de número do Painel / Início. Com `para`, viram link para a lista já filtrada. Use dentro de .grade-indicadores (4 colunas no PC, 2 no celular)."
      arquivos={[`${UI}Indicador.jsx`, CSS]}
    >
      <Exemplo
        titulo="Grade de indicadores"
        codigo={`
import Indicador from '../../components/ui/Indicador'

<div className="grade-indicadores">
  <Indicador titulo="Em serviço" valor={r.em_servico} apoio="3 com entrega hoje" icone={Wrench} para="/ordens?status=EM_SERVICO" />
  <Indicador titulo="Aguardando peça" valor={4} apoio="1 atrasada" tom="perigo" icone={PackageSearch} />
  <Indicador titulo="Prontas" valor={3} apoio="Avisar o cliente" icone={CircleCheck} />
  <Indicador titulo="Faturado no mês" valor={formatarMoedaCurta(18240)} apoio="Até hoje" icone={Banknote} />
</div>`}
        coluna
      >
        <div className="grade-indicadores">
          <Indicador
            titulo="Em serviço"
            valor={12}
            apoio="3 com entrega hoje"
            icone={Wrench}
            para="/ordens?status=EM_SERVICO"
          />
          <Indicador titulo="Aguardando peça" valor={4} apoio="1 atrasada" tom="perigo" icone={PackageSearch} />
          <Indicador titulo="Prontas" valor={3} apoio="Avisar o cliente" icone={CircleCheck} />
          <Indicador titulo="Faturado no mês" valor="R$ 18.240" apoio="Até hoje" icone={Banknote} />
        </div>
      </Exemplo>
      <Exemplo
        titulo="Carregando"
        codigo={`<Indicador titulo="Em serviço" icone={Wrench} carregando={carregando} valor={dados?.em_servico} />`}
        coluna
      >
        <div className="grade-indicadores">
          <Indicador titulo="Em serviço" icone={Wrench} carregando />
          <Indicador titulo="Aguardando peça" icone={PackageSearch} carregando />
        </div>
      </Exemplo>
      <Bloco titulo="Propriedades">
        <TabelaProps
          linhas={[
            ['titulo', 'string', '', 'Nome do indicador.'],
            ['valor', 'number | string', '', 'O número grande. Formate dinheiro com formatarMoedaCurta.'],
            ['apoio', 'string', '', 'Texto pequeno embaixo.'],
            ['tom', "'perigo' | 'primario'", '', 'Destaca o texto de apoio (ex.: atrasadas).'],
            ['icone', 'componente Lucide', '', 'Ícone no canto.'],
            ['para / onClick', 'string / função', '', 'Torna o cartão clicável.'],
            ['carregando', 'boolean', 'false', 'Mostra o esqueleto no lugar do número.'],
          ]}
        />
      </Bloco>
    </PaginaSecao>
  )
}

/* ---------------------------------------------------------------- Filtros */
export function SecFiltros() {
  const [status, setStatus] = useState('')
  return (
    <PaginaSecao
      grupo="Componentes"
      titulo="Filtros"
      descricao="Pílulas com um filtro ativo por vez. No celular rolam na horizontal. A lista de status da OS já está pronta em FILTROS_OS."
      arquivos={[`${UI}Filtros.jsx`, CSS]}
    >
      <Exemplo
        titulo="Filtro de status da OS"
        descricao={`Selecionado: ${status || 'Todas'}`}
        codigo={`
import Filtros from '../../components/ui/Filtros'
import { FILTROS_OS } from '../../constants/statusOS'

const [status, setStatus] = useState('')   // '' = Todas

<Filtros opcoes={FILTROS_OS} valor={status} onChange={setStatus} rotulo="Filtrar por status" />

// Opções próprias (quantidade é opcional):
<Filtros opcoes={[{ valor: 'ativos', rotulo: 'Ativos', quantidade: 12 }, ...]} ... />`}
      >
        <Filtros opcoes={FILTROS_OS} valor={status} onChange={setStatus} rotulo="Filtrar por status" />
      </Exemplo>
    </PaginaSecao>
  )
}

/* ---------------------------------------------------------- Cartão e Dado */
export function SecCartao() {
  return (
    <PaginaSecao
      grupo="Componentes"
      titulo="Cartão e Dado"
      descricao="Cartao é a caixa branca com borda (raio 12 px) que agrupa blocos. Dado é o par rótulo + valor; GradeDados arruma vários em colunas."
      arquivos={[`${UI}Cartao.jsx`, CSS]}
    >
      <Exemplo
        titulo="Cartão com dados"
        codigo={`
import Cartao, { Dado, GradeDados } from '../../components/ui/Cartao'

<Cartao titulo="Veículo" acao={<Botao variante="fantasma" tamanho="pequeno" icone={Pencil}>Editar</Botao>}>
  <GradeDados>
    <Dado rotulo="Entrada">Hoje, 08:10</Dado>
    <Dado rotulo="Previsão">Hoje, 17:00</Dado>
    <Dado rotulo="Quilometragem">{formatarKm(os.quilometragem)}</Dado>
    <Dado rotulo="Mecânico">{os.mecanico ?? 'A definir'}</Dado>
  </GradeDados>
</Cartao>`}
        coluna
      >
        <div style={{ maxWidth: 420 }}>
          <Cartao
            titulo="Veículo"
            acao={
              <Botao variante="fantasma" tamanho="pequeno" icone={Pencil}>
                Editar
              </Botao>
            }
          >
            <GradeDados>
              <Dado rotulo="Entrada">Hoje, 08:10</Dado>
              <Dado rotulo="Previsão">Hoje, 17:00</Dado>
              <Dado rotulo="Quilometragem">82.300 km</Dado>
              <Dado rotulo="Mecânico">Rafael</Dado>
            </GradeDados>
          </Cartao>
        </div>
      </Exemplo>
      <Bloco titulo="Propriedades">
        <TabelaProps
          linhas={[
            ['titulo (Cartao)', 'string', '', 'Título no topo do cartão.'],
            ['acao (Cartao)', 'elemento', '', 'Botão à direita do título.'],
            [
              'semEspaco (Cartao)',
              'boolean',
              'false',
              'Sem padding: para listas (ItemLista) e tabelas encostarem na borda.',
            ],
            ['rotulo (Dado)', 'string', '', 'Texto pequeno de cima.'],
            ['colunas (GradeDados)', 'number', '2', 'Quantas colunas.'],
          ]}
        />
      </Bloco>
    </PaginaSecao>
  )
}

/* ----------------------------------------------------------- Item de lista */
export function SecItemLista() {
  return (
    <PaginaSecao
      grupo="Componentes"
      titulo="Item de lista"
      descricao="Linha com avatar ou ícone, título, subtítulo e seta. É o item da lista de Clientes do Figma; serve também para veículos e para o menu “Mais”. Use dentro de <Cartao semEspaco>."
      arquivos={[`${UI}ItemLista.jsx`, CSS]}
    >
      <Exemplo
        titulo="Lista de clientes"
        codigo={`
import ItemLista from '../../components/ui/ItemLista'

<Cartao semEspaco>
  {clientes.map((c) => (
    <ItemLista
      key={c.id}
      avatar={c.nome}
      titulo={c.nome}
      subtitulo={\`\${plural(c.quantidade_veiculos, 'veículo')} · \${c.telefone}\`}
      para={\`/clientes/\${c.id}\`}
    />
  ))}
</Cartao>`}
        coluna
      >
        <div style={{ maxWidth: 420 }}>
          <Cartao semEspaco>
            <ItemLista
              avatar="Marina Souza"
              titulo="Marina Souza"
              subtitulo="1 veículo · (85) 90000-0001"
              para="/clientes/1"
            />
            <ItemLista
              avatar="João Pereira"
              titulo="João Pereira"
              subtitulo="2 veículos · (85) 90000-0002"
              para="/clientes/2"
              ativo
            />
            <ItemLista
              icone={Car}
              titulo="Volkswagen Gol 1.6"
              subtitulo="QRS4F21 · 82.300 km"
              direita={<SeloStatus status="EM_SERVICO" />}
            />
          </Cartao>
        </div>
      </Exemplo>
      <Bloco titulo="Propriedades">
        <TabelaProps
          linhas={[
            ['titulo / subtitulo', 'string', '', 'Textos da linha (cortam com “...” se não couberem).'],
            ['avatar', 'string (nome)', '', 'Mostra o Avatar com as iniciais.'],
            ['icone', 'componente Lucide', '', 'Ícone num quadrado cinza (no lugar do avatar).'],
            ['direita', 'elemento', '', 'Algo à direita: selo, valor...'],
            ['para / onClick', 'string / função', '', 'Torna clicável e mostra a seta.'],
            ['ativo', 'boolean', 'false', 'Fundo laranja-claro (item aberto ao lado, no PC).'],
          ]}
        />
      </Bloco>
    </PaginaSecao>
  )
}

/* ------------------------------------------------------------- Barra busca */
export function SecBusca() {
  const [texto, setTexto] = useState('')
  return (
    <PaginaSecao
      grupo="Componentes"
      titulo="Barra de busca"
      descricao="Campo com lupa e botão de limpar. A busca começa a partir de 2 caracteres; combine com useDebounce para não chamar o backend a cada tecla."
      arquivos={[`${UI}BarraBusca.jsx`, CSS, 'hooks/useDebounce.js']}
    >
      <Exemplo
        titulo="Busca com espera"
        descricao={texto.trim().length >= 2 ? `Buscaria por “${texto.trim()}”` : 'Digite pelo menos 2 caracteres'}
        codigo={`
import BarraBusca from '../../components/ui/BarraBusca'
import { useDebounce } from '../../hooks/useDebounce'

const [texto, setTexto] = useState('')
const busca = useDebounce(texto.trim(), 300)
const { dados } = useApi(() => pesquisar(busca), [busca], { ativo: busca.length >= 2 })

<BarraBusca valor={texto} onChange={setTexto} placeholder="Placa, cliente ou OS" />`}
        coluna
      >
        <BarraBusca valor={texto} onChange={setTexto} placeholder="Placa, cliente ou OS" />
      </Exemplo>
    </PaginaSecao>
  )
}

/* ------------------------------------------------------------------ Aviso */
export function SecAviso() {
  return (
    <PaginaSecao
      grupo="Componentes"
      titulo="Aviso"
      descricao="Mensagem dentro da tela: erro do login, erro ao salvar, alerta de OS já aberta, sucesso. Erro do backend vem pronto em erro.message (api.js já traduz o “detail” do FastAPI)."
      arquivos={[`${UI}Aviso.jsx`, CSS]}
    >
      <Exemplo
        titulo="Tons"
        codigo={`
import Aviso from '../../components/ui/Aviso'

{erro && <Aviso tom="perigo">{erro.message}</Aviso>}
<Aviso tom="atencao" titulo="Este veículo já tem uma OS aberta"><Link to="/ordens/1041">Abrir OS 1041</Link></Aviso>
<Aviso tom="sucesso" onFechar={() => setOk(false)}>Ordem criada.</Aviso>
<Aviso tom="info">O link de troca de senha vale por 1 hora.</Aviso>`}
        coluna
      >
        <Aviso tom="perigo">E-mail ou senha incorretos.</Aviso>
        <Aviso tom="atencao" titulo="Este veículo já tem uma OS aberta">
          <a href="#/">Abrir OS 1041</a>
        </Aviso>
        <Aviso tom="sucesso" onFechar={() => {}}>
          Ordem criada.
        </Aviso>
        <Aviso tom="info">O link de troca de senha vale por 1 hora.</Aviso>
      </Exemplo>
    </PaginaSecao>
  )
}

/* ---------------------------------------------------------------- Estados */
export function SecEstados() {
  return (
    <PaginaSecao
      grupo="Componentes"
      titulo="Estados: carregando, vazio e erro"
      descricao="Toda lista precisa dos três (especificação 2.4). O carregando é um esqueleto com o formato do que vai aparecer; o vazio tem o botão de criar; o erro tem “Tentar de novo”."
      arquivos={[`${UI}Estados.jsx`, CSS]}
    >
      <Exemplo
        titulo="O padrão de toda lista"
        codigo={`
import { EstadoCarregando, EstadoErro, EstadoVazio } from '../../components/ui/Estados'

const { dados, carregando, erro, recarregar } = useApi(() => listarClientes({ nome: busca }), [busca])

if (carregando) return <EstadoCarregando formato="lista" />
if (erro) return <EstadoErro mensagem={erro.message} onTentarDeNovo={recarregar} />
if (dados.length === 0)
  return <EstadoVazio icone={Users} titulo="Nenhum cliente encontrado" acao={<Botao icone={Plus}>Novo cliente</Botao>} />

return dados.map(...)`}
      >
        <div className="vt-tres">
          <EstadoCarregando formato="lista" />
          <Cartao>
            <EstadoVazio
              icone={Users}
              titulo="Nenhum cliente encontrado"
              acao={
                <Botao icone={Plus} tamanho="medio">
                  Novo cliente
                </Botao>
              }
            />
          </Cartao>
          <Cartao>
            <EstadoErro
              mensagem="Sem conexão com o servidor. Confira a internet e tente de novo."
              onTentarDeNovo={() => {}}
            />
          </Cartao>
        </div>
      </Exemplo>

      <Exemplo
        titulo="Carregando: esqueleto no formato do conteúdo"
        descricao="Em vez do spinner, mostre blocos cinza com o desenho do que vai chegar. Escolha o formato parecido com a tela; se ela muda entre PC e celular, passe formatoCelular também."
        codigo={`
<EstadoCarregando formato="lista" />                       // ItemLista (clientes, mecânicos, veículos)
<EstadoCarregando formato="cartoes" linhas={2} />          // CartaoOS do celular
<EstadoCarregando formato="tabela" linhas={4} colunas={5} /> // Tabela / TabelaOS
<Cartao><EstadoCarregando formato="bloco" /></Cartao>       // conteúdo solto dentro de um cartão

// Tabela no PC e cartões no celular:
<EstadoCarregando formato="tabela" formatoCelular="cartoes" texto="Carregando ordens..." />`}
      >
        <div className="pilha">
          <div className="vt-tres">
            <EstadoCarregando formato="lista" />
            <EstadoCarregando formato="cartoes" linhas={2} />
            <Cartao>
              <EstadoCarregando formato="bloco" />
            </Cartao>
          </div>
          <EstadoCarregando formato="tabela" linhas={4} colunas={5} />
        </div>
      </Exemplo>
    </PaginaSecao>
  )
}

/* ------------------------------------------------------------------ Modal */
export function SecModal() {
  const [aberto, setAberto] = useState(false)
  const [confirmar, setConfirmar] = useState(false)
  return (
    <PaginaSecao
      grupo="Componentes"
      titulo="Modal"
      descricao="Janela sobre a tela, com o <dialog> do navegador (Esc fecha, o foco fica preso dentro). No celular sobe de baixo. ModalConfirmacao já vem com os dois botões: use para “Sair sem salvar?” e “Cancelar OS”."
      arquivos={[`${UI}Modal.jsx`, CSS]}
    >
      <Exemplo
        titulo="Modal com formulário"
        codigo={`
import Modal from '../../components/ui/Modal'

const [aberto, setAberto] = useState(false)

<Botao onClick={() => setAberto(true)}>Adicionar item</Botao>
<Modal
  aberto={aberto}
  onFechar={() => setAberto(false)}
  titulo="Adicionar item"
  rodape={<>
    <Botao variante="secundario" onClick={() => setAberto(false)}>Cancelar</Botao>
    <Botao onClick={salvar}>Salvar item</Botao>
  </>}
>
  <Campo rotulo="Descrição" />
  <Campo rotulo="Valor unitário (R$)" inputMode="decimal" />
</Modal>`}
      >
        <Botao icone={Plus} onClick={() => setAberto(true)}>
          Abrir modal
        </Botao>
        <Botao variante="secundario" onClick={() => setConfirmar(true)}>
          Abrir confirmação
        </Botao>
        <Modal
          aberto={aberto}
          onFechar={() => setAberto(false)}
          titulo="Adicionar item"
          rodape={
            <>
              <Botao variante="secundario" onClick={() => setAberto(false)}>
                Cancelar
              </Botao>
              <Botao onClick={() => setAberto(false)}>Salvar item</Botao>
            </>
          }
        >
          <Campo rotulo="Tipo" tipo="select">
            <option>Mão de obra</option>
            <option>Peça</option>
          </Campo>
          <Campo rotulo="Descrição" />
          <Campo rotulo="Valor unitário (R$)" inputMode="decimal" />
        </Modal>
        <ModalConfirmacao
          aberto={confirmar}
          titulo="Sair sem salvar?"
          texto="As alterações feitas neste formulário serão perdidas."
          rotuloConfirmar="Sair"
          perigo
          onConfirmar={() => setConfirmar(false)}
          onCancelar={() => setConfirmar(false)}
        />
      </Exemplo>
      <Exemplo
        titulo="Confirmação"
        codigo={`
import { ModalConfirmacao } from '../../components/ui/Modal'

<ModalConfirmacao
  aberto={sair}
  titulo="Sair sem salvar?"
  texto="As alterações feitas neste formulário serão perdidas."
  rotuloConfirmar="Sair"
  perigo
  onConfirmar={() => navigate(-1)}
  onCancelar={() => setSair(false)}
/>`}
      />
    </PaginaSecao>
  )
}

/* ---------------------------------------------------------- Em construção */
export function SecEmConstrucao() {
  return (
    <PaginaSecao
      grupo="Componentes"
      titulo="Em construção"
      descricao="Lugar reservado das telas que ainda não foram feitas. Todas as páginas do projeto começam com ele; cada integrante troca pelo conteúdo real."
      arquivos={[`${UI}EmConstrucao.jsx`, CSS]}
    >
      <Exemplo
        titulo="Tela reservada"
        codigo={`<EmConstrucao titulo="Clientes" responsavel="Integrante 5" descricao="Lista com busca por nome, telefone ou placa." />`}
      >
        <EmConstrucao
          titulo="Clientes"
          responsavel="Integrante 5"
          descricao="Lista com busca por nome, telefone ou placa."
        />
      </Exemplo>
    </PaginaSecao>
  )
}
