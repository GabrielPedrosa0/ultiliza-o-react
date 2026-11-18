// Dados de exemplo da vitrine (os mesmos do Figma). As datas são relativas a hoje,
// para "Hoje, 17:00" e "Amanhã" sempre fazerem sentido.
import { paraDataSemFuso } from '../utils/formatadores'

const hoje = new Date()
hoje.setHours(0, 0, 0, 0)
const em = (dias, horas = 0, minutos = 0) => {
  const d = new Date(hoje)
  d.setDate(d.getDate() + dias)
  d.setHours(horas, minutos, 0, 0)
  return paraDataSemFuso(d)
}

const endereco = (rua, numero, complemento, bairro = 'Centro') => ({
  cep: '61800-000',
  rua,
  numero,
  complemento,
  bairro,
  cidade: 'Pacatuba',
  uf: 'CE',
})

export const CLIENTES = [
  {
    id: 1,
    nome: 'Marina Souza',
    cpf_cnpj: '123.456.789-00',
    telefone: '(85) 90000-0001',
    email: 'marina@exemplo.com',
    cliente_desde: '2024-03-10',
    quantidade_veiculos: 1,
    ...endereco('Rua das Acácias', '120', 'Casa 2'),
  },
  {
    id: 2,
    nome: 'João Pereira',
    cpf_cnpj: '234.567.890-11',
    telefone: '(85) 90000-0002',
    email: null,
    cliente_desde: '2023-08-02',
    quantidade_veiculos: 2,
    ...endereco('Av. Contorno', '45', null, 'Jereissati'),
  },
  {
    id: 3,
    nome: 'Ana Lima',
    cpf_cnpj: '345.678.901-22',
    telefone: '(85) 90000-0003',
    email: 'ana.lima@exemplo.com',
    cliente_desde: '2025-01-20',
    quantidade_veiculos: 1,
    ...endereco('Rua São José', '310', 'Ap. 101'),
  },
  {
    id: 4,
    nome: 'Carlos Mendes',
    cpf_cnpj: '456.789.012-33',
    telefone: '(85) 90000-0004',
    email: null,
    cliente_desde: '2022-11-15',
    quantidade_veiculos: 1,
    ...endereco('Rua do Comércio', '8', null),
  },
  {
    id: 5,
    nome: 'Patrícia Rocha',
    cpf_cnpj: '12.345.678/0001-90',
    telefone: '(85) 90000-0005',
    email: null,
    cliente_desde: '2024-06-01',
    quantidade_veiculos: 3,
    ...endereco('Rod. CE-060', 'km 12', 'Galpão B', 'Pavuna'),
  },
  {
    id: 6,
    nome: 'Luís Araújo',
    cpf_cnpj: '567.890.123-44',
    telefone: '(85) 90000-0006',
    email: null,
    cliente_desde: '2025-09-09',
    quantidade_veiculos: 1,
    ...endereco('Rua Padre Cícero', '77', null),
  },
]

const veiculo = (id, placa, marca, modelo, ano, quilometragem, cliente_id, chassi) => ({
  id,
  placa,
  chassi,
  marca,
  modelo,
  ano,
  quilometragem,
  cliente_id,
})

export const VEICULOS = [
  veiculo(1, 'QRS4F21', 'Volkswagen', 'Gol 1.6', 2019, 82300, 1, '9BWAB05U8KT004821'),
  veiculo(2, 'TUV7G84', 'Fiat', 'Strada 1.3', 2021, 45120, 2, '9BD57834MM1102233'),
  veiculo(3, 'MNP2K56', 'Chevrolet', 'Onix 1.0', 2020, 61800, 3, '9BGKS48U0LG112045'),
  veiculo(4, 'HJK9L13', 'Honda', 'Civic 2.0', 2018, 60050, 4, '93HFC2630JZ200871'),
  veiculo(5, 'DFG3M72', 'Hyundai', 'HB20 1.6', 2017, 98400, 5, '9BHBG51DBHP641590'),
  veiculo(6, 'BCD8N45', 'Toyota', 'Corolla 2.0', 2015, 132000, 6, '9BRBD48E2F2655012'),
]

// Mecânicos e expediente (Figma "Mecânicos"). os_em_servico é calculado das OS abaixo.
const MECANICOS_BASE = [
  {
    id: 1,
    nome: 'Rafael Lima',
    cpf: '987.654.321-00',
    telefone: '(85) 90000-0101',
    expediente_inicio: '08:00',
    expediente_fim: '17:00',
  },
  {
    id: 2,
    nome: 'Diego Alves',
    cpf: '876.543.210-99',
    telefone: '(85) 90000-0102',
    expediente_inicio: '07:00',
    expediente_fim: '16:00',
  },
  {
    id: 3,
    nome: 'Bruno Costa',
    cpf: '765.432.109-88',
    telefone: '(85) 90000-0103',
    expediente_inicio: '09:00',
    expediente_fim: '18:00',
  },
]

