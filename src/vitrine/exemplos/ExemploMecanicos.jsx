// EXEMPLO DE COMPOSIÇÃO — "Mecânicos" (Figma "PC — Mecânicos" e "Celular — Mecânicos").
// Integrante 4: pode copiar para pages/Mecanicos/ListaMecanicosPage.jsx e ajustar.
// PC: Tabela. Celular: lista com avatar. Os dois usam a mesma resposta do backend.
import { useNavigate } from 'react-router-dom'
import { HardHat, Plus } from 'lucide-react'
import CabecalhoPagina from '../../components/layout/CabecalhoPagina'
import RodapeAcoes from '../../components/layout/RodapeAcoes'
import Avatar from '../../components/ui/Avatar'
import Botao from '../../components/ui/Botao'
import Cartao from '../../components/ui/Cartao'
import { EstadoCarregando, EstadoErro, EstadoVazio } from '../../components/ui/Estados'
import ItemLista from '../../components/ui/ItemLista'
import Tabela from '../../components/ui/Tabela'
import { useApi } from '../../hooks/useApi'
import { listarMecanicos } from '../../services/mecanicosService'
import { formatarExpediente, plural } from '../../utils/formatadores'
import './exemplos.css'

const AJUDA = 'O horário de expediente aparece na escolha do mecânico ao abrir uma OS.'

const emServico = (m) =>
  m.os_em_servico > 0 ? `${plural(m.os_em_servico, 'OS', 'OS')} em serviço` : 'sem OS no momento'

const COLUNAS = [
  {
    chave: 'nome',
    rotulo: 'Nome',
    render: (m) => (
      <span className="exemplo-pessoa">
        <Avatar nome={m.nome} tamanho={32} /> {m.nome}
      </span>
    ),
  },
  { chave: 'cpf', rotulo: 'CPF' },
  { chave: 'telefone', rotulo: 'Telefone' },
  {
    chave: 'expediente',
    rotulo: 'Expediente',
    render: (m) => formatarExpediente(m.expediente_inicio, m.expediente_fim),
    valorOrdem: (m) => m.expediente_inicio,
  },
  { chave: 'os_em_servico', rotulo: 'OS em serviço', direita: true },
]

export default function ExemploMecanicos() {
  const navigate = useNavigate()
  const { dados, carregando, erro, recarregar } = useApi(() => listarMecanicos())
  const editar = (m) => navigate(`/mecanicos/${m.id}/editar`)

  let conteudo
  if (carregando) conteudo = <EstadoCarregando texto="Carregando equipe..." />
  else if (erro) conteudo = <EstadoErro mensagem={erro.message} onTentarDeNovo={recarregar} />
  else if (dados.length === 0)
    conteudo = <EstadoVazio icone={HardHat} titulo="Nenhum mecânico cadastrado" texto="Cadastre a equipe da oficina." />
  else
    conteudo = (
      <>
        <div className="so-pc">
          <Tabela colunas={COLUNAS} linhas={dados} rotulo="Mecânicos" onClicarLinha={editar} />
        </div>
        <Cartao semEspaco className="so-celular">
          {dados.map((m) => (
            <ItemLista
              key={m.id}
              avatar={m.nome}
              titulo={m.nome}
              subtitulo={`${formatarExpediente(m.expediente_inicio, m.expediente_fim)} · ${emServico(m)}`}
              onClick={() => editar(m)}
            />
          ))}
        </Cartao>
      </>
    )

  return (
    <>
      <CabecalhoPagina
        titulo="Mecânicos"
        acoes={
          <Botao para="/mecanicos/novo" icone={Plus}>
            Novo mecânico
          </Botao>
        }
      />
      <div className="pagina">
        <p className="texto-secundario exemplo-ajuda">{AJUDA}</p>
        {conteudo}
        <RodapeAcoes soCelular>
          <Botao para="/mecanicos/novo" icone={Plus} larguraTotal>
            Novo mecânico
          </Botao>
        </RodapeAcoes>
      </div>
    </>
  )
}
