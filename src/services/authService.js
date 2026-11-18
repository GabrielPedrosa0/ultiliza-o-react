// Autenticação (guia 3.8). Integrante 5. Rotas em backend/routers/autenticacao.py.
// O token fica no localStorage e o api.js manda ele em todo pedido (Authorization: Bearer).
import { CHAVE_TOKEN, apiGet, apiPost, lerToken } from './api'

const CHAVE_USUARIO = 'oficina_usuario'

// POST /api/auth/login  -> { access_token, token_type, usuario: { id, nome, email, perfil } }
export async function entrar(email, senha) {
  const resposta = await apiPost('/auth/login', { email, senha })
  try {
    localStorage.setItem(CHAVE_TOKEN, resposta.access_token)
    localStorage.setItem(CHAVE_USUARIO, JSON.stringify(resposta.usuario))
  } catch {
    // sem localStorage o login vale só até recarregar a página
  }
  return resposta.usuario
}

export function sair() {
  try {
    localStorage.removeItem(CHAVE_TOKEN)
    localStorage.removeItem(CHAVE_USUARIO)
  } catch {
    // nada a limpar
  }
}

// O usuário salvo no último login (sem chamar o servidor). null se ninguém entrou.
export function usuarioSalvo() {
  try {
    return JSON.parse(localStorage.getItem(CHAVE_USUARIO))
  } catch {
    return null
  }
}

export const estaLogado = () => Boolean(lerToken())

// GET /api/auth/me  (confere se o token ainda vale)
export const consultarUsuarioLogado = () => apiGet('/auth/me')

// POST /api/auth/esqueci-senha  -> { mensagem } (a resposta é sempre a mesma)
export const esqueciSenha = (email) => apiPost('/auth/esqueci-senha', { email })
