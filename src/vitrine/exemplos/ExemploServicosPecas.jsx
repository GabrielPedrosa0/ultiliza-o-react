// EXEMPLO DE COMPOSIÇÃO — "Serviços" e "Peças" (Figma PC: duas telas; celular: "Serviços e peças" com abas).
// Integrante 1: pode copiar para pages/Servicos/ServicosPage.jsx e pages/Pecas/PecasPage.jsx.
//   <ExemploServicosPecas aba="servicos" />   ·   <ExemploServicosPecas aba="pecas" />
import { useState } from 'react'
import { PackagePlus, Plus } from 'lucide-react'
import CabecalhoPagina from '../../components/layout/CabecalhoPagina'
import Abas from '../../components/ui/Abas'
import BarraBusca from '../../components/ui/BarraBusca'
import Botao from '../../components/ui/Botao'
import Cartao from '../../components/ui/Cartao'
import { EstadoCarregando, EstadoErro, EstadoVazio } from '../../components/ui/Estados'
import Etiqueta from '../../components/ui/Etiqueta'
import Tabela from '../../components/ui/Tabela'
import { useApi } from '../../hooks/useApi'
import { useDebounce } from '../../hooks/useDebounce'
import { listarPecas } from '../../services/pecasService'
import { listarServicosCatalogo } from '../../services/servicosCatalogoService'
import { formatarDuracao, formatarMoeda } from '../../utils/formatadores'
import { estoqueBaixo } from '../../utils/ordemServico'
import './exemplos.css'

const ABAS = [
  { valor: 'servicos', rotulo: 'Serviços', para: '/exemplo/servicos' },
  { valor: 'pecas', rotulo: 'Peças', para: '/exemplo/pecas' },
]

const CONFIG = {
  servicos: {
    titulo: 'Serviços',
    novo: 'Novo serviço',
    busca: 'Nome do serviço',
    carregar: listarServicosCatalogo,
    colunas: [
      { chave: 'descricao', rotulo: 'Serviço' },
      {
        chave: 'tempo_estimado_min',
        rotulo: 'Tempo estimado',
        direita: true,
        render: (s) => formatarDuracao(s.tempo_estimado_min),
      },
      { chave: 'preco_base', rotulo: 'Preço base', direita: true, render: (s) => formatarMoeda(s.preco_base) },
    ],
    detalhe: (s) => `Tempo estimado: ${formatarDuracao(s.tempo_estimado_min)}`,
    preco: (s) => s.preco_base,
  },
  pecas: {
    titulo: 'Peças',
    novo: 'Nova peça',
    busca: 'Nome ou código da peça',
    carregar: listarPecas,
    colunas: [
      { chave: 'codigo', rotulo: 'Código', render: (p) => <span className="exemplo-codigo">{p.codigo}</span> },
      {
        chave: 'descricao',
        rotulo: 'Peça',
        render: (p) => (
          <>
            {p.descricao} {estoqueBaixo(p) && <Etiqueta tom="atencao">Estoque baixo</Etiqueta>}
          </>
        ),
      },
      { chave: 'estoque', rotulo: 'Estoque', direita: true },
      { chave: 'estoque_minimo', rotulo: 'Mínimo', direita: true },
      { chave: 'preco_venda', rotulo: 'Preço de venda', direita: true, render: (p) => formatarMoeda(p.preco_venda) },
    ],
    detalhe: (p) => `${p.codigo} · ${p.estoque} em estoque${estoqueBaixo(p) ? ' · estoque baixo' : ''}`,
    preco: (p) => p.preco_venda,
  },
}

export default function ExemploServicosPecas({ aba = 'servicos' }) {
  const config = CONFIG[aba]
  const [texto, setTexto] = useState('')
  const busca = useDebounce(texto.trim(), 300)
  const { dados, carregando, erro, recarregar } = useApi(() => config.carregar({ busca }), [aba, busca])

  let conteudo
  if (carregando) conteudo = <EstadoCarregando />
  else if (erro) conteudo = <EstadoErro mensagem={erro.message} onTentarDeNovo={recarregar} />
  else if (dados.length === 0)
    conteudo = <EstadoVazio titulo={busca ? `Nada com “${busca}”.` : 'Nada cadastrado ainda.'} />
  else
    conteudo = (
      <>
        <div className="so-pc">
          <Tabela colunas={config.colunas} linhas={dados} rotulo={config.titulo} onClicarLinha={() => {}} />
        </div>
        <Cartao semEspaco className="so-celular">
          {dados.map((x) => (
            <div key={x.id} className="exemplo-linha">
              <span>
                <b>{x.descricao}</b>
                <small className={aba === 'pecas' && estoqueBaixo(x) ? 'exemplo-alerta' : ''}>
                  {config.detalhe(x)}
                </small>
              </span>
              <span>{formatarMoeda(config.preco(x))}</span>
            </div>
          ))}
        </Cartao>
      </>
    )

  return (
    <>
      <CabecalhoPagina
        titulo={config.titulo}
        tituloCelular="Serviços e peças"
        acoes={
          <>
            {aba === 'pecas' && (
              <Botao variante="secundario" icone={PackagePlus}>
                Entrada de estoque
              </Botao>
            )}
            <Botao icone={Plus}>{config.novo}</Botao>
          </>
        }
      />
      <div className="pagina">
        <div className="so-celular">
          <Abas opcoes={ABAS} valor={aba} rotulo="Serviços e peças" />
        </div>
        <div className="exemplo-busca">
          <BarraBusca valor={texto} onChange={setTexto} placeholder={config.busca} />
        </div>
        {conteudo}
      </div>
    </>
  )
}
