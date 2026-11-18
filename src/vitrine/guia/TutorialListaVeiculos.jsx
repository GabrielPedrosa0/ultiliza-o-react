import { useState } from 'react'
import { Car, Plus } from 'lucide-react'
import CabecalhoPagina from '../../components/layout/CabecalhoPagina'
import RodapeAcoes from '../../components/layout/RodapeAcoes'
import BarraBusca from '../../components/ui/BarraBusca'
import Botao from '../../components/ui/Botao'
import Cartao from '../../components/ui/Cartao'
import ItemLista from '../../components/ui/ItemLista'
import { EstadoCarregando, EstadoErro, EstadoVazio } from '../../components/ui/Estados'
import { useApi } from '../../hooks/useApi'
import { useDebounce } from '../../hooks/useDebounce'
import { listarVeiculos } from '../../services/veiculosService'
import { formatarKm } from '../../utils/formatadores'

export default function ListaVeiculosPage() {
  // 1. Estado: o que a pessoa digitou na busca
  const [texto, setTexto] = useState('')
  const placa = useDebounce(texto.trim(), 300)

  // 2. Dados do backend: busca de novo sempre que `placa` mudar
  const { dados, carregando, erro, recarregar } = useApi(() => listarVeiculos({ placa }), [placa])

  // 3. O que mostrar em cada situação
  let conteudo
  if (carregando) {
    conteudo = <EstadoCarregando formato="lista" texto="Carregando veículos..." />
  } else if (erro) {
    conteudo = <EstadoErro mensagem={erro.message} onTentarDeNovo={recarregar} />
  } else if (dados.length === 0) {
    conteudo = <EstadoVazio icone={Car} titulo="Nenhum veículo encontrado" />
  } else {
    conteudo = (
      <Cartao semEspaco>
        {dados.map((veiculo) => (
          <ItemLista
            key={veiculo.id}
            icone={Car}
            titulo={`${veiculo.marca} ${veiculo.modelo}`}
            subtitulo={`${veiculo.placa} · ${formatarKm(veiculo.quilometragem)}`}
            para={`/veiculos/${veiculo.id}`}
          />
        ))}
      </Cartao>
    )
  }

  // 4. A tela
  return (
    <>
      <CabecalhoPagina
        titulo="Veículos"
        acoes={
          <Botao para="/veiculos/novo" icone={Plus}>
            Novo veículo
          </Botao>
        }
      />
      <div className="pagina">
        <BarraBusca valor={texto} onChange={setTexto} placeholder="Buscar pela placa" />
        {conteudo}
      </div>
      <RodapeAcoes soCelular>
        <Botao para="/veiculos/novo" icone={Plus} larguraTotal>
          Novo veículo
        </Botao>
      </RodapeAcoes>
    </>
  )
}
