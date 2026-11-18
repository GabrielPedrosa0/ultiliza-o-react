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

export const CLIENTES = [
  {
    id: 1,
    nome: 'Marina Souza',
    telefone: '(85) 90000-0001',
    email: 'marina@exemplo.com',
    cliente_desde: '2024-03-10',
    quantidade_veiculos: 1,
  },
  {
    id: 2,
    nome: 'João Pereira',
    telefone: '(85) 90000-0002',
    email: null,
    cliente_desde: '2023-08-02',
    quantidade_veiculos: 2,
  },
  {
    id: 3,
    nome: 'Ana Lima',
    telefone: '(85) 90000-0003',
    email: 'ana.lima@exemplo.com',
    cliente_desde: '2025-01-20',
    quantidade_veiculos: 1,
  },
  {
    id: 4,
    nome: 'Carlos Mendes',
    telefone: '(85) 90000-0004',
    email: null,
    cliente_desde: '2022-11-15',
    quantidade_veiculos: 1,
  },
  {
    id: 5,
    nome: 'Patrícia Rocha',
    telefone: '(85) 90000-0005',
    email: null,
    cliente_desde: '2024-06-01',
    quantidade_veiculos: 3,
  },
  {
    id: 6,
    nome: 'Luís Araújo',
    telefone: '(85) 90000-0006',
    email: null,
    cliente_desde: '2025-09-09',
    quantidade_veiculos: 1,
  },
]

export const VEICULOS = [
  { id: 1, placa: 'QRS4F21', marca: 'Volkswagen', modelo: 'Gol 1.6', ano: 2019, quilometragem: 82300, cliente_id: 1 },
  { id: 2, placa: 'TUV7G84', marca: 'Fiat', modelo: 'Strada 1.3', ano: 2021, quilometragem: 45120, cliente_id: 2 },
  { id: 3, placa: 'MNP2K56', marca: 'Chevrolet', modelo: 'Onix 1.0', ano: 2020, quilometragem: 61800, cliente_id: 3 },
  { id: 4, placa: 'HJK9L13', marca: 'Honda', modelo: 'Civic 2.0', ano: 2018, quilometragem: 60050, cliente_id: 4 },
  { id: 5, placa: 'DFG3M72', marca: 'Hyundai', modelo: 'HB20 1.6', ano: 2017, quilometragem: 98400, cliente_id: 5 },
  { id: 6, placa: 'ABC1234', marca: 'Toyota', modelo: 'Corolla 2.0', ano: 2015, quilometragem: 132000, cliente_id: 6 },
]

const base = [
  {
    id: 1042,
    veiculo_id: 1,
    servico: 'Troca de óleo e filtros',
    problema_relatado: 'Revisão de óleo',
    mecanico: 'Rafael',
    data_abertura: em(0, 8, 10),
    data_previsao: em(0, 17),
    status: 'EM_SERVICO',
    valor_total: 340,
  },
  {
    id: 1041,
    veiculo_id: 2,
    servico: 'Freios dianteiros',
    problema_relatado: 'Barulho ao frear',
    mecanico: 'Diego',
    data_abertura: em(-1, 9),
    data_previsao: em(1, 10),
    status: 'AGUARDANDO_PECA',
    valor_total: 780,
  },
  {
    id: 1040,
    veiculo_id: 3,
    servico: 'Alinhamento e balanceamento',
    problema_relatado: 'Carro puxando para a direita',
    mecanico: 'Rafael',
    data_abertura: em(0, 7, 30),
    data_previsao: em(0, 15, 30),
    status: 'PRONTA',
    valor_total: 160,
  },
  {
    id: 1039,
    veiculo_id: 4,
    servico: 'Revisão de 60 mil km',
    problema_relatado: 'Revisão programada',
    mecanico: 'Diego',
    data_abertura: em(0, 7, 40),
    data_previsao: em(3, 17),
    status: 'EM_SERVICO',
    valor_total: 1250,
  },
  {
    id: 1038,
    veiculo_id: 5,
    servico: 'Troca de embreagem',
    problema_relatado: 'Embreagem patinando',
    mecanico: null,
    data_abertura: em(0, 7),
    data_previsao: null,
    status: 'ORCAMENTO',
    valor_total: 1980,
  },
  {
    id: 1037,
    veiculo_id: 6,
    servico: 'Troca de pneus',
    problema_relatado: 'Pneus carecas',
    mecanico: 'Diego',
    data_abertura: em(-5, 9),
    data_previsao: em(-4, 12),
    data_conclusao: em(-4, 11),
    status: 'ENTREGUE',
    valor_total: 2400,
  },
]

// Igual ao que GET /api/ordens-servico devolve: a OS + placa, veículo e cliente.
export const ORDENS = base.map((o) => {
  const v = VEICULOS.find((x) => x.id === o.veiculo_id)
  const c = CLIENTES.find((x) => x.id === v.cliente_id)
  return {
    quilometragem: v.quilometragem,
    data_conclusao: null,
    observacoes: o.id === 1042 ? 'Cliente pediu para conferir as pastilhas.' : null,
    ...o,
    placa: v.placa,
    veiculo: `${v.marca} ${v.modelo}`,
    cliente_id: c.id,
    cliente_nome: c.nome,
    cliente_telefone: c.telefone,
  }
})

export const ITENS = {
  1042: [
    { id: 1, tipo: 'servico', descricao: 'Troca de óleo 5W30', codigo: null, quantidade: 1, valor_unitario: 120 },
    { id: 2, tipo: 'peca', descricao: 'Óleo sintético 4 L', codigo: 'OLE-5W30-4L', quantidade: 1, valor_unitario: 160 },
    {
      id: 3,
      tipo: 'peca',
      descricao: 'Filtros de óleo e ar',
      codigo: 'FLT-OL-0098',
      quantidade: 2,
      valor_unitario: 30,
    },
  ],
}
