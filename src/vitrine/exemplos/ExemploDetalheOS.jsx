// EXEMPLO DE COMPOSIÇÃO — "Detalhe da OS" (especificação 3.4) montado só com os componentes.
// Integrantes 2 e 3: podem copiar para pages/OrdensServico/DetalheOrdemPage.jsx e ajustar.
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Ban, Check, PackageSearch, Pencil, Phone, Plus, Printer, Send } from 'lucide-react'
import CabecalhoPagina from '../../components/layout/CabecalhoPagina'
import RodapeAcoes from '../../components/layout/RodapeAcoes'
import Aviso from '../../components/ui/Aviso'
import Botao from '../../components/ui/Botao'
import Campo from '../../components/ui/Campo'
import Cartao, { Dado, GradeDados } from '../../components/ui/Cartao'
import { EstadoCarregando, EstadoErro } from '../../components/ui/Estados'
import Modal, { ModalConfirmacao } from '../../components/ui/Modal'
import Placa from '../../components/ui/Placa'
import SeloStatus from '../../components/ui/SeloStatus'
import ItensOS from '../../components/os/ItensOS'
import { ACAO_PRINCIPAL, podeMudar, statusEncerrado } from '../../constants/statusOS'
import { useAcao, useApi } from '../../hooks/useApi'
import { adicionarItem, listarItens } from '../../services/itensOSService'
import { consultarOrdem, mudarStatus } from '../../services/ordensServicoService'
import { formatarKm, formatarMoeda, formatarMomento, linkTelefone, linkWhatsApp } from '../../utils/formatadores'
import { totalDosItens } from '../../utils/ordemServico'
import { obrigatorio, validar, validarNumeroNaoNegativo } from '../../utils/validadores'
import './exemplos.css'

const ITEM_VAZIO = { tipo: 'servico', descricao: '', codigo: '', quantidade: '1', valor_unitario: '' }

// Texto do orçamento para mandar pelo WhatsApp do próprio aparelho.
function textoOrcamento(os, itens) {
  const linhas = itens.map((i) => `• ${i.descricao}: ${formatarMoeda(i.quantidade * i.valor_unitario)}`)
  return [
    `Orçamento da OS ${os.id} — ${os.veiculo} (${os.placa})`,
    ...linhas,
    `Total: ${formatarMoeda(totalDosItens(itens))}`,
  ].join('\n')
}

