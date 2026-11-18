// Detalhe da OS. Integrante 2 (itens e status: Integrante 3).
// Troque o <EmConstrucao> pelo conteúdo da tela. Modelo pronto: pages/Painel/PainelPage.jsx.
import CabecalhoPagina from '../../components/layout/CabecalhoPagina'
import EmConstrucao from '../../components/ui/EmConstrucao'

export default function DetalheOrdemPage() {
  return (
    <>
      <CabecalhoPagina titulo="Detalhe da OS" voltarPara="/ordens" />
      <EmConstrucao
        titulo="Detalhe da OS"
        responsavel="Integrante 2 (itens e status: Integrante 3)"
        descricao="Cabeçalho, veículo, cliente, prazos, serviços e peças, observações e histórico."
      />
    </>
  )
}
