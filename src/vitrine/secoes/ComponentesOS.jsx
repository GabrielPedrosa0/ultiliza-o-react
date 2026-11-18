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
  const adicionar = (tipo) =>
    setItens((atual) => [
      ...atual,
      tipo === 'servico'
        ? {
            id: Date.now(),
            tipo,
            descricao: 'Alinhamento e balanceamento',
            quantidade: 1,
            valor_unitario: 160,
            tempo_estimado_min: 60,
          }
        : {
            id: Date.now(),
            tipo,
            descricao: 'Pastilha de freio dianteira',
            codigo: 'PST-DIA-0451',
            quantidade: 1,
            valor_unitario: 140,
          },
    ])
  return (
    <PaginaSecao
      grupo="Ordem de serviço"
      titulo="Serviços e peças"
      descricao="Como no Figma do Detalhe da OS: Serviços e Peças em grupos separados, cada um com o seu “+ Adicionar”, e embaixo os subtotais e o Total (soma de quantidade × valor). somenteLeitura esconde os botões (OS entregue ou cancelada)."
      arquivos={[`${OS}ItensOS.jsx`, `${OS}os.css`, 'utils/ordemServico.js']}
      responsavel="Integrante 3"
    >
      <Exemplo
        titulo="Editável (clique em “+ Adicionar” ou na lixeira)"
        codigo={`
import ItensOS from '../../components/os/ItensOS'

const { dados: itens, recarregar } = useApi(() => listarItens(os.id), [os.id])

<Cartao>
  <ItensOS
    itens={itens}
    somenteLeitura={statusEncerrado(os.status)}
    onAdicionar={(tipo) => abrirModal(tipo)}          {/* 'servico' ou 'peca' */}
    onEditar={(item) => abrirEdicao(item)}
    onRemover={async (item) => { await removerItem(os.id, item.id); recarregar() }}
  />
</Cartao>`}
        coluna
      >
        <div style={{ width: '100%', maxWidth: 620 }}>
          <Cartao>
            <ItensOS
              itens={itens}
              onAdicionar={adicionar}
              onRemover={(item) => setItens(itens.filter((i) => i.id !== item.id))}
              onEditar={() => {}}
            />
          </Cartao>
        </div>
      </Exemplo>
      <Bloco titulo="Formato de cada item (proposta para o Integrante 3)">
        <TabelaProps
          linhas={[
            ['tipo', "'servico' | 'peca'", '', 'Separa os dois grupos'],
            ['descricao', 'string', '', 'Obrigatório'],
            ['codigo', 'string | null', '', 'Peças: ex.: FLT-OL-0098'],
            ['quantidade', 'number', '1', 'Maior que zero'],
            ['valor_unitario', 'number (reais)', '', 'Serviço: parte do preço base do catálogo'],
            ['tempo_estimado_min', 'number', '', 'Serviços: “tempo estimado 40 min”'],
          ]}
        />
      </Bloco>
    </PaginaSecao>
  )
}
