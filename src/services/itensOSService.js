// Itens da OS: serviços (mão de obra) e peças (guia 3.3). Integrante 3.
// Rotas em backend/routers/itens_os.py.
import { apiDelete, apiGet, apiPost, apiPut } from './api'

// GET /api/ordens-servico/1042/itens
export const listarItens = (osId) => apiGet(`/ordens-servico/${osId}/itens`)

// POST /api/ordens-servico/1042/itens  { tipo, descricao, codigo, quantidade, valor_unitario }
export const adicionarItem = (osId, dados) => apiPost(`/ordens-servico/${osId}/itens`, dados)

// PUT /api/ordens-servico/1042/itens/7
export const atualizarItem = (osId, itemId, dados) => apiPut(`/ordens-servico/${osId}/itens/${itemId}`, dados)

// DELETE /api/ordens-servico/1042/itens/7
export const removerItem = (osId, itemId) => apiDelete(`/ordens-servico/${osId}/itens/${itemId}`)