export default function ExemploDetalheOS() {
  const { id } = useParams()
  const ordem = useApi(() => consultarOrdem(id), [id])
  const itens = useApi(() => listarItens(id), [id])
  const acaoStatus = useAcao(mudarStatus)
  const acaoItem = useAcao(adicionarItem)

  const [modalItem, setModalItem] = useState(false)
  const [item, setItem] = useState(ITEM_VAZIO)
  const [errosItem, setErrosItem] = useState({})
  const [cancelar, setCancelar] = useState(false)
  const [motivo, setMotivo] = useState('')

  if (ordem.carregando) return <EstadoCarregando texto="Carregando a OS..." />
  if (ordem.erro) return <EstadoErro mensagem={ordem.erro.message} onTentarDeNovo={ordem.recarregar} />

  const os = ordem.dados
  const lista = itens.dados ?? []
  const acao = ACAO_PRINCIPAL[os.status]
  const somenteLeitura = statusEncerrado(os.status)

  async function avancar(novo, motivoCancelamento) {
    if (await acaoStatus.executar(os.id, novo, motivoCancelamento)) {
      setCancelar(false)
      ordem.recarregar()
    }
  }

  async function salvarItem() {
    const erros = validar({
      descricao: obrigatorio(item.descricao, 'Informe a descrição.'),
      quantidade: obrigatorio(item.quantidade, 'Informe a quantidade.') ?? validarNumeroNaoNegativo(item.quantidade),
      valor_unitario:
        obrigatorio(item.valor_unitario, 'Informe o valor.') ?? validarNumeroNaoNegativo(item.valor_unitario),
    })
    setErrosItem(erros)
    if (Object.keys(erros).length) return
    const salvo = await acaoItem.executar(os.id, {
      ...item,
      codigo: item.codigo || null,
      quantidade: Number(item.quantidade),
      valor_unitario: Number(String(item.valor_unitario).replace(',', '.')),
    })
    if (salvo) {
      setModalItem(false)
      setItem(ITEM_VAZIO)
      itens.recarregar()
    }
  }

  const mudarItem = (campo) => (e) => setItem({ ...item, [campo]: e.target.value })

  return (
    <>
      <CabecalhoPagina
        titulo={`OS ${os.id}`}
        voltarPara={-1}
        acoes={
          <>
            <Botao variante="secundario" icone={Printer} onClick={() => window.print()}>
              Imprimir
            </Botao>
            {!somenteLeitura && (
              <Botao variante="secundario" icone={Pencil}>
                Editar dados
              </Botao>
            )}
          </>
        }
      />

      <div className="pagina detalhe-os">
        <div className="detalhe-os__topo">
          <SeloStatus status={os.status} />
          <Placa placa={os.placa} tamanho="grande" />
        </div>
        <div>
          <h2 className="t-h3">{os.veiculo}</h2>
          <p className="texto-secundario detalhe-os__cliente">
            {os.cliente_nome} ·{' '}
            <a href={linkTelefone(os.cliente_telefone)}>
              <Phone size={14} aria-hidden="true" /> {os.cliente_telefone}
            </a>
          </p>
        </div>

        {acaoStatus.erro && (
          <Aviso tom="perigo" titulo="Não foi possível mudar o status" onFechar={acaoStatus.limparErro}>
            {acaoStatus.erro.message}
          </Aviso>
        )}

        <div className="detalhe-os__grade">
          <div className="pilha">
            <Cartao>
              <GradeDados>
                <Dado rotulo="Entrada">{formatarMomento(os.data_abertura)}</Dado>
                <Dado rotulo="Previsão">{os.data_previsao ? formatarMomento(os.data_previsao) : 'Sem data'}</Dado>
                <Dado rotulo="Quilometragem">{formatarKm(os.quilometragem)}</Dado>
                <Dado rotulo="Mecânico">{os.mecanico ?? 'A definir'}</Dado>
              </GradeDados>
            </Cartao>

            <Cartao
              titulo="Serviços e peças"
              acao={
                !somenteLeitura && (
                  <Botao variante="fantasma" tamanho="pequeno" icone={Plus} onClick={() => setModalItem(true)}>
                    Adicionar
                  </Botao>
                )
              }
            >
              {itens.carregando ? (
                <EstadoCarregando />
              ) : itens.erro ? (
                <EstadoErro
                  titulo="Não foi possível carregar os itens"
                  mensagem={itens.erro.message}
                  onTentarDeNovo={itens.recarregar}
                />
              ) : (
                <ItensOS itens={lista} somenteLeitura={somenteLeitura} onRemover={() => {}} />
              )}
            </Cartao>
          </div>

          <div className="pilha">
            <Cartao titulo="Observações">
              <Dado rotulo="Problema relatado">{os.problema_relatado}</Dado>
              <Dado rotulo="Anotações internas">{os.observacoes ?? 'Nenhuma'}</Dado>
            </Cartao>
            {!somenteLeitura && (
              <Cartao titulo="Outras ações">
                {podeMudar(os.status, 'AGUARDANDO_PECA') && (
                  <Botao variante="secundario" icone={PackageSearch} onClick={() => avancar('AGUARDANDO_PECA')}>
                    Marcar aguardando peça
                  </Botao>
                )}
                {podeMudar(os.status, 'CANCELADO') && (
                  <Botao variante="secundario" icone={Ban} onClick={() => setCancelar(true)}>
                    Cancelar OS
                  </Botao>
                )}
              </Cartao>
            )}
          </div>
        </div>

        {/* Botão principal muda conforme o status; Entregue e Cancelado não têm. */}
        {acao && (
          <RodapeAcoes>
            <Botao
              variante="secundario"
              icone={Send}
              onClick={() => window.open(linkWhatsApp(os.cliente_telefone, textoOrcamento(os, lista)), '_blank')}
            >
              Enviar orçamento
            </Botao>
            <Botao icone={Check} carregando={acaoStatus.executando} onClick={() => avancar(acao.proximo)}>
              {acao.rotulo}
            </Botao>
          </RodapeAcoes>
        )}
      </div>

      <Modal
        aberto={modalItem}
        onFechar={() => setModalItem(false)}
        titulo="Adicionar item"
        rodape={
          <>
            <Botao variante="secundario" onClick={() => setModalItem(false)}>
              Cancelar
            </Botao>
            <Botao carregando={acaoItem.executando} onClick={salvarItem}>
              Salvar item
            </Botao>
          </>
        }
      >
        {acaoItem.erro && <Aviso tom="perigo">{acaoItem.erro.message}</Aviso>}
        <Campo rotulo="Tipo" tipo="select" value={item.tipo} onChange={mudarItem('tipo')}>
          <option value="servico">Mão de obra</option>
          <option value="peca">Peça</option>
        </Campo>
        <Campo rotulo="Descrição" value={item.descricao} onChange={mudarItem('descricao')} erro={errosItem.descricao} />
        <Campo rotulo="Código" opcional value={item.codigo} onChange={mudarItem('codigo')} placeholder="FLT-OL-0098" />
        <div className="detalhe-os__duas">
          <Campo
            rotulo="Quantidade"
            tipo="number"
            min="0"
            step="1"
            value={item.quantidade}
            onChange={mudarItem('quantidade')}
            erro={errosItem.quantidade}
          />
          <Campo
            rotulo="Valor unitário (R$)"
            inputMode="decimal"
            value={item.valor_unitario}
            onChange={mudarItem('valor_unitario')}
            erro={errosItem.valor_unitario}
          />
        </div>
      </Modal>

      <ModalConfirmacao
        aberto={cancelar}
        titulo={`Cancelar a OS ${os.id}?`}
        texto="A OS fica só para leitura. Informe o motivo, ele vai para o histórico."
        rotuloConfirmar="Cancelar OS"
        perigo
        carregando={acaoStatus.executando}
        onCancelar={() => setCancelar(false)}
        onConfirmar={() => motivo.trim() && avancar('CANCELADO', motivo.trim())}
      >
        <Campo
          rotulo="Motivo"
          tipo="textarea"
          maxLength={300}
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
        />
      </ModalConfirmacao>
    </>
  )
}
