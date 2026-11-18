// Lista de serviços e peças da OS, com o total (Detalhe da OS, Figma "Serviços e peças"). Integrante 3.
// Item: { id, tipo: 'servico' | 'peca', descricao, codigo, quantidade, valor_unitario }
// O total é a soma de quantidade × valor (especificação 3.4); passe `total` se o backend já mandar.
//
//   <ItensOS itens={itens} onEditar={abrirEdicao} onRemover={remover} />
//   <ItensOS itens={itens} somenteLeitura />            (OS entregue ou cancelada)
import { Pencil, Trash2 } from 'lucide-react'
import Botao from '../ui/Botao'
import { formatarMoeda } from '../../utils/formatadores'
import { totalDosItens } from '../../utils/ordemServico'
import './os.css'

const ROTULO_TIPO = { servico: 'Mão de obra', peca: 'Peça' }

export default function ItensOS({ itens = [], total, onEditar, onRemover, somenteLeitura = false }) {
  const valorTotal = total ?? totalDosItens(itens)
  const mostrarAcoes = !somenteLeitura && (onEditar || onRemover)

  return (
    <div className="itens-os">
      {itens.length === 0 && <p className="itens-os__vazio">Nenhum serviço ou peça lançado ainda.</p>}

      <ul className="itens-os__lista">
        {itens.map((item) => {
          const qtd = Number(item.quantidade ?? 1)
          const unitario = Number(item.valor_unitario ?? 0)
          const detalhes = [
            ROTULO_TIPO[item.tipo] ?? item.tipo,
            item.codigo,
            qtd !== 1 && `${qtd} × ${formatarMoeda(unitario)}`,
          ]
            .filter(Boolean)
            .join(' · ')
          return (
            <li key={item.id ?? item.descricao} className="itens-os__item">
              <div className="itens-os__textos">
                <span className="itens-os__descricao">{item.descricao}</span>
                <span className="itens-os__detalhes">{detalhes}</span>
              </div>
              <span className="itens-os__valor">{formatarMoeda(qtd * unitario)}</span>
              {mostrarAcoes && (
                <span className="itens-os__acoes">
                  {onEditar && (
                    <Botao
                      variante="fantasma"
                      tamanho="pequeno"
                      icone={Pencil}
                      aria-label={`Editar ${item.descricao}`}
                      onClick={() => onEditar(item)}
                    />
                  )}
                  {onRemover && (
                    <Botao
                      variante="fantasma"
                      tamanho="pequeno"
                      icone={Trash2}
                      aria-label={`Remover ${item.descricao}`}
                      onClick={() => onRemover(item)}
                    />
                  )}
                </span>
              )}
            </li>
          )
        })}
      </ul>

      <div className="itens-os__total">
        <span>Total</span>
        <span className="itens-os__total-valor">{formatarMoeda(valorTotal)}</span>
      </div>
    </div>
  )
}
