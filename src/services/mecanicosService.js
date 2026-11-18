// Mecânicos e expediente (Figma "Mecânicos" e "Mecânicos em expediente" no Painel). Integrante 4.
// ROTAS PROPOSTAS: ainda não existem no backend; combinar o formato com quem fizer.
//   { id, nome, cpf, telefone, expediente_inicio: "08:00", expediente_fim: "17:00", os_em_servico: 2 }
import { apiDelete, apiGet, apiPost, apiPut } from './api'

// GET /api/mecanicos  ·  GET /api/mecanicos?em_expediente=true (só quem está no horário agora)
export const listarMecanicos = ({ emExpediente } = {}) =>
  apiGet('/mecanicos', { em_expediente: emExpediente ? 'true' : undefined })

export const consultarMecanico = (id) => apiGet(`/mecanicos/${id}`)
export const cadastrarMecanico = (dados) => apiPost('/mecanicos', dados)
export const atualizarMecanico = (id, dados) => apiPut(`/mecanicos/${id}`, dados)
export const excluirMecanico = (id) => apiDelete(`/mecanicos/${id}`)
