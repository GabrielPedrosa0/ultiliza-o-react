// Seções dos componentes que vieram com o Figma do MVP: Etiqueta, Interruptor, Abas, Tabela,
// Grupo de campos, Linha de veículo e Apontamentos.
import { useState } from 'react'
import PaginaSecao, { Bloco } from '../partes/PaginaSecao'
import Exemplo from '../partes/Exemplo'
import TabelaProps from '../partes/TabelaProps'
import Etiqueta from '../../components/ui/Etiqueta'
import Interruptor from '../../components/ui/Interruptor'
import Abas from '../../components/ui/Abas'
import Tabela from '../../components/ui/Tabela'
import GrupoCampos from '../../components/ui/GrupoCampos'
import Campo from '../../components/ui/Campo'
import Cartao from '../../components/ui/Cartao'
import Avatar from '../../components/ui/Avatar'
import Placa from '../../components/ui/Placa'
import Filtros from '../../components/ui/Filtros'
import LinhaVeiculo from '../../components/veiculos/LinhaVeiculo'
import Apontamentos from '../../components/os/Apontamentos'
import { FILTROS_OS_CELULAR, FILTROS_OS_PC } from '../../constants/statusOS'
import { TIPOS_APONTAMENTO } from '../../constants/apontamentos'
import { formatarDuracao, formatarExpediente, formatarKm, formatarMoeda } from '../../utils/formatadores'
import { estoqueBaixo } from '../../utils/ordemServico'
import { APONTAMENTOS, CLIENTES, MECANICOS, PECAS, SERVICOS, VEICULOS } from '../dadosExemplo'

const UI = 'components/ui/'
const CSS = `${UI}ui.css`
const comDono = VEICULOS.map((v) => ({ ...v, cliente_nome: CLIENTES.find((c) => c.id === v.cliente_id)?.nome }))

export function SecEtiqueta() {
  return (
    <PaginaSecao
      grupo="Componentes"
      titulo="Etiqueta"
      descricao="Marca pequena ao lado de um texto: “Garantia” na OS, “Estoque baixo” na peça. Não é etapa (para isso existe o selo de status)."
      arquivos={[`${UI}Etiqueta.jsx`, CSS]}
    >
      <Exemplo
        titulo="Os dois tons"
        codigo={`
import Etiqueta from '../../components/ui/Etiqueta'

<Etiqueta>Garantia</Etiqueta>
<Etiqueta tom="atencao">Estoque baixo</Etiqueta>
{os.garantia && <Etiqueta>Garantia</Etiqueta>}`}
      >
        <span>
          Retorno: ruído na suspensão <Etiqueta>Garantia</Etiqueta>
        </span>
        <span>
          Bateria 60 Ah <Etiqueta tom="atencao">Estoque baixo</Etiqueta>
        </span>
      </Exemplo>
      <Bloco titulo="Propriedades">
        <TabelaProps
          linhas={[
            ['tom', "'destaque' | 'atencao'", "'destaque'", 'Laranja-claro ou âmbar'],
            ['children', 'texto', '', 'Curto: uma ou duas palavras'],
          ]}
        />
      </Bloco>
    </PaginaSecao>
  )
}

