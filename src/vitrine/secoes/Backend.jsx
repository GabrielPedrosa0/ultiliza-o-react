import { useState } from 'react'
import { PlugZap } from 'lucide-react'
import PaginaSecao, { Bloco } from '../partes/PaginaSecao'
import BlocoCodigo from '../partes/BlocoCodigo'
import Exemplo from '../partes/Exemplo'
import Botao from '../../components/ui/Botao'
import Aviso from '../../components/ui/Aviso'
import { EstadoCarregando } from '../../components/ui/Estados'
import { useAcao } from '../../hooks/useApi'
import { obterResumo } from '../../services/dashboardService'
import { listarOrdens } from '../../services/ordensServicoService'
import { listarClientes } from '../../services/clientesService'
import { listarVeiculos } from '../../services/veiculosService'
import { modoAtual } from '../apiExemplo'

const SERVICOS = [
  [
    'veiculosService.js',
    'Integrante 1',
    'listarVeiculos({ placa }) · consultarVeiculo(id) · cadastrarVeiculo(dados) · atualizarVeiculo(id, dados) · excluirVeiculo(id)',
    '/api/veiculos',
  ],
  [
    'ordensServicoService.js',
    'Integrantes 2 e 3',
    'listarOrdens({ status, placa, cliente }) · consultarOrdem(id) · cadastrarOrdem(dados) · atualizarOrdem(id, dados) · excluirOrdem(id) · exportarOrdensCSV(filtros) · mudarStatus(id, status, motivo) · enviarOrcamento(id) · marcarPronta(id)',
    '/api/ordens-servico',
  ],
  [
    'itensOSService.js',
    'Integrante 3',
    'listarItens(osId) · adicionarItem(osId, dados) · atualizarItem(osId, itemId, dados) · removerItem(osId, itemId)',
    '/api/ordens-servico/{id}/itens',
  ],
  [
    'dashboardService.js',
    'Integrante 4',
    'obterResumo() · listarEntregasHoje({ limite, offset }) · listarOrdensRecentes({ limite })',
    '/api/dashboard',
  ],
  ['buscaService.js', 'Integrante 4', 'pesquisar(q)', '/api/busca'],
  ['agendaService.js', 'Integrante 4', 'consultarAgenda(data)', '/api/agenda'],
  [
    'clientesService.js',
    'Integrante 5',
    'listarClientes({ nome }) · consultarCliente(id) · cadastrarCliente(dados) · atualizarCliente(id, dados) · excluirCliente(id) · listarVeiculosDoCliente(id) · consultarHistoricoDoCliente(id)',
    '/api/clientes',
  ],
  [
    'authService.js',
    'Integrante 5',
    'entrar(email, senha) · sair() · usuarioSalvo() · estaLogado() · consultarUsuarioLogado() · esqueciSenha(email)',
    '/api/auth',
  ],
]

