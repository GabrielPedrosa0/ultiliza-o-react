// Nova ordem. Integrante 2.
// Troque o <EmConstrucao> pelo conteúdo da tela. Modelo pronto: pages/Painel/Painel.jsx.
import CabecalhoPagina from '../../components/layout/CabecalhoPagina'
import EmConstrucao from '../../components/ui/EmConstrucao'

export default function NovaOrdemPage() {
  return (
    <>
      <CabecalhoPagina titulo="Nova ordem" voltarPara="/ordens" />
      <EmConstrucao
        titulo="Nova ordem"
        responsavel="Integrante 2"
        descricao="Placa, cliente, veículo, quilometragem, problema, mecânico e previsão."
      />
    </>
  )
}