export function SecInterruptor() {
  const [garantia, setGarantia] = useState(false)
  return (
    <PaginaSecao
      grupo="Componentes"
      titulo="Interruptor"
      descricao="Sim/não que vale na hora, como “Serviço em garantia” na Nova OS. Por dentro é um botão com role=switch: funciona no teclado (Tab + Espaço) e o leitor de tela fala “ligado/desligado”."
      arquivos={[`${UI}Interruptor.jsx`, CSS]}
    >
      <Exemplo
        titulo="Serviço em garantia (clique)"
        codigo={`
import Interruptor from '../../components/ui/Interruptor'

const [garantia, setGarantia] = useState(false)

<Interruptor
  rotulo="Serviço em garantia"
  ajuda="Retorno de um serviço já feito; não é cobrado"
  ligado={garantia}
  onChange={setGarantia}
/>

// no envio: cadastrarOrdem({ ...dados, garantia })`}
        coluna
      >
        <div style={{ width: '100%', maxWidth: 420 }}>
          <Interruptor
            rotulo="Serviço em garantia"
            ajuda="Retorno de um serviço já feito; não é cobrado"
            ligado={garantia}
            onChange={setGarantia}
          />
          <p className="vt-demo-codigo">garantia = {String(garantia)}</p>
        </div>
      </Exemplo>
      <Bloco titulo="Propriedades">
        <TabelaProps
          linhas={[
            ['rotulo', 'texto', '', 'Sempre visível'],
            ['ajuda', 'texto', '', 'Linha menor embaixo'],
            ['ligado', 'boolean', 'false', 'Valor atual'],
            ['onChange', '(novoValor) => void', '', 'Recebe true/false (não o evento)'],
            ['disabled', 'boolean', 'false', ''],
          ]}
        />
      </Bloco>
    </PaginaSecao>
  )
}