export function SecApi() {
  return (
    <PaginaSecao
      grupo="Backend"
      titulo="Conexão com o backend"
      descricao="O caminho é sempre o mesmo: tela → service do grupo → api.js → FastAPI. Na Vercel, /api vai para o backend pelo vercel.json; no computador, o vite.config.js repassa /api para http://127.0.0.1:8000."
      arquivos={['services/api.js', ...SERVICOS.map(([a]) => `services/${a}`)]}
    >
      <Bloco titulo="O que o api.js faz por você">
        <ul className="vt-lista">
          <li>
            Monta a URL com /api e os filtros (ignora os vazios):{' '}
            <code>apiGet('/ordens-servico', {'{ status, placa }'})</code>.
          </li>
          <li>Manda o token do login em todo pedido (Authorization: Bearer).</li>
          <li>
            Transforma o “detail” do FastAPI numa mensagem pronta: <code>erro.message</code> e <code>erro.status</code>{' '}
            (401, 404, 409, 422...).
          </li>
          <li>Sem internet ou servidor desligado: “Sem conexão com o servidor. Confira a internet e tente de novo.”</li>
          <li>
            Baixa arquivos (CSV da exportação) com <code>apiBaixarArquivo</code>.
          </li>
        </ul>
      </Bloco>

      <Bloco
        titulo="Um service por grupo de rotas"
        texto="Tela nenhuma chama fetch direto. Se uma rota mudar no backend, muda só no service."
      >
        <div className="vt-props">
          <table>
            <thead>
              <tr>
                <th>Arquivo</th>
                <th>Responsável</th>
                <th>Funções</th>
                <th>Rotas</th>
              </tr>
            </thead>
            <tbody>
              {SERVICOS.map(([arquivo, resp, funcoes, rota]) => (
                <tr key={arquivo}>
                  <td>
                    <code>{arquivo}</code>
                  </td>
                  <td>{resp}</td>
                  <td className="vt-props__funcoes">{funcoes}</td>
                  <td>
                    <code>{rota}</code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Bloco>

      <Bloco titulo="Escrever uma função de service">
        <BlocoCodigo
          titulo="services/veiculosService.js"
          codigo={`
import { apiDelete, apiGet, apiPost, apiPut } from './api'

// GET /api/veiculos?placa=QRS
export const listarVeiculos = ({ placa } = {}) => apiGet('/veiculos', { placa })

// POST /api/veiculos  { placa, marca, modelo, ano, quilometragem, cliente_id }
export const cadastrarVeiculo = (dados) => apiPost('/veiculos', dados)`}
        />
      </Bloco>
    </PaginaSecao>
  )
}

export function SecHooks() {
  return (
    <PaginaSecao
      grupo="Backend"
      titulo="useApi e useAcao"
      descricao="Os dois hooks que ligam a tela ao service. useApi busca ao abrir a tela (e quando um filtro muda) e devolve dados, carregando, erro e recarregar. useAcao é para salvar, excluir e mudar status: só roda quando você chama."
      arquivos={['hooks/useApi.js', 'hooks/useDebounce.js']}
    >
      <Exemplo
        titulo="Ler: lista com filtro"
        codigo={`
import { useApi } from '../../hooks/useApi'
import { listarOrdens } from '../../services/ordensServicoService'

const [status, setStatus] = useState('')
const { dados, carregando, erro, recarregar } = useApi(() => listarOrdens({ status }), [status])
//                                                     função do service             quando refazer

if (carregando) return <EstadoCarregando />
if (erro) return <EstadoErro mensagem={erro.message} onTentarDeNovo={recarregar} />
return dados.map((os) => <CartaoOS key={os.id} ordem={os} />)`}
      />
      <Exemplo
        titulo="Gravar: formulário"
        codigo={`
import { useAcao } from '../../hooks/useApi'
import { cadastrarOrdem } from '../../services/ordensServicoService'

const navigate = useNavigate()
const { executar, executando, erro } = useAcao(cadastrarOrdem)

async function criar(e) {
  e.preventDefault()
  const os = await executar({ veiculo_id, problema_relatado, data_previsao: deCampoDataHora(previsao) })
  if (os) navigate(\`/ordens/\${os.id}\`)          // null = deu erro, a mensagem está em erro.message
}

<form onSubmit={criar}>
  {erro && <Aviso tom="perigo">{erro.message}</Aviso>}
  ...
  <Botao type="submit" carregando={executando}>Criar ordem</Botao>
</form>`}
      />
    </PaginaSecao>
  )
}

const TESTES = [
  ['GET /api/dashboard/resumo', obterResumo],
  ['GET /api/ordens-servico', () => listarOrdens()],
  ['GET /api/clientes', () => listarClientes()],
  ['GET /api/veiculos', () => listarVeiculos()],
]

export function SecTeste() {
  const [rota, setRota] = useState(0)
  const [resultado, setResultado] = useState(null)
  const teste = useAcao(TESTES[rota][1])
  const modo = modoAtual()

  async function testar() {
    setResultado(null)
    const r = await teste.executar()
    if (r) setResultado(r)
  }

  return (
    <PaginaSecao
      grupo="Backend"
      titulo="Testar a conexão"
      descricao="Chama o backend usando os services do projeto e mostra a resposta. Para testar o FastAPI de verdade, rode a vitrine no seu computador (`npm run dev`), escolha “Backend real” no topo e deixe o servidor rodando."
    >
      <Aviso
        tom={modo === 'exemplo' ? 'info' : 'atencao'}
        titulo={modo === 'exemplo' ? 'Usando os dados de exemplo' : 'Usando o backend real'}
      >
        {modo === 'exemplo' ? (
          'As respostas vêm da própria vitrine (src/vitrine/apiExemplo.js).'
        ) : (
          <>
            O pedido vai para <code>/api</code> → <code>http://127.0.0.1:8000</code>. Rode{' '}
            <code>uvicorn app:app --reload</code> em <code>backend/</code> e{' '}
            <code>python scripts/dados_exemplo.py</code> para ter dados.
          </>
        )}
      </Aviso>
      <Bloco>
        <div className="linha" style={{ flexWrap: 'wrap' }}>
          <select
            className="vt-select"
            value={rota}
            onChange={(e) => setRota(Number(e.target.value))}
            aria-label="Rota"
          >
            {TESTES.map(([nome], i) => (
              <option key={nome} value={i}>
                {nome}
              </option>
            ))}
          </select>
          <Botao icone={PlugZap} carregando={teste.executando} onClick={testar}>
            Testar
          </Botao>
        </div>
        {teste.executando && <EstadoCarregando texto="Chamando o backend..." />}
        {teste.erro && (
          <Aviso tom="perigo" titulo={`Falhou${teste.erro.status ? ` (HTTP ${teste.erro.status})` : ''}`}>
            {teste.erro.message}
          </Aviso>
        )}
        {resultado && (
          <BlocoCodigo titulo="Resposta (JSON)" codigo={JSON.stringify(resultado, null, 2)} alturaMax={420} />
        )}
      </Bloco>
    </PaginaSecao>
  )
}
