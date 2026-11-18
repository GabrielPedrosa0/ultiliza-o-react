// Onde a vitrine está rodando e como abrir o app dentro das molduras.
//
// No visualizador do claude.ai a página não tem um endereço normal (é "about:srcdoc"),
// então nada aqui pode depender de window.location para navegar:
//  - a vitrine e o app usam MemoryRouter (a rota fica na memória, não no endereço);
//  - o app dentro de uma moldura recebe a rota pelo window.name do iframe;
//  - onde não dá para carregar a página de novo pelo endereço, o iframe recebe o HTML inteiro (srcdoc).

export const PREFIXO_APP = 'oficina-app|'

let htmlOriginal = ''

// Chamado no começo do main.jsx, antes do React desenhar qualquer coisa.
export function guardarHtmlOriginal() {
  htmlOriginal = `<!DOCTYPE html>\n${document.documentElement.outerHTML}`
}

// true quando a página tem um endereço que dá para abrir de novo (http, https ou arquivo local).
export function temEnderecoNormal() {
  try {
    return /^(https?|file):$/.test(window.location.protocol) && window.location.pathname !== 'srcdoc'
  } catch {
    return false
  }
}

// O que o iframe da moldura precisa: { name, src } ou { name, srcDoc }.
export function propsDoIframe(rota, modo) {
  const name = `${PREFIXO_APP}${modo}|${rota}`
  if (temEnderecoNormal()) return { name, src: `${window.location.pathname}${window.location.search}` }
  return { name, srcDoc: htmlOriginal }
}

// Link "Abrir em outra aba" (só onde existe endereço).
export function linkAbrirApp(rota) {
  if (!temEnderecoNormal()) return null
  return `${window.location.pathname}${window.location.search}#app=${encodeURIComponent(rota)}`
}

// Se esta janela é o app (dentro de uma moldura ou aberto pelo link), devolve { rota, modo }.
export function appPedido() {
  try {
    if (window.name.startsWith(PREFIXO_APP)) {
      const [, modo, rota] = window.name.split('|')
      return { rota: rota || '/', modo }
    }
    if (window.location.hash.startsWith('#app=')) {
      return { rota: decodeURIComponent(window.location.hash.slice(5)) || '/', modo: null }
    }
  } catch {
    // sem acesso ao endereço: é a vitrine
  }
  return null
}

// Seção da vitrine guardada no endereço como "#botao" (o único formato que o claude.ai repassa).
export function secaoDoEndereco() {
  try {
    const h = window.location.hash.slice(1)
    return /^[a-z0-9-]+$/.test(h) ? h : null
  } catch {
    return null
  }
}

export function gravarSecaoNoEndereco(id) {
  try {
    if (window.location.hash !== `#${id}`) window.history.replaceState(null, '', `#${id}`)
  } catch {
    // o visualizador pode bloquear; a navegação continua funcionando sem isso
  }
}
