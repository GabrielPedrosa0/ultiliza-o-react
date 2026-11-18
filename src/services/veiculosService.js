// Veículos (guia 3.1). Integrante 1. Rotas em backend/routers/veiculos.py.
import { apiDelete, apiGet, apiPost, apiPut } from './api'

// GET /api/veiculos  ·  GET /api/veiculos?placa=QRS
export const listarVeiculos = ({ placa } = {}) => apiGet('/veiculos', { placa })

// GET /api/veiculos/1
export const consultarVeiculo = (id) => apiGet(`/veiculos/${id}`)

// POST /api/veiculos  { placa, chassi, marca, modelo, ano, quilometragem, cliente_id }
// (chassi está no Figma do MVP; o backend ainda não tem esse campo.)
export const cadastrarVeiculo = (dados) => apiPost('/veiculos', dados)

// PUT /api/veiculos/1
export const atualizarVeiculo = (id, dados) => apiPut(`/veiculos/${id}`, dados)

// DELETE /api/veiculos/1  (409 se o veículo tem OS)
export const excluirVeiculo = (id) => apiDelete(`/veiculos/${id}`)
