// Perfis de acesso (Figma "PC — Usuários"). Integrante 5.
// O que cada perfil pode fazer está na tabela 2.2 da especificação; quem decide de verdade é o backend.
export const PERFIS = {
  GERENTE: { valor: 'GERENTE', rotulo: 'Gerente', tom: 'primario' },
  RECEPCAO: { valor: 'RECEPCAO', rotulo: 'Recepção', tom: 'info' },
  MECANICO: { valor: 'MECANICO', rotulo: 'Mecânico', tom: 'neutro' },
}

export const LISTA_PERFIS = Object.values(PERFIS)

// Aceita 'GERENTE', 'gerente' ou 'Gerente'.
export function rotuloPerfil(perfil) {
  if (!perfil) return ''
  const chave = String(perfil).normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase()
  return PERFIS[chave]?.rotulo ?? perfil
}
