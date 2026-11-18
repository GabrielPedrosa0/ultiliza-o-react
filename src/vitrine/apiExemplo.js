// "Backend de mentira" da vitrine: responde às rotas /api com os dados de exemplo,
// para as telas funcionarem sem o FastAPI rodando. Troque para "Backend real" no topo da vitrine.
// NÃO copie este arquivo para o projeto: ele existe só aqui.
import { APONTAMENTOS, CLIENTES, ITENS, MECANICOS, ORDENS, PECAS, SERVICOS, USUARIOS, VEICULOS } from './dadosExemplo'

export const CHAVE_MODO = 'vitrine_modo'
let modoDaJanela = null // vale mesmo quando o localStorage está bloqueado

// "Backend real" só existe rodando no computador (npm run dev / preview, ou pelo IP da rede de casa).
// Publicada (Vercel, GitHub Pages, claude.ai), a vitrine usa sempre os dados de exemplo:
// lá não existe um backend em /api para responder.
export function rodandoNoComputador() {
  try {
    const host = window.location.hostname
    if (['localhost', '127.0.0.1', '[::1]'].includes(host) || host.endsWith('.local')) return true
    return /^(10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/.test(host)
  } catch {
    return false
  }
}

// Pergunta ao backend se ele está ligado (usado pelo aviso no topo da vitrine).
// 'conectado' | 'desligado' | 'sem-rota' (o backend respondeu, mas não tem a rota do painel)
export async function verificarBackend() {
  try {
    const r = await fetch('/api/dashboard/resumo', { headers: { Accept: 'application/json' } })
    if (r.ok || r.status === 401 || r.status === 403) return 'conectado'
    const texto = await r.text().catch(() => '')
    if (r.status >= 500 && !texto) return 'desligado' // o repasse do Vite não achou o backend
    if (r.status === 404) return 'sem-rota'
    return 'conectado'
  } catch {
    return 'desligado'
  }
}

export function modoAtual() {
  if (modoDaJanela) return modoDaJanela
  if (!rodandoNoComputador()) return 'exemplo'
  try {
    return localStorage.getItem(CHAVE_MODO) ?? 'exemplo'
  } catch {
    return 'exemplo'
  }
}

// soNestaJanela: o app dentro da moldura segue o modo da vitrine sem gravar nada.
export function trocarModo(modo, { soNestaJanela = false } = {}) {
  modoDaJanela = modo
  if (soNestaJanela) return
  try {
    localStorage.setItem(CHAVE_MODO, modo)
  } catch {
    // sem localStorage o modo vale até recarregar a página
  }
}

const semAcento = (t) =>
  String(t ?? '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
const mesmoDia = (a, b) => a && new Date(a).toDateString() === b.toDateString()
const proximoId = (lista) => Math.max(0, ...lista.map((x) => x.id)) + 1
const comDono = (v) => ({ ...v, cliente_nome: CLIENTES.find((c) => c.id === v.cliente_id)?.nome ?? null })
const abertas = () => ORDENS.filter((o) => o.status !== 'ENTREGUE' && o.status !== 'CANCELADO')

function responder(corpo, status = 200) {
  return new Response(status === 204 ? null : JSON.stringify(corpo), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

function rotear(metodo, caminho, q, corpo) {
  const hoje = new Date()
  let m

  if (metodo === 'GET' && caminho === '/dashboard/resumo') {
    const emServico = ORDENS.filter((o) => o.status === 'EM_SERVICO')
    const aguardando = ORDENS.filter((o) => o.status === 'AGUARDANDO_PECA')
    return responder({
      em_servico: emServico.length,
      em_servico_previsao_hoje: emServico.filter((o) => mesmoDia(o.data_previsao, hoje)).length,
      aguardando_peca: aguardando.length,
      aguardando_peca_atrasadas: aguardando.filter((o) => o.data_previsao && new Date(o.data_previsao) < hoje).length,
      prontas: ORDENS.filter((o) => o.status === 'PRONTA').length,
      faturamento_mes: 18240,
      mes_referencia: hoje.toISOString().slice(0, 7),
      gerado_em: hoje.toISOString().slice(0, 19),
    })
  }
  if (metodo === 'GET' && caminho === '/dashboard/entregas-hoje') {
    const itens = abertas()
      .filter((o) => mesmoDia(o.data_previsao, hoje))
      .sort((a, b) => a.data_previsao.localeCompare(b.data_previsao))
    return responder({
      data: hoje.toISOString().slice(0, 10),
      total: itens.length,
      limite: 20,
      offset: 0,
      tem_mais: false,
      mensagem_vazia: itens.length ? null : 'Nenhuma entrega prevista para hoje.',
      itens,
    })
  }
  if (metodo === 'GET' && caminho === '/dashboard/ordens-recentes') {
    return responder({ total: abertas().length, itens: abertas() })
  }
  if (metodo === 'GET' && caminho === '/ordens-servico') {
    const status = q.get('status')
    let lista = ORDENS
    if (status === 'GARANTIA') lista = ORDENS.filter((o) => o.garantia)
    else if (status) lista = ORDENS.filter((o) => o.status === status)
    const placa = (q.get('placa') ?? '').toUpperCase().replace(/[^A-Z0-9]/g, '')
    if (placa) lista = lista.filter((o) => o.placa.includes(placa))
    if (q.get('cliente')) lista = lista.filter((o) => semAcento(o.cliente_nome).includes(semAcento(q.get('cliente'))))
    return responder(lista)
  }
  if ((m = caminho.match(/^\/ordens-servico\/(\d+)\/itens$/)) && metodo === 'GET') {
    return responder(ITENS[m[1]] ?? [])
  }
  if ((m = caminho.match(/^\/ordens-servico\/(\d+)\/apontamentos$/))) {
    if (metodo === 'GET') return responder(APONTAMENTOS[m[1]] ?? [])
    if (metodo === 'POST') {
      if (!corpo?.descricao?.trim()) return responder({ detail: 'Escreva o que foi feito.' }, 422)
      const lista = (APONTAMENTOS[m[1]] ??= [])
      const novo = {
        id: Date.now(),
        tipo: corpo.tipo ?? 'OBSERVACAO',
        descricao: corpo.descricao.trim(),
        data: new Date().toISOString().slice(0, 19),
      }
      lista.push(novo)
      return responder(novo, 201)
    }
  }
  if ((m = caminho.match(/^\/ordens-servico\/(\d+)$/)) && metodo === 'GET') {
    const os = ORDENS.find((o) => o.id === Number(m[1]))
    return os ? responder(os) : responder({ detail: 'Ordem de serviço não encontrada.' }, 404)
  }
  if (metodo === 'GET' && caminho === '/clientes') {
    const termo = semAcento(q.get('nome') ?? q.get('busca'))
    const digitos = termo.replace(/\D/g, '')
    return responder(
      CLIENTES.filter(
        (c) =>
          semAcento(c.nome).includes(termo) ||
          (digitos &&
            (c.cpf_cnpj.replace(/\D/g, '').includes(digitos) || c.telefone.replace(/\D/g, '').includes(digitos))),
      ),
    )
  }
  if ((m = caminho.match(/^\/clientes\/(\d+)$/)) && metodo === 'GET') {
    const c = CLIENTES.find((x) => x.id === Number(m[1]))
    return c ? responder(c) : responder({ detail: 'Cliente não encontrado.' }, 404)
  }
  if (metodo === 'GET' && caminho === '/veiculos') {
    const placa = (q.get('placa') ?? '').toUpperCase()
    return responder(VEICULOS.filter((v) => v.placa.includes(placa)).map(comDono))
  }
  if ((m = caminho.match(/^\/clientes\/(\d+)\/veiculos$/)) && metodo === 'GET') {
    return responder(VEICULOS.filter((v) => v.cliente_id === Number(m[1])).map(comDono))
  }
  // Nos dados de exemplo todos estão em expediente, para o Painel sempre mostrar a equipe.
  if (metodo === 'GET' && caminho === '/mecanicos') return responder(MECANICOS)
  if (metodo === 'GET' && caminho === '/servicos') {
    const termo = semAcento(q.get('busca'))
    return responder(SERVICOS.filter((x) => semAcento(x.descricao).includes(termo)))
  }
  if (metodo === 'GET' && caminho === '/pecas') {
    const termo = semAcento(q.get('busca'))
    let lista = PECAS.filter((x) => semAcento(x.descricao).includes(termo) || semAcento(x.codigo).includes(termo))
    if (q.get('estoque_baixo') === 'true') lista = lista.filter((x) => x.estoque <= x.estoque_minimo)
    return responder(lista)
  }
  if ((m = caminho.match(/^\/pecas\/(\d+)\/entradas$/)) && metodo === 'POST') {
    const peca = PECAS.find((x) => x.id === Number(m[1]))
    const qtd = Number(corpo?.quantidade)
    if (!peca) return responder({ detail: 'Peça não encontrada.' }, 404)
    if (!Number.isInteger(qtd) || qtd <= 0) return responder({ detail: 'Informe uma quantidade maior que zero.' }, 422)
    peca.estoque += qtd
    return responder(peca)
  }
  if (metodo === 'GET' && caminho === '/usuarios') return responder(USUARIOS)
  if (metodo === 'POST' && caminho === '/clientes') {
    if (!corpo?.nome?.trim()) return responder({ detail: 'Informe o nome do cliente.' }, 422)
    const novo = {
      id: proximoId(CLIENTES),
      quantidade_veiculos: 0,
      cliente_desde: new Date().toISOString().slice(0, 10),
      ...corpo,
    }
    CLIENTES.push(novo)
    return responder(novo, 201)
  }
  if (metodo === 'POST' && caminho === '/mecanicos') {
    if (!corpo?.nome?.trim()) return responder({ detail: 'Informe o nome do mecânico.' }, 422)
    const novo = { id: proximoId(MECANICOS), os_em_servico: 0, ...corpo }
    MECANICOS.push(novo)
    return responder(novo, 201)
  }
  if (metodo === 'GET' && caminho === '/busca') {
    const termo = semAcento(q.get('q'))
    return responder({
      ordens: ORDENS.filter(
        (o) =>
          String(o.id).includes(termo) ||
          semAcento(o.placa).includes(termo) ||
          semAcento(o.cliente_nome).includes(termo),
      ),
      veiculos: VEICULOS.filter((v) => semAcento(v.placa).includes(termo)),
      clientes: CLIENTES.filter((c) => semAcento(c.nome).includes(termo)),
    })
  }
  if (metodo === 'POST' && caminho === '/veiculos') {
    const placa = String(corpo?.placa ?? '')
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, '')
    if (!/^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/.test(placa))
      return responder({ detail: 'Placa inválida. Use ABC1234 ou ABC1D23.' }, 422)
    if (VEICULOS.some((v) => v.placa === placa))
      return responder({ detail: 'Já existe um veículo com essa placa.' }, 409)
    const novo = { id: proximoId(VEICULOS), cliente_id: null, ...corpo, placa }
    VEICULOS.push(novo) // fica até recarregar a página
    return responder(novo, 201)
  }
  if (metodo === 'POST' && caminho === '/auth/login') {
    if (corpo?.email === 'recepcao@oficina.com.br' && corpo?.senha === 'oficina123') {
      return responder({
        access_token: 'token-de-exemplo',
        token_type: 'bearer',
        usuario: { id: 2, nome: 'Ana Recepção', email: corpo.email, perfil: 'RECEPCAO' },
      })
    }
    return responder({ detail: 'E-mail ou senha incorretos.' }, 401)
  }
  if (metodo !== 'GET') {
    return responder(
      { detail: 'Essa gravação não existe nos dados de exemplo. Rode a vitrine no computador e use "Backend real".' },
      405,
    )
  }
  return responder({ detail: `A rota ${caminho} não existe nos dados de exemplo.` }, 404)
}

// Troca o fetch do navegador: no modo "exemplo", /api/* responde daqui (com 400 ms de espera,
// para dar tempo de ver o "carregando"); no modo "backend", segue para o servidor de verdade.
export function instalarApiDeExemplo() {
  const fetchOriginal = window.fetch.bind(window)
  window.fetch = async (entrada, opcoes = {}) => {
    // Base fixa: no claude.ai o endereço da página é "about:srcdoc" e não serve de base.
    const url = new URL(typeof entrada === 'string' ? entrada : entrada.url, 'http://vitrine.local')
    if (modoAtual() !== 'exemplo' || !url.pathname.startsWith('/api/')) return fetchOriginal(entrada, opcoes)
    await new Promise((r) => setTimeout(r, 400))
    const corpo = opcoes.body ? JSON.parse(opcoes.body) : null
    return rotear((opcoes.method ?? 'GET').toUpperCase(), url.pathname.slice(4), url.searchParams, corpo)
  }
}
