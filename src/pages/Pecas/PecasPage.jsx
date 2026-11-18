// Peças. Integrante 1.
// Figma "PC — Peças" e "Celular — Peças". Service: services/pecasService.js. Componentes: Tabela, Abas, Etiqueta (estoque baixo: utils/ordemServico.js).
// Troque o <EmConstrucao> pelo conteúdo da tela. Modelo pronto: pages/Painel/PainelPage.jsx.
import CabecalhoPagina from '../../components/layout/CabecalhoPagina'
import EmConstrucao from '../../components/ui/EmConstrucao'

export default function PecasPage() {
  return (
    <>
      <CabecalhoPagina titulo="Peças" />
      <EmConstrucao
        titulo="Peças"
        responsavel="Integrante 1"
        descricao="Peças com código, estoque, mínimo e preço de venda; etiqueta de estoque baixo e entrada de estoque."
      />
    </>
  )
}