// Catálogo de serviços (Figma "Serviços").
export const SERVICOS = [
  { id: 1, descricao: 'Troca de óleo e filtro', tempo_estimado_min: 40, preco_base: 120 },
  { id: 2, descricao: 'Alinhamento e balanceamento', tempo_estimado_min: 60, preco_base: 160 },
  { id: 3, descricao: 'Revisão de freios', tempo_estimado_min: 90, preco_base: 180 },
  { id: 4, descricao: 'Diagnóstico elétrico', tempo_estimado_min: 60, preco_base: 150 },
  { id: 5, descricao: 'Troca de embreagem', tempo_estimado_min: 240, preco_base: 650 },
  { id: 6, descricao: 'Revisão de 60 mil km', tempo_estimado_min: 180, preco_base: 480 },
]

// Peças e estoque (Figma "Peças").
export const PECAS = [
  {
    id: 1,
    codigo: 'OLE-5W30-1L',
    descricao: 'Óleo sintético 5W30 1 L',
    estoque: 24,
    estoque_minimo: 6,
    preco_venda: 40,
  },
  { id: 2, codigo: 'FLT-OL-0098', descricao: 'Filtro de óleo', estoque: 12, estoque_minimo: 4, preco_venda: 30 },
  { id: 3, codigo: 'FLT-AR-0210', descricao: 'Filtro de ar', estoque: 8, estoque_minimo: 4, preco_venda: 30 },
  {
    id: 4,
    codigo: 'PST-DIA-0451',
    descricao: 'Pastilha de freio dianteira',
    estoque: 3,
    estoque_minimo: 4,
    preco_venda: 140,
  },
  {
    id: 5,
    codigo: 'DSC-FR-0310',
    descricao: 'Disco de freio dianteiro',
    estoque: 4,
    estoque_minimo: 2,
    preco_venda: 220,
  },
  { id: 6, codigo: 'BAT-60A', descricao: 'Bateria 60 Ah', estoque: 2, estoque_minimo: 2, preco_venda: 520 },
]

// Usuários (Figma "PC — Usuários").
export const USUARIOS = [
  { id: 1, nome: 'Gabriel Pedrosa', email: 'gabriel@oficina.com.br', perfil: 'GERENTE' },
  { id: 2, nome: 'Ana Recepção', email: 'recepcao@oficina.com.br', perfil: 'RECEPCAO' },
  { id: 3, nome: 'Rafael Lima', email: 'rafael@oficina.com.br', perfil: 'MECANICO' },
  { id: 4, nome: 'Diego Alves', email: 'diego@oficina.com.br', perfil: 'MECANICO' },
]

const base = [
  {
    id: 1042,
    veiculo_id: 1,
    servico: 'Troca de óleo e filtros',
    problema_relatado: 'Barulho ao frear em baixa velocidade e luz de óleo acesa.',
    observacoes: 'Cliente pediu para avisar por WhatsApp antes de qualquer serviço extra.',
    mecanico_id: 1,
    data_abertura: em(0, 8, 10),
    data_previsao: em(0, 17),
    data_orcamento_enviado: em(0, 9, 5),
    status: 'EM_SERVICO',
    valor_total: 340,
  },
  {
    id: 1041,
    veiculo_id: 2,
    servico: 'Freios dianteiros',
    problema_relatado: 'Barulho ao frear.',
    mecanico_id: 2,
    data_abertura: em(-1, 9),
    data_previsao: em(1, 10),
    data_orcamento_enviado: em(-1, 10),
    status: 'AGUARDANDO_PECA',
    valor_total: 780,
  },
  {
    id: 1040,
    veiculo_id: 3,
    servico: 'Retorno: ruído na suspensão',
    problema_relatado: 'Ruído voltou depois do serviço da semana passada.',
    mecanico_id: 1,
    garantia: true,
    data_abertura: em(0, 7, 30),
    data_previsao: em(0, 15, 30),
    status: 'PRONTA',
    valor_total: 0,
  },
  {
    id: 1039,
    veiculo_id: 4,
    servico: 'Revisão de 60 mil km',
    problema_relatado: 'Revisão programada.',
    mecanico_id: 2,
    data_abertura: em(0, 7, 40),
    data_previsao: em(3, 17),
    data_orcamento_enviado: em(0, 8, 30),
    status: 'EM_SERVICO',
    valor_total: 1250,
  },
  {
    id: 1038,
    veiculo_id: 5,
    servico: 'Troca de embreagem',
    problema_relatado: 'Embreagem patinando.',
    mecanico_id: 3,
    data_abertura: em(0, 7),
    data_previsao: null,
    status: 'ORCAMENTO',
    valor_total: 1980,
  },
  {
    id: 1037,
    veiculo_id: 6,
    servico: 'Diagnóstico elétrico',
    problema_relatado: 'Bateria descarregando à noite.',
    mecanico_id: 1,
    data_abertura: em(-2, 9),
    data_previsao: em(-1, 12),
    data_orcamento_enviado: em(-2, 11),
    data_conclusao: em(-1, 11),
    status: 'ENTREGUE',
    valor_total: 220,
  },
]