export function SecAbas() {
  const [aba, setAba] = useState('servicos')
  const [filtro, setFiltro] = useState('')
  const [filtroCel, setFiltroCel] = useState('')
  return (
    <PaginaSecao
      grupo="Componentes"
      titulo="Abas"
      descricao="Troca entre duas ou três visões da mesma tela. No celular, “Serviços e peças” é uma tela só com as abas Serviços | Peças. Com `para`, cada aba vira link."
      arquivos={[`${UI}Abas.jsx`, CSS]}
    >
      <Exemplo
        titulo="Serviços | Peças (Figma celular)"
        codigo={`
import Abas from '../../components/ui/Abas'

const [aba, setAba] = useState('servicos')

<Abas
  opcoes={[{ valor: 'servicos', rotulo: 'Serviços' }, { valor: 'pecas', rotulo: 'Peças' }]}
  valor={aba}
  onChange={setAba}
/>
{aba === 'servicos' ? <ListaServicos /> : <ListaPecas />}

// trocando de tela: cada aba com o seu endereço
<Abas opcoes={[{ valor: 'servicos', rotulo: 'Serviços', para: '/servicos' },
               { valor: 'pecas', rotulo: 'Peças', para: '/pecas' }]} valor="servicos" />`}
        coluna
      >
        <div style={{ width: '100%', maxWidth: 390, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Abas
            opcoes={[
              { valor: 'servicos', rotulo: 'Serviços' },
              { valor: 'pecas', rotulo: 'Peças' },
            ]}
            valor={aba}
            onChange={setAba}
          />
          <Cartao semEspaco>
            {(aba === 'servicos' ? SERVICOS : PECAS).slice(0, 3).map((x) => (
              <div key={x.id} className="vt-linha-simples">
                <span>
                  <b>{x.descricao}</b>
                  <small>
                    {aba === 'servicos'
                      ? `Tempo estimado: ${formatarDuracao(x.tempo_estimado_min)}`
                      : `${x.codigo} · ${x.estoque} em estoque`}
                  </small>
                </span>
                <span>{formatarMoeda(x.preco_base ?? x.preco_venda)}</span>
              </div>
            ))}
          </Cartao>
        </div>
      </Exemplo>
      <Exemplo
        titulo="Filtros da lista de OS no MVP"
        descricao="Não são abas, mas aparecem no mesmo lugar: no PC entra “Garantia” (FILTROS_OS_PC); no celular só os quatro do Figma (FILTROS_OS_CELULAR)."
        codigo={`
import Filtros from '../../components/ui/Filtros'
import { FILTROS_OS_CELULAR, FILTROS_OS_PC } from '../../constants/statusOS'

<div className="so-pc"><Filtros opcoes={FILTROS_OS_PC} valor={status} onChange={setStatus} /></div>
<div className="so-celular"><Filtros opcoes={FILTROS_OS_CELULAR} valor={status} onChange={setStatus} /></div>
// status 'GARANTIA' -> listarOrdens({ garantia: true })`}
        coluna
      >
        <Filtros opcoes={FILTROS_OS_PC} valor={filtro} onChange={setFiltro} />
        <Filtros opcoes={FILTROS_OS_CELULAR} valor={filtroCel} onChange={setFiltroCel} />
      </Exemplo>
    </PaginaSecao>
  )
}

export function SecTabela() {
  const colunasMecanicos = [
    {
      chave: 'nome',
      rotulo: 'Nome',
      render: (m) => (
        <span className="vt-celula-avatar">
          <Avatar nome={m.nome} tamanho={32} /> {m.nome}
        </span>
      ),
    },
    { chave: 'cpf', rotulo: 'CPF' },
    { chave: 'telefone', rotulo: 'Telefone' },
    {
      chave: 'expediente',
      rotulo: 'Expediente',
      render: (m) => formatarExpediente(m.expediente_inicio, m.expediente_fim),
      valorOrdem: (m) => m.expediente_inicio,
    },
    { chave: 'os_em_servico', rotulo: 'OS em serviço', direita: true },
  ]
  const colunasPecas = [
    { chave: 'codigo', rotulo: 'Código', render: (p) => <code>{p.codigo}</code> },
    {
      chave: 'descricao',
      rotulo: 'Peça',
      render: (p) => (
        <>
          {p.descricao} {estoqueBaixo(p) && <Etiqueta tom="atencao">Estoque baixo</Etiqueta>}
        </>
      ),
    },
    { chave: 'estoque', rotulo: 'Estoque', direita: true },
    { chave: 'estoque_minimo', rotulo: 'Mínimo', direita: true },
    { chave: 'preco_venda', rotulo: 'Preço de venda', direita: true, render: (p) => formatarMoeda(p.preco_venda) },
  ]
  return (
    <PaginaSecao
      grupo="Componentes"
      titulo="Tabela"
      descricao="Tabela genérica do PC para Veículos, Mecânicos, Serviços, Peças e Usuários. Você diz as colunas; clicar no cabeçalho ordena. Para OS use a TabelaOS, que já conhece as colunas da ordem."
      arquivos={[`${UI}Tabela.jsx`, CSS]}
    >
      <Exemplo
        titulo="Mecânicos (Figma PC)"
        codigo={`
import Tabela from '../../components/ui/Tabela'

const colunas = [
  { chave: 'nome', rotulo: 'Nome', render: (m) => <><Avatar nome={m.nome} tamanho={32} /> {m.nome}</> },
  { chave: 'cpf', rotulo: 'CPF' },
  { chave: 'telefone', rotulo: 'Telefone' },
  { chave: 'expediente', rotulo: 'Expediente',
    render: (m) => formatarExpediente(m.expediente_inicio, m.expediente_fim),
    valorOrdem: (m) => m.expediente_inicio },
  { chave: 'os_em_servico', rotulo: 'OS em serviço', direita: true },
]

<Tabela colunas={colunas} linhas={mecanicos} rotulo="Mecânicos"
        onClicarLinha={(m) => navigate(\`/mecanicos/\${m.id}/editar\`)} />`}
        coluna
      >
        <Tabela colunas={colunasMecanicos} linhas={MECANICOS} rotulo="Mecânicos" onClicarLinha={() => {}} />
      </Exemplo>
      <Exemplo
        titulo="Peças, com etiqueta de estoque baixo"
        codigo={`
import { estoqueBaixo } from '../../utils/ordemServico'

{ chave: 'descricao', rotulo: 'Peça', render: (p) => (
  <>{p.descricao} {estoqueBaixo(p) && <Etiqueta tom="atencao">Estoque baixo</Etiqueta>}</>
) },
{ chave: 'preco_venda', rotulo: 'Preço de venda', direita: true, render: (p) => formatarMoeda(p.preco_venda) },`}
        coluna
      >
        <Tabela colunas={colunasPecas} linhas={PECAS} rotulo="Peças" />
      </Exemplo>
      <Bloco titulo="Propriedades">
        <TabelaProps
          linhas={[
            ['colunas', 'lista de colunas', '', 'Veja abaixo'],
            ['linhas', 'lista de objetos', '[]', 'O que veio do backend'],
            ['onClicarLinha', '(linha) => void', '', 'Linha clicável (e Enter no teclado)'],
            ['chave', 'texto', "'id'", 'Campo que identifica a linha'],
            ['rotulo', 'texto', '', 'Nome da tabela para o leitor de tela'],
          ]}
        />
        <TabelaProps
          linhas={[
            ['coluna.chave', 'texto', '', 'Campo do objeto (e nome da coluna)'],
            ['coluna.rotulo', 'texto', '', 'Título no cabeçalho'],
            ['coluna.render', '(linha) => JSX', '', 'Desenho próprio da célula'],
            ['coluna.direita', 'boolean', 'false', 'Números e valores'],
            ['coluna.ordenavel', 'boolean', 'true', 'false = cabeçalho sem clique'],
            ['coluna.valorOrdem', '(linha) => valor', '', 'Ordena por outro valor'],
          ]}
        />
      </Bloco>
    </PaginaSecao>
  )
}

export function SecGrupoCampos() {
  return (
    <PaginaSecao
      grupo="Componentes"
      titulo="Grupo de campos"
      descricao="Formulários longos em blocos com título, como “Dados pessoais” e “Endereço” no Novo cliente. No PC os campos ficam em colunas; no celular, um embaixo do outro."
      arquivos={[`${UI}GrupoCampos.jsx`, CSS]}
    >
      <Exemplo
        titulo="Novo cliente (Figma PC)"
        codigo={`
import GrupoCampos from '../../components/ui/GrupoCampos'
import Campo from '../../components/ui/Campo'

<GrupoCampos titulo="Dados pessoais" colunas={2}>
  <Campo rotulo="Nome" className="ocupa-tudo" />
  <Campo rotulo="CPF ou CNPJ" erro={erros.cpf_cnpj} />
  <Campo rotulo="Telefone" tipo="tel" />
  <Campo rotulo="E-mail" tipo="email" opcional className="ocupa-tudo" />
</GrupoCampos>

<GrupoCampos titulo="Endereço" colunas={3}>
  <Campo rotulo="CEP" />
  <Campo rotulo="Rua" className="ocupa-2" />
  <Campo rotulo="Número" />
  <Campo rotulo="Complemento" opcional className="ocupa-2" />
  ...
</GrupoCampos>

// validar: validarCpfCnpj(valor) e validarCep(valor) em utils/validadores.js`}
        coluna
      >
        <div className="vt-demo-form">
          <GrupoCampos titulo="Dados pessoais" colunas={2}>
            <Campo rotulo="Nome" defaultValue="Marina Souza" className="ocupa-tudo" />
            <Campo rotulo="CPF ou CNPJ" defaultValue="123.456.789-00" />
            <Campo rotulo="Telefone" tipo="tel" defaultValue="(85) 90000-0001" />
            <Campo rotulo="E-mail" tipo="email" opcional defaultValue="marina@exemplo.com" className="ocupa-tudo" />
          </GrupoCampos>
          <GrupoCampos titulo="Endereço" colunas={3}>
            <Campo rotulo="CEP" defaultValue="61800-000" />
            <Campo rotulo="Rua" defaultValue="Rua das Acácias" className="ocupa-2" />
            <Campo rotulo="Número" defaultValue="120" />
            <Campo rotulo="Complemento" opcional defaultValue="Casa 2" className="ocupa-2" />
            <Campo rotulo="Bairro" defaultValue="Centro" />
            <Campo rotulo="Cidade" defaultValue="Pacatuba" />
            <Campo rotulo="UF" defaultValue="CE" maxLength={2} />
          </GrupoCampos>
        </div>
      </Exemplo>
    </PaginaSecao>
  )
}

export function SecLinhaVeiculo() {
  return (
    <PaginaSecao
      grupo="Componentes"
      titulo="Linha de veículo"
      descricao="A linha das listas de veículo no celular: placa, modelo · ano e dono · km. Com `para` vira link."
      arquivos={['components/veiculos/LinhaVeiculo.jsx', 'components/veiculos/veiculos.css']}
      responsavel="Integrante 1"
    >
      <Exemplo
        titulo="Lista de veículos (celular)"
        codigo={`
import LinhaVeiculo from '../../components/veiculos/LinhaVeiculo'

<Cartao semEspaco>
  {veiculos.map((v) => <LinhaVeiculo key={v.id} veiculo={v} para={\`/veiculos/\${v.id}/editar\`} />)}
</Cartao>`}
        coluna
      >
        <div style={{ width: '100%', maxWidth: 390 }}>
          <Cartao semEspaco>
            {comDono.slice(0, 4).map((v) => (
              <LinhaVeiculo key={v.id} veiculo={v} onClick={() => {}} />
            ))}
          </Cartao>
        </div>
      </Exemplo>
      <Exemplo
        titulo="Na tabela do PC"
        descricao="No PC use a Tabela com a placa na primeira coluna e o chassi encurtado (encurtarChassi)."
        coluna
      >
        <Tabela
          rotulo="Veículos"
          linhas={comDono}
          colunas={[
            { chave: 'placa', rotulo: 'Placa', render: (v) => <Placa placa={v.placa} /> },
            { chave: 'modelo', rotulo: 'Modelo', render: (v) => `${v.marca} ${v.modelo}` },
            { chave: 'ano', rotulo: 'Ano', direita: true },
            { chave: 'cliente_nome', rotulo: 'Cliente' },
            { chave: 'quilometragem', rotulo: 'Km atual', direita: true, render: (v) => formatarKm(v.quilometragem) },
          ]}
        />
      </Exemplo>
    </PaginaSecao>
  )
}

export function SecApontamentos() {
  const [lista, setLista] = useState(APONTAMENTOS[1042])
  const registrar = () =>
    setLista((atual) => [
      ...atual,
      {
        id: Date.now(),
        tipo: 'OBSERVACAO',
        data: new Date().toISOString().slice(0, 19),
        descricao: 'Teste de vazamento ok; carro lavado.',
      },
    ])
  return (
    <PaginaSecao
      grupo="Ordem de serviço"
      titulo="Apontamentos"
      descricao="A linha do tempo da OS: o que foi feito, quando e por quem, do mais novo para o mais antigo. Fica no Detalhe da OS, abaixo de Serviços e peças."
      arquivos={['components/os/Apontamentos.jsx', 'components/os/os.css', 'constants/apontamentos.js']}
      responsavel="Integrante 3"
    >
      <Exemplo
        titulo="Linha do tempo (clique em “+ Registrar”)"
        codigo={`
import Apontamentos from '../../components/os/Apontamentos'
import { listarApontamentos, registrarApontamento } from '../../services/ordensServicoService'

const { dados, recarregar } = useApi(() => listarApontamentos(os.id), [os.id])

<Cartao>
  <Apontamentos apontamentos={dados ?? []} onRegistrar={() => setModalAberto(true)}
                somenteLeitura={statusEncerrado(os.status)} />
</Cartao>

// no modal: tipo (TIPOS_REGISTRAVEIS) + descrição
await registrarApontamento(os.id, { tipo: 'EXECUCAO', descricao })
recarregar()`}
        coluna
      >
        <div style={{ width: '100%', maxWidth: 560 }}>
          <Cartao>
            <Apontamentos apontamentos={lista} onRegistrar={registrar} />
          </Cartao>
        </div>
      </Exemplo>
      <Bloco titulo="Tipos de apontamento (constants/apontamentos.js)">
        <TabelaProps
          linhas={Object.entries(TIPOS_APONTAMENTO).map(([valor, t]) => [valor, 'código', '', t.rotulo ?? t])}
        />
      </Bloco>
    </PaginaSecao>
  )
}
