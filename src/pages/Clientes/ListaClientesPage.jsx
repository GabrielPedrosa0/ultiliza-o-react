// Clientes. Integrante 5.
// Troque o <EmConstrucao> pelo conteúdo da tela. Modelo pronto: pages/Painel/PainelPage.jsx.
import CabecalhoPagina from '../../components/layout/CabecalhoPagina'
import EmConstrucao from '../../components/ui/EmConstrucao'

export default function ListaClientesPage() {
  return (
    <>
      <CabecalhoPagina titulo="Clientes" />
      <EmConstrucao
        titulo="Clientes"
        responsavel="Integrante 5"
        descricao="Lista em ordem alfabética com busca por nome, telefone ou placa."
      />
    </>
  )
}
