// Serviços. Integrante 1.
// Figma "PC — Serviços" e "Celular — Serviços". Service: services/servicosCatalogoService.js. Componentes: Tabela, Abas, BarraBusca.
// Troque o <EmConstrucao> pelo conteúdo da tela. Modelo pronto: pages/Painel/PainelPage.jsx.
import CabecalhoPagina from '../../components/layout/CabecalhoPagina'
import EmConstrucao from '../../components/ui/EmConstrucao'

export default function ServicosPage() {
  return (
    <>
      <CabecalhoPagina titulo="Serviços" />
      <EmConstrucao
        titulo="Serviços"
        responsavel="Integrante 1"
        descricao="Catálogo de mão de obra com tempo estimado e preço base. No celular, abas Serviços | Peças com busca."
      />
    </>
  )
}
