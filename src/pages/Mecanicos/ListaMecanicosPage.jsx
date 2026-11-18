// Mecânicos. Integrante 4.
// Figma "PC — Mecânicos" e "Celular — Mecânicos". Service: services/mecanicosService.js. Componentes: Tabela (PC), ItemLista com avatar (celular).
// Troque o <EmConstrucao> pelo conteúdo da tela. Modelo pronto: pages/Painel/PainelPage.jsx.
import CabecalhoPagina from '../../components/layout/CabecalhoPagina'
import EmConstrucao from '../../components/ui/EmConstrucao'

export default function ListaMecanicosPage() {
  return (
    <>
      <CabecalhoPagina titulo="Mecânicos" />
      <EmConstrucao
        titulo="Mecânicos"
        responsavel="Integrante 4"
        descricao="Equipe com CPF, telefone, horário de expediente e quantas OS cada um tem em serviço. O expediente aparece na escolha do mecânico ao abrir uma OS."
      />
    </>
  )
}
