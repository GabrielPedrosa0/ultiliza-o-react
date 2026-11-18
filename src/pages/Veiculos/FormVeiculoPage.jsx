// Novo / editar veículo. Integrante 1.
// Troque o <EmConstrucao> pelo formulário. Modelo pronto: pages/Painel/PainelPage.jsx.
// Campos: placa (validarPlaca), marca, modelo, ano (validarAno), quilometragem, cliente.
import { useParams } from 'react-router-dom'
import CabecalhoPagina from '../../components/layout/CabecalhoPagina'
import EmConstrucao from '../../components/ui/EmConstrucao'

export default function FormVeiculoPage() {
  const { id } = useParams() // sem id = novo veículo
  const titulo = id ? 'Editar veículo' : 'Novo veículo'
  return (
    <>
      <CabecalhoPagina titulo={titulo} voltarPara="/veiculos" />
      <EmConstrucao
        titulo={titulo}
        responsavel="Integrante 1"
        descricao="Placa, marca, modelo, ano, quilometragem e dono (RF01)."
      />
    </>
  )
}
