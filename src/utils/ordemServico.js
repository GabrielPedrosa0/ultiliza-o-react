// Regras de exibição da OS usadas em mais de um componente. Integrantes 2 e 3.

// Texto da coluna "Serviço": o resumo do painel, o serviço ou o problema relatado.
export function resumoServico(ordem) {
  return ordem.servico_resumo || ordem.servico || ordem.problema_relatado || ''
}

// Total da OS = soma de quantidade x valor unitário de todos os itens (especificação 3.4).
export function totalDosItens(itens = []) {
  return itens.reduce((soma, i) => soma + Number(i.quantidade ?? 1) * Number(i.valor_unitario ?? 0), 0)
}
