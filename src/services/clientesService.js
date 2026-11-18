// Clientes (guia 3.6). Integrante 5. Rotas em backend/routers/clientes.py.
import { apiDelete, apiGet, apiPost, apiPut } from './api'

// GET /api/clientes  ·  GET /api/clientes?nome=Marina  (o Figma busca também por CPF, telefone ou placa)
export const listarClientes = ({ nome } = {}) => apiGet('/clientes', { nome })

// GET /api/clientes/1  (vem com quantidade_veiculos)
export const consultarCliente = (id) => apiGet(`/clientes/${id}`)

// POST /api/clientes  { nome, cpf_cnpj, telefone, email, cep, rua, numero, complemento, bairro, cidade, uf }
// (CPF e endereço estão no Figma do MVP; o backend ainda não tem esses campos.)
export const cadastrarCliente = (dados) => apiPost('/clientes', dados)

// PUT /api/clientes/1
export const atualizarCliente = (id, dados) => apiPut(`/clientes/${id}`, dados)

// DELETE /api/clientes/1  (409 se o cliente tem veículos)
export const excluirCliente = (id) => apiDelete(`/clientes/${id}`)

// GET /api/clientes/1/veiculos
export const listarVeiculosDoCliente = (id) => apiGet(`/clientes/${id}/veiculos`)

// GET /api/clientes/1/historico  (OS do cliente, da mais nova para a mais antiga)
export const consultarHistoricoDoCliente = (id) => apiGet(`/clientes/${id}/historico`)
