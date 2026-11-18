// Lista de seções da vitrine (ordem do menu).
import ComoUsar from './Comecar'
import PaginaGuia from '../guia/PaginaGuia'
import { SECOES_GUIA } from '../guia/guia'
import { Cores, Espacos, Icones, Tipografia } from './Fundacoes'
import {
  SecAviso,
  SecBotao,
  SecBusca,
  SecCampo,
  SecCartao,
  SecEmConstrucao,
  SecEstados,
  SecFiltros,
  SecIndicador,
  SecItemLista,
  SecModal,
  SecPlacaAvatar,
  SecSelo,
} from './ComponentesUI'
import { SecCartaoOS, SecItensOS, SecTabelaOS } from './ComponentesOS'
import { SecLayout, SecTelas } from './Layout'
import { SecApi, SecHooks, SecTeste } from './Backend'
import { SecFormatadores, SecStatus, SecValidadores } from './Utilitarios'

// O guia vem primeiro: uma entrada no menu para cada "## " do docs/guia_frontend.md.
const GUIA = SECOES_GUIA.map((secao) => ({
  id: secao.id,
  grupo: 'Guia do frontend',
  titulo: `${secao.numero}. ${secao.titulo}`,
  Componente: () => <PaginaGuia secao={secao} />,
}))

export const SECOES = [
  ...GUIA,
  { id: 'como-usar', grupo: 'Vitrine', titulo: 'Como usar a vitrine', Componente: ComoUsar },
  { id: 'cores', grupo: 'Fundações', titulo: 'Cores', Componente: Cores },
  { id: 'tipografia', grupo: 'Fundações', titulo: 'Tipografia', Componente: Tipografia },
  { id: 'espacos', grupo: 'Fundações', titulo: 'Espaços e raios', Componente: Espacos },
  { id: 'icones', grupo: 'Fundações', titulo: 'Ícones', Componente: Icones },
  { id: 'botao', grupo: 'Componentes', titulo: 'Botão', Componente: SecBotao },
  { id: 'campo', grupo: 'Componentes', titulo: 'Campo', Componente: SecCampo },
  { id: 'selo', grupo: 'Componentes', titulo: 'Selo de status', Componente: SecSelo },
  { id: 'placa-avatar', grupo: 'Componentes', titulo: 'Placa e Avatar', Componente: SecPlacaAvatar },
  { id: 'indicador', grupo: 'Componentes', titulo: 'Indicador', Componente: SecIndicador },
  { id: 'filtros', grupo: 'Componentes', titulo: 'Filtros', Componente: SecFiltros },
  { id: 'cartao', grupo: 'Componentes', titulo: 'Cartão e Dado', Componente: SecCartao },
  { id: 'item-lista', grupo: 'Componentes', titulo: 'Item de lista', Componente: SecItemLista },
  { id: 'busca', grupo: 'Componentes', titulo: 'Barra de busca', Componente: SecBusca },
  { id: 'aviso', grupo: 'Componentes', titulo: 'Aviso', Componente: SecAviso },
  { id: 'estados', grupo: 'Componentes', titulo: 'Carregando, vazio e erro', Componente: SecEstados },
  { id: 'modal', grupo: 'Componentes', titulo: 'Modal', Componente: SecModal },
  { id: 'em-construcao', grupo: 'Componentes', titulo: 'Em construção', Componente: SecEmConstrucao },
  { id: 'cartao-os', grupo: 'Ordem de serviço', titulo: 'Cartão da OS', Componente: SecCartaoOS },
  { id: 'tabela-os', grupo: 'Ordem de serviço', titulo: 'Tabela de OS', Componente: SecTabelaOS },
  { id: 'itens-os', grupo: 'Ordem de serviço', titulo: 'Serviços e peças', Componente: SecItensOS },
  { id: 'layout', grupo: 'Layout', titulo: 'Moldura do app', Componente: SecLayout },
  { id: 'telas', grupo: 'Layout', titulo: 'Telas completas', Componente: SecTelas },
  { id: 'api', grupo: 'Backend', titulo: 'Conexão e services', Componente: SecApi },
  { id: 'hooks', grupo: 'Backend', titulo: 'useApi e useAcao', Componente: SecHooks },
  { id: 'teste', grupo: 'Backend', titulo: 'Testar a conexão', Componente: SecTeste },
  { id: 'formatadores', grupo: 'Utilitários', titulo: 'Formatadores', Componente: SecFormatadores },
  { id: 'validadores', grupo: 'Utilitários', titulo: 'Validadores', Componente: SecValidadores },
  { id: 'status', grupo: 'Utilitários', titulo: 'Status da OS', Componente: SecStatus },
]
