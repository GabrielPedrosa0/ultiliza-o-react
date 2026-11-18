// Cliente. Integrante 5.
// Troque o <EmConstrucao> pelo conteúdo da tela. Modelo pronto: pages/Painel/PainelPage.jsx.
import CabecalhoPagina from '../../components/layout/CabecalhoPagina'
import EmConstrucao from '../../components/ui/EmConstrucao'

export default function DetalheClientePage() {
  return (
    <>
      <CabecalhoPagina titulo="Cliente" voltarPara="/clientes" />
      <EmConstrucao
        titulo="Cliente"
        responsavel="Integrante 5"
        descricao="Dados, veículos e histórico de OS do cliente."
      />
    </>
  )
}
