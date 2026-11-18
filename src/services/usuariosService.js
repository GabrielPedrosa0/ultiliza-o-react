// Usuários e perfis de acesso (Figma "Usuários": só o Gerente vê). Integrante 6.
// ROTAS PROPOSTAS: ainda não existem no backend.
//   { id, nome, email, perfil: "GERENTE" | "RECEPCAO" | "MECANICO" }
import { apiDelete, apiGet, apiPost, apiPut } from './api'

export const listarUsuarios = () => apiGet('/usuarios')
export const cadastrarUsuario = (dados) => apiPost('/usuarios', dados)
export const atualizarUsuario = (id, dados) => apiPut(`/usuarios/${id}`, dados)
export const excluirUsuario = (id) => apiDelete(`/usuarios/${id}`)
