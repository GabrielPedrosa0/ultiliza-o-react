// EXEMPLO DE COMPOSIÇÃO — tela "Ordens de serviço" (especificação 3.3) montada só com os componentes.
// Integrante 2: pode copiar para pages/OrdensServico/ListaOrdensPage.jsx e ajustar.
// Ao copiar, troque '/exemplo/ordens' por '/ordens' e o nome da função para ListaOrdensPage.
import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Download, Plus } from 'lucide-react'
import CabecalhoPagina from '../../components/layout/CabecalhoPagina'
import RodapeAcoes from '../../components/layout/RodapeAcoes'
import Aviso from '../../components/ui/Aviso'
import BarraBusca from '../../components/ui/BarraBusca'
import Botao from '../../components/ui/Botao'
import { EstadoCarregando, EstadoErro, EstadoVazio } from '../../components/ui/Estados'
import Filtros from '../../components/ui/Filtros'
import CartaoOS from '../../components/os/CartaoOS'
import TabelaOS from '../../components/os/TabelaOS'
import { FILTROS_OS, statusEncerrado } from '../../constants/statusOS'
import { useAcao, useApi } from '../../hooks/useApi'
import { useDebounce } from '../../hooks/useDebounce'
import { pesquisar } from '../../services/buscaService'
import { exportarOrdensCSV, listarOrdens } from '../../services/ordensServicoService'

const BASE = '/exemplo/ordens'
const TRINTA_DIAS = 30 * 86_400_000

// Previsão mais próxima primeiro; sem previsão por último, da mais nova para a mais antiga.
// Entregues e canceladas vão para o fim da lista.
function ordenar(lista) {
  const encerrada = (o) => (statusEncerrado(o.status) ? 1 : 0)
  return [...lista].sort((a, b) => {
    if (encerrada(a) !== encerrada(b)) return encerrada(a) - encerrada(b)
    if (a.data_previsao && b.data_previsao) return a.data_previsao.localeCompare(b.data_previsao)
    if (a.data_previsao) return -1
    if (b.data_previsao) return 1
    return b.id - a.id
  })
}

// "Todas" esconde as entregues há mais de 30 dias e as canceladas.
function filtrarTodas(lista) {
  const limite = Date.now() - TRINTA_DIAS
  return lista.filter(
    (o) =>
      o.status !== 'CANCELADO' && !(o.status === 'ENTREGUE' && new Date(o.data_conclusao ?? o.data_abertura) < limite),
  )
}

export default function ExemploListaOrdens() {
  const navigate = useNavigate()
  const [parametros, setParametros] = useSearchParams()
  const status = parametros.get('status') ?? ''
  const [texto, setTexto] = useState(parametros.get('busca') ?? '')
  const busca = useDebounce(texto.trim(), 300)
  const termo = busca.length >= 2 ? busca : '' // busca a partir de 2 caracteres

  const { dados, carregando, erro, recarregar } = useApi(async () => {
    // Com busca: a pesquisa geral acha por placa, cliente ou nº da OS; o filtro de status é aplicado aqui.
    const lista = termo ? (await pesquisar(termo)).ordens : await listarOrdens({ status })
    const filtrada = status ? lista.filter((o) => o.status === status) : filtrarTodas(lista)
    return ordenar(filtrada)
  }, [status, termo])

  const exportar = useAcao(exportarOrdensCSV)

  function mudarStatus(novo) {
    const p = new URLSearchParams(parametros)
    if (novo) p.set('status', novo)
    else p.delete('status')
    setParametros(p, { replace: true })
  }

  function limparFiltros() {
    setTexto('')
    setParametros({}, { replace: true })
  }

  let lista
  if (carregando) lista = <EstadoCarregando texto="Carregando ordens..." />
  else if (erro) lista = <EstadoErro mensagem={erro.message} onTentarDeNovo={recarregar} />
  else if (dados.length === 0)
    lista = (
      <EstadoVazio
        titulo="Nenhuma OS encontrada"
        acao={
          status || termo ? (
            <Botao variante="secundario" onClick={limparFiltros}>
              Limpar filtros
            </Botao>
          ) : (
            <Botao para="/ordens/nova" icone={Plus}>
              Nova ordem
            </Botao>
          )
        }
      />
    )
  else
    lista = (
      <>
        <div className="lista-cartoes-os so-celular">
          {dados.map((os) => (
            <CartaoOS key={os.id} ordem={os} para={`${BASE}/${os.id}`} />
          ))}
        </div>
        <div className="so-pc">
          <TabelaOS ordens={dados} onClicar={(os) => navigate(`${BASE}/${os.id}`)} />
        </div>
      </>
    )

  return (
    <>
      <CabecalhoPagina
        titulo="Ordens de serviço"
        acoes={
          <>
            <Botao
              variante="secundario"
              icone={Download}
              carregando={exportar.executando}
              onClick={() => exportar.executar({ status, placa: termo })}
            >
              Exportar
            </Botao>
            <Botao para="/ordens/nova" icone={Plus}>
              Nova ordem
            </Botao>
          </>
        }
      />
      <div className="pagina">
        <div className="pilha">
          <BarraBusca valor={texto} onChange={setTexto} placeholder="Placa, cliente ou OS" />
          <Filtros opcoes={FILTROS_OS} valor={status} onChange={mudarStatus} rotulo="Filtrar por status" />
        </div>
        {exportar.erro && (
          <Aviso tom="perigo" titulo="Não foi possível exportar" onFechar={exportar.limparErro}>
            {exportar.erro.message}
          </Aviso>
        )}
        {lista}
      </div>
      <RodapeAcoes soCelular>
        <Botao para="/ordens/nova" icone={Plus} larguraTotal>
          Nova ordem
        </Botao>
      </RodapeAcoes>
    </>
  )
}
