// EXEMPLO DE COMPOSIÇÃO — "Detalhe da OS" (Figma "PC — Detalhe da OS" e "Celular — Detalhe da OS").
// Integrantes 2 e 3: podem copiar para pages/OrdensServico/DetalheOrdemPage.jsx e ajustar.
// À esquerda: Serviços e peças + Apontamentos. À direita: Ordem de serviço, Veículo, Cliente e o relato.
// Com o backend real, campos que ele ainda não manda (chassi, CPF, garantia...) aparecem como “—”.
import { useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { Ban, Check, PackageSearch, Phone, Printer, Send } from 'lucide-react'
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
import Apontamentos from '../../components/os/Apontamentos'
import { TIPOS_REGISTRAVEIS } from '../../constants/apontamentos'
import { ACAO_PRINCIPAL, podeMudar, statusEncerrado } from '../../constants/statusOS'
import { useAcao, useApi } from '../../hooks/useApi'
import { adicionarItem, listarItens } from '../../services/itensOSService'
import {
  consultarOrdem,
  listarApontamentos,
  listarOrdens,
  mudarStatus,
  registrarApontamento,
} from '../../services/ordensServicoService'
import { formatarKm, formatarMoeda, formatarMomento, linkTelefone, linkWhatsApp } from '../../utils/formatadores'
import { totalDosItens } from '../../utils/ordemServico'
import { obrigatorio, validar, validarNumeroNaoNegativo } from '../../utils/validadores'
import './exemplos.css'

const ITEM_VAZIO = { tipo: 'servico', descricao: '', codigo: '', quantidade: '1', valor_unitario: '' }
const APONTAMENTO_VAZIO = { tipo: 'EXECUCAO', descricao: '' }
const ou = (valor) => valor ?? '—'

// Texto do orçamento para mandar pelo WhatsApp do próprio aparelho.
function textoOrcamento(os, itens) {
  const linhas = itens.map((i) => `• ${i.descricao}: ${formatarMoeda(i.quantidade * i.valor_unitario)}`)
  return [
    `Orçamento da OS ${os.id} — ${os.veiculo} (${os.placa})`,
    ...linhas,
    `Total: ${formatarMoeda(totalDosItens(itens))}`,
  ].join('\n')
}

// "/exemplo/ordens/primeira": abre a primeira OS que existir (útil com o backend real,
// onde os números das OS dependem de quantas vezes você rodou o dados_exemplo.py).
function PrimeiraOS() {
  const { dados, carregando, erro, recarregar } = useApi(() => listarOrdens())
  if (carregando) return <EstadoCarregando formato="bloco" texto="Procurando uma OS..." />
  if (erro) return <EstadoErro mensagem={erro.message} onTentarDeNovo={recarregar} />
  if (!dados.length) return <EstadoErro titulo="Nenhuma OS cadastrada" mensagem="Rode scripts/dados_exemplo.py." />
  return <Navigate to={`../${dados[0].id}`} relative="path" replace />
}

export default function ExemploDetalheOS() {
  const { id } = useParams()
  return id === 'primeira' ? <PrimeiraOS /> : <DetalheOS id={id} />
}

function DetalheOS({ id }) {
  const ordem = useApi(() => consultarOrdem(id), [id])
  const itens = useApi(() => listarItens(id), [id])
  const acaoStatus = useAcao(mudarStatus)
  const acaoItem = useAcao(adicionarItem)
  const apontamentos = useApi(() => listarApontamentos(id), [id])
  const acaoApontamento = useAcao(registrarApontamento)
  const [modalApontamento, setModalApontamento] = useState(false)
  const [apontamento, setApontamento] = useState(APONTAMENTO_VAZIO)

  const [modalItem, setModalItem] = useState(false)
  const [item, setItem] = useState(ITEM_VAZIO)
  const [errosItem, setErrosItem] = useState({})
  const [cancelar, setCancelar] = useState(false)
  const [motivo, setMotivo] = useState('')

  if (ordem.carregando) return <EstadoCarregando formato="bloco" linhas={5} texto="Carregando a OS..." />
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

  function abrirItem(tipo) {
    setItem({ ...ITEM_VAZIO, tipo })
    setErrosItem({})
    setModalItem(true)
  }

  async function salvarApontamento() {
    if (!apontamento.descricao.trim()) return
    if (await acaoApontamento.executar(os.id, { ...apontamento, descricao: apontamento.descricao.trim() })) {
      setModalApontamento(false)
      setApontamento(APONTAMENTO_VAZIO)
      apontamentos.recarregar()
    }
  }

  const enviarOrcamento = () => window.open(linkWhatsApp(os.cliente_telefone, textoOrcamento(os, lista)), '_blank')

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
            {acao && (
              <>
                <Botao variante="secundario" icone={Send} onClick={enviarOrcamento}>
                  Enviar orçamento
                </Botao>
                <Botao icone={Check} carregando={acaoStatus.executando} onClick={() => avancar(acao.proximo)}>
                  {acao.rotulo}
                </Botao>
              </>
            )}
          </>
        }
      />

      <div className="pagina detalhe-os">
        <div className="detalhe-os__topo">
          <SeloStatus status={os.status} />
          <Placa placa={os.placa} tamanho="grande" />
        </div>

        {acaoStatus.erro && (
          <Aviso tom="perigo" titulo="Não foi possível mudar o status" onFechar={acaoStatus.limparErro}>
            {acaoStatus.erro.message}
          </Aviso>
        )}

        <div className="detalhe-os__grade">
          <div className="pilha">
            <Cartao>
              {itens.carregando ? (
                <EstadoCarregando formato="bloco" />
              ) : itens.erro ? (
                <EstadoErro
                  titulo="Não foi possível carregar os itens"
                  mensagem={itens.erro.message}
                  onTentarDeNovo={itens.recarregar}
                />
              ) : (
                <ItensOS itens={lista} somenteLeitura={somenteLeitura} onAdicionar={abrirItem} onRemover={() => {}} />
              )}
            </Cartao>

            <Cartao>
              {apontamentos.carregando ? (
                <EstadoCarregando formato="bloco" />
              ) : apontamentos.erro ? (
                <EstadoErro
                  titulo="Não foi possível carregar os apontamentos"
                  mensagem={apontamentos.erro.message}
                  onTentarDeNovo={apontamentos.recarregar}
                />
              ) : (
                <Apontamentos
                  apontamentos={apontamentos.dados}
                  somenteLeitura={somenteLeitura}
                  onRegistrar={() => setModalApontamento(true)}
                />
              )}
            </Cartao>
          </div>

          <div className="pilha">
            <Cartao titulo="Ordem de serviço">
              <GradeDados>
                <Dado rotulo="Abertura">{formatarMomento(os.data_abertura)}</Dado>
                <Dado rotulo="Previsão">{os.data_previsao ? formatarMomento(os.data_previsao) : 'Sem data'}</Dado>
                <Dado rotulo="Conclusão">{os.data_conclusao ? formatarMomento(os.data_conclusao) : '—'}</Dado>
                <Dado rotulo="Orçamento enviado">
                  {os.data_orcamento_enviado ? formatarMomento(os.data_orcamento_enviado) : '—'}
                </Dado>
              </GradeDados>
              <Dado rotulo="Mecânico">
                {os.mecanico ? [os.mecanico, os.mecanico_expediente].filter(Boolean).join(' · ') : 'A definir'}
              </Dado>
              <Dado rotulo="Garantia">{os.garantia ? 'Sim' : 'Não'}</Dado>
            </Cartao>

            <Cartao titulo="Veículo">
              <Dado rotulo="Modelo">{[os.veiculo, os.ano].filter(Boolean).join(' · ')}</Dado>
              <Dado rotulo="Chassi">
                <span className="detalhe-os__chassi">{ou(os.chassi)}</span>
              </Dado>
              <Dado rotulo="Km na entrada">{formatarKm(os.quilometragem)}</Dado>
            </Cartao>

            <Cartao titulo="Cliente">
              <Dado rotulo="Nome">{os.cliente_nome}</Dado>
              <Dado rotulo="Telefone">
                <a className="detalhe-os__telefone" href={linkTelefone(os.cliente_telefone)}>
                  <Phone size={14} aria-hidden="true" /> {os.cliente_telefone}
                </a>
              </Dado>
              <Dado rotulo="CPF">{ou(os.cliente_cpf_cnpj)}</Dado>
            </Cartao>

            <Cartao>
              <Dado rotulo="Problema relatado">{os.problema_relatado}</Dado>
              <Dado rotulo="Observações">{os.observacoes ?? 'Nenhuma'}</Dado>
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
        {/* No celular os dois botões ficam presos no rodapé; no PC estão no cabeçalho. */}
        {acao && (
          <RodapeAcoes soCelular>
            <Botao variante="secundario" icone={Send} onClick={enviarOrcamento}>
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
        titulo={item.tipo === 'servico' ? 'Adicionar serviço' : 'Adicionar peça'}
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
        <Campo rotulo="Descrição" value={item.descricao} onChange={mudarItem('descricao')} erro={errosItem.descricao} />
        {item.tipo === 'peca' && (
          <Campo
            rotulo="Código"
            opcional
            value={item.codigo}
            onChange={mudarItem('codigo')}
            placeholder="FLT-OL-0098"
          />
        )}
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

      <Modal
        aberto={modalApontamento}
        onFechar={() => setModalApontamento(false)}
        titulo="Registrar apontamento"
        rodape={
          <>
            <Botao variante="secundario" onClick={() => setModalApontamento(false)}>
              Cancelar
            </Botao>
            <Botao carregando={acaoApontamento.executando} onClick={salvarApontamento}>
              Registrar
            </Botao>
          </>
        }
      >
        {acaoApontamento.erro && <Aviso tom="perigo">{acaoApontamento.erro.message}</Aviso>}
        <Campo
          rotulo="Tipo"
          tipo="select"
          value={apontamento.tipo}
          onChange={(e) => setApontamento({ ...apontamento, tipo: e.target.value })}
        >
          {TIPOS_REGISTRAVEIS.map((t) => (
            <option key={t.valor} value={t.valor}>
              {t.rotulo}
            </option>
          ))}
        </Campo>
        <Campo
          rotulo="O que foi feito"
          tipo="textarea"
          maxLength={500}
          value={apontamento.descricao}
          onChange={(e) => setApontamento({ ...apontamento, descricao: e.target.value })}
          placeholder="Óleo e filtros trocados; testando vazamentos."
        />
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
