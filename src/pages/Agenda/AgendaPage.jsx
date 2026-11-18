// Agenda. Integrante 4.
// Troque o <EmConstrucao> pelo conteúdo da tela. Modelo pronto: pages/Painel/PainelPage.jsx.
import CabecalhoPagina from '../../components/layout/CabecalhoPagina'
import EmConstrucao from '../../components/ui/EmConstrucao'

export default function AgendaPage() {
  return (
    <>
      <CabecalhoPagina titulo="Agenda" />
      <EmConstrucao
        titulo="Agenda"
        responsavel="Integrante 4"
        descricao="OS previstas por dia (GET /api/agenda?data=)."
      />
    </>
  )
}