// Igual ao que GET /api/ordens-servico devolve: a OS + placa, veículo, cliente e mecânico.
export const ORDENS = base.map((o) => {
  const v = VEICULOS.find((x) => x.id === o.veiculo_id)
  const c = CLIENTES.find((x) => x.id === v.cliente_id)
  const m = MECANICOS_BASE.find((x) => x.id === o.mecanico_id)
  return {
    quilometragem: v.quilometragem,
    data_conclusao: null,
    data_orcamento_enviado: null,
    observacoes: null,
    garantia: false,
    ...o,
    mecanico: m?.nome ?? null,
    mecanico_expediente: m ? `${m.expediente_inicio}–${m.expediente_fim}` : null,
    placa: v.placa,
    chassi: v.chassi,
    ano: v.ano,
    veiculo: `${v.marca} ${v.modelo}`,
    cliente_id: c.id,
    cliente_nome: c.nome,
    cliente_telefone: c.telefone,
    cliente_cpf_cnpj: c.cpf_cnpj,
  }
})

const ABERTAS = ['ORCAMENTO', 'EM_SERVICO', 'AGUARDANDO_PECA', 'PRONTA']
export const MECANICOS = MECANICOS_BASE.map((m) => ({
  ...m,
  os_em_servico: ORDENS.filter((o) => o.mecanico_id === m.id && ABERTAS.includes(o.status) && o.status !== 'PRONTA')
    .length,
}))

export const ITENS = {
  1042: [
    {
      id: 1,
      tipo: 'servico',
      descricao: 'Troca de óleo e filtro',
      quantidade: 1,
      valor_unitario: 120,
      tempo_estimado_min: 40,
    },
    {
      id: 2,
      tipo: 'peca',
      descricao: 'Óleo sintético 5W30 1 L',
      codigo: 'OLE-5W30-1L',
      quantidade: 4,
      valor_unitario: 40,
    },
    { id: 3, tipo: 'peca', descricao: 'Filtro de óleo', codigo: 'FLT-OL-0098', quantidade: 1, valor_unitario: 30 },
    { id: 4, tipo: 'peca', descricao: 'Filtro de ar', codigo: 'FLT-AR-0210', quantidade: 1, valor_unitario: 30 },
  ],
  1041: [
    {
      id: 5,
      tipo: 'servico',
      descricao: 'Revisão de freios',
      quantidade: 1,
      valor_unitario: 180,
      tempo_estimado_min: 90,
    },
    {
      id: 6,
      tipo: 'peca',
      descricao: 'Pastilha de freio dianteira',
      codigo: 'PST-DIA-0451',
      quantidade: 1,
      valor_unitario: 140,
    },
    {
      id: 7,
      tipo: 'peca',
      descricao: 'Disco de freio dianteiro',
      codigo: 'DSC-FR-0310',
      quantidade: 2,
      valor_unitario: 230,
    },
  ],
}

// Linha do tempo da OS (Figma "Apontamentos").
export const APONTAMENTOS = {
  1042: [
    { id: 1, tipo: 'ABERTURA', data: em(0, 8, 10), descricao: 'OS aberta na recepção.' },
    {
      id: 2,
      tipo: 'DIAGNOSTICO',
      data: em(0, 8, 40),
      descricao: 'Pastilhas dianteiras com 30% de vida útil; sugerir troca na próxima revisão.',
    },
    { id: 3, tipo: 'ORCAMENTO', data: em(0, 9, 5), descricao: 'Orçamento de R$ 340,00 enviado ao cliente.' },
    { id: 4, tipo: 'APROVACAO', data: em(0, 9, 30), descricao: 'Cliente aprovou o orçamento pelo WhatsApp.' },
    { id: 5, tipo: 'EXECUCAO', data: em(0, 10, 15), descricao: 'Óleo e filtros trocados; testando vazamentos.' },
  ],
}
