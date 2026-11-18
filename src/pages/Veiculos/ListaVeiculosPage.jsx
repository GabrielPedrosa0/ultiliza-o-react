// Veículos. Integrante 1.
// Troque o <EmConstrucao> pelo conteúdo da tela. Modelo pronto: pages/Painel/PainelPage.jsx.
import CabecalhoPagina from '../../components/layout/CabecalhoPagina'
import EmConstrucao from '../../components/ui/EmConstrucao'

export default function ListaVeiculosPage() {
  return (
    <>
      <CabecalhoPagina titulo="Veículos" />
      <EmConstrucao
        titulo="Veículos"
        responsavel="Integrante 1"
        descricao="Lista com busca por placa e botões de novo, editar e excluir (RF01)."
      />
    </>
  )
}
