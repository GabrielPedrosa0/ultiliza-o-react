// Ordens de serviço. Integrante 2.
// Troque o <EmConstrucao> pelo conteúdo da tela. Modelo pronto: pages/Painel/PainelPage.jsx.
import CabecalhoPagina from '../../components/layout/CabecalhoPagina'
import EmConstrucao from '../../components/ui/EmConstrucao'

export default function ListaOrdensPage() {
  return (
    <>
      <CabecalhoPagina titulo="Ordens de serviço" />
      <EmConstrucao
        titulo="Ordens de serviço"
        responsavel="Integrante 2"
        descricao="Filtros por status, busca e lista (cartões no celular, tabela no PC)."
      />
    </>
  )
}
