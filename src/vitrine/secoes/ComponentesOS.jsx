import { useState } from 'react'
import PaginaSecao, { Bloco } from '../partes/PaginaSecao'
import Exemplo from '../partes/Exemplo'
import TabelaProps from '../partes/TabelaProps'
import CartaoOS from '../../components/os/CartaoOS'
import TabelaOS from '../../components/os/TabelaOS'
import ItensOS from '../../components/os/ItensOS'
import Cartao from '../../components/ui/Cartao'
import { ITENS, ORDENS } from '../dadosExemplo'

const OS = 'components/os/'

export function SecCartaoOS() {
  return (
    <PaginaSecao
      grupo="Ordem de serviço"
      titulo="Cartão da OS (celular)"
      descricao="Recebe a OS do jeito que o backend devolve (GET /api/ordens-servico ou /api/dashboard/*) e mostra número, status, modelo, cliente · serviço, placa e previsão. Tocar abre o Detalhe."
      arquivos={[`${OS}CartaoOS.jsx`, `${OS}os.css`, 'utils/ordemServico.js']}
      responsavel="Integrante 2"
    >
      <Exemplo
        titulo="Lista de cartões"
        codigo={`
import CartaoOS from '../../components/os/CartaoOS'

<div className="lista-cartoes-os">
  {ordens.map((os) => <CartaoOS key={os.id} ordem={os} />)}   {/* abre /ordens/:id */}
</div>

<CartaoOS ordem={os} onClick={(os) => abrirModal(os)} />      {/* ação própria */}`}
        coluna
      >
        <div className="lista-cartoes-os" style={{ maxWidth: 390 }}>
          {ORDENS.slice(0, 3).map((os) => (
            <CartaoOS key={os.id} ordem={os} />
          ))}
        </div>
      </Exemplo>
      <Bloco titulo="Campos da OS que o cartão usa">
        <TabelaProps
          linhas={[
            ['id', 'number', '', '“OS 1042”'],
            ['status', 'código', '', 'Selo de status'],
            ['veiculo', 'string', '', 'Modelo (“Volkswagen Gol 1.6”)'],
            ['cliente_nome', 'string', '', 'Antes do “·”'],
            ['servico_resumo | servico | problema_relatado', 'string', '', 'O primeiro que existir'],
            ['placa', 'string', '', 'Componente Placa'],
            ['data_previsao', 'data sem fuso', '', '“Hoje, 17:00”, “Amanhã”, “Sem data”'],
          ]}
        />
      </Bloco>
    </PaginaSecao>
  )
}

export function SecTabelaOS() {
  return (
    <PaginaSecao
      grupo="Ordem de serviço"
      titulo="Tabela de OS (PC)"
      descricao="As mesmas OS em tabela. Clicar no cabeçalho reordena (OS sem previsão ficam por último); clicar na linha abre o Detalhe. Também funciona pelo teclado (Tab + Enter)."
      arquivos={[`${OS}TabelaOS.jsx`, `${OS}os.css`, 'utils/ordemServico.js']}
      responsavel="Integrante 2"
    >
      <Exemplo
        titulo="Clique nos cabeçalhos para ordenar"
        codigo={`
import TabelaOS from '../../components/os/TabelaOS'

<TabelaOS ordens={dados} />                              {/* ordenável, abre /ordens/:id */}
<TabelaOS ordens={dados.itens} ordenavel={false} />      {/* Painel: “Ordens recentes” */}
<TabelaOS ordens={dados} onClicar={(os) => navigate(\`/outra/\${os.id}\`)} />`}
        coluna
      >
        <TabelaOS ordens={ORDENS} onClicar={() => {}} />
      </Exemplo>
    </PaginaSecao>
  )
}

export function SecItensOS() {
  const [itens, setItens] = useState(ITENS[1042])
  return (
    <PaginaSecao
      grupo="Ordem de serviço"
      titulo="Serviços e peças"
      descricao="Itens da OS com o total (soma de quantidade × valor). Com onEditar/onRemover aparecem os botões de cada linha; somenteLeitura esconde tudo (OS entregue ou cancelada)."
      arquivos={[`${OS}ItensOS.jsx`, `${OS}os.css`, 'utils/ordemServico.js']}
      responsavel="Integrante 3"
    >
      <Exemplo
        titulo="Editável (clique na lixeira)"
        codigo={`
import ItensOS from '../../components/os/ItensOS'

const { dados: itens, recarregar } = useApi(() => listarItens(os.id), [os.id])

<Cartao titulo="Serviços e peças" acao={<Botao variante="fantasma" tamanho="pequeno" icone={Plus}>Adicionar</Botao>}>
  <ItensOS
    itens={itens}
    somenteLeitura={statusEncerrado(os.status)}
    onEditar={(item) => abrirEdicao(item)}
    onRemover={async (item) => { await removerItem(os.id, item.id); recarregar() }}
  />
</Cartao>`}
        coluna
      >
        <div style={{ maxWidth: 440 }}>
          <Cartao titulo="Serviços e peças">
            <ItensOS
              itens={itens}
              onRemover={(item) => setItens(itens.filter((i) => i.id !== item.id))}
              onEditar={() => {}}
            />
          </Cartao>
        </div>
      </Exemplo>
      <Bloco titulo="Formato de cada item (proposta para o Integrante 3)">
        <TabelaProps
          linhas={[
            ['tipo', "'servico' | 'peca'", '', '“Mão de obra” ou “Peça” na tela'],
            ['descricao', 'string', '', 'Obrigatório'],
            ['codigo', 'string | null', '', 'Ex.: FLT-OL-0098'],
            ['quantidade', 'number', '1', 'Maior que zero'],
            ['valor_unitario', 'number (reais)', '', 'Maior ou igual a zero'],
          ]}
        />
      </Bloco>
    </PaginaSecao>
  )
}
