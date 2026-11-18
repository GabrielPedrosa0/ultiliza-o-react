// Regras de exibição da OS usadas em mais de um componente. Integrantes 2 e 3.

// Texto da coluna "Serviço": o resumo do painel, o serviço ou o problema relatado.
export function resumoServico(ordem) {
  return ordem.servico_resumo || ordem.servico || ordem.problema_relatado || ''
}

// Total da OS = soma de quantidade x valor unitário de todos os itens (especificação 3.4).
export function totalDosItens(itens = []) {
  return itens.reduce((soma, i) => soma + Number(i.quantidade ?? 1) * Number(i.valor_unitario ?? 0), 0)
}

// Separa os itens da OS como no Figma: "Serviços" (mão de obra) e "Peças", cada um com o seu subtotal.
export function separarItens(itens = []) {
  const servicos = itens.filter((i) => i.tipo === 'servico')
  const pecas = itens.filter((i) => i.tipo !== 'servico')
  return { servicos, pecas, totalServicos: totalDosItens(servicos), totalPecas: totalDosItens(pecas) }
}

// Peça com estoque no mínimo ou abaixo (Figma "Peças": etiqueta "Estoque baixo").
export function estoqueBaixo(peca) {
  return Number(peca.estoque ?? 0) <= Number(peca.estoque_minimo ?? 3)
}
