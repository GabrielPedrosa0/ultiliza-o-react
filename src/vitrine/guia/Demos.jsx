/* eslint-disable react-refresh/only-export-components -- arquivo só da vitrine, exporta o mapa de demos */
// Exemplos ao vivo do guia. Cada um aparece no lugar de um <!-- demo:nome --> do guia_frontend.md.
import { useEffect, useRef, useState } from 'react'
import { Minus, Plus, RotateCcw, Trash2 } from 'lucide-react'
import Exemplo from '../partes/Exemplo'
import Moldura from '../partes/Moldura'
import Botao from '../../components/ui/Botao'
import BarraBusca from '../../components/ui/BarraBusca'
import Campo from '../../components/ui/Campo'
import Filtros from '../../components/ui/Filtros'
import Aviso from '../../components/ui/Aviso'
import { EstadoCarregando, EstadoErro, EstadoVazio } from '../../components/ui/Estados'
import CartaoOS from '../../components/os/CartaoOS'
import { FILTROS_OS } from '../../constants/statusOS'
import { useApi } from '../../hooks/useApi'
import { useDebounce } from '../../hooks/useDebounce'
import { ErroApi } from '../../services/api'
import { listarOrdens } from '../../services/ordensServicoService'
import { validarPlaca } from '../../utils/validadores'

function Variavel({ nome, valor }) {
  return (
    <div className="vt-variavel">
      <code>{nome}</code>
      <span>{JSON.stringify(valor)}</span>
    </div>
  )
}

function DemoJsx() {
  const [placa, setPlaca] = useState('QRS4F21')
  const [pronta, setPronta] = useState(true)
  const servicos = ['Troca de óleo', 'Filtros', 'Alinhamento']
  return (
    <Exemplo titulo="▶ Experimente: mude as variáveis e veja o JSX reagir" coluna>
      <div className="vt-demo-duas">
        <div className="pilha">
          <Campo rotulo="const placa =" value={placa} onChange={(e) => setPlaca(e.target.value)} />
          <label className="vt-checkbox">
            <input type="checkbox" checked={pronta} onChange={(e) => setPronta(e.target.checked)} /> const pronta ={' '}
            {String(pronta)}
          </label>
        </div>
        <div className="cartao">
          <p style={{ margin: 0 }}>Placa: {placa}</p>
          {pronta && <p style={{ margin: 0, fontWeight: 600 }}>Pronta para entrega</p>}
          <p style={{ margin: 0 }} className="texto-secundario">
            {pronta ? 'Avisar o cliente' : 'Em serviço'}
          </p>
          <ul style={{ margin: 0 }}>
            {servicos.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      </div>
    </Exemplo>
  )
}

function Saudacao({ nome, oficina = 'Sua Oficina' }) {
  return (
    <p className="t-corpo-g" style={{ margin: 0 }}>
      Bom dia, <strong>{nome}</strong>! Bem-vindo à {oficina}.
    </p>
  )
}

function DemoProps() {
  const [nome, setNome] = useState('Marina')
  const [oficina, setOficina] = useState('')
  const [variante, setVariante] = useState('primario')
  const [texto, setTexto] = useState('Salvar')
  return (
    <Exemplo titulo="▶ Experimente: mude as props" coluna>
      <div className="vt-demo-duas">
        <div className="pilha">
          <Campo rotulo='nome="..."' value={nome} onChange={(e) => setNome(e.target.value)} />
          <Campo rotulo='oficina="..." (vazio = padrão)' value={oficina} onChange={(e) => setOficina(e.target.value)} />
        </div>
        <div className="cartao">
          <code className="vt-demo-codigo">{`<Saudacao nome="${nome}"${oficina ? ` oficina="${oficina}"` : ''} />`}</code>
          <Saudacao nome={nome} oficina={oficina || undefined} />
        </div>
      </div>
      <div className="vt-demo-duas">
        <div className="pilha">
          <Campo rotulo="variante" tipo="select" value={variante} onChange={(e) => setVariante(e.target.value)}>
            {['primario', 'secundario', 'sutil', 'fantasma', 'perigo'].map((v) => (
              <option key={v}>{v}</option>
            ))}
          </Campo>
          <Campo rotulo="children (o texto do botão)" value={texto} onChange={(e) => setTexto(e.target.value)} />
        </div>
        <div className="cartao">
          <code className="vt-demo-codigo">{`<Botao variante="${variante}" icone={Trash2}>${texto}</Botao>`}</code>
          <div>
            <Botao variante={variante} icone={Trash2}>
              {texto}
            </Botao>
          </div>
        </div>
      </div>
    </Exemplo>
  )
}

function DemoContador() {
  const [quantidade, setQuantidade] = useState(0)
  return (
    <Exemplo titulo="▶ Experimente: cada clique troca o estado e o React desenha de novo">
      <Botao onClick={() => setQuantidade(quantidade + 1)} icone={Plus}>
        Cliquei {quantidade} vezes
      </Botao>
      <Botao variante="secundario" icone={Minus} onClick={() => setQuantidade(quantidade - 1)}>
        Menos um
      </Botao>
      <Botao variante="fantasma" icone={RotateCcw} onClick={() => setQuantidade(0)}>
        Zerar
      </Botao>
      <Variavel nome="quantidade" valor={quantidade} />
    </Exemplo>
  )
}

function DemoCampo() {
  const [placa, setPlaca] = useState('')
  return (
    <Exemplo titulo="▶ Experimente: digite uma placa" coluna>
      <div className="vt-demo-duas">
        <Campo rotulo="Placa" value={placa} onChange={(e) => setPlaca(e.target.value)} placeholder="ABC1D23" />
        <div className="pilha">
          <Variavel nome="placa" valor={placa} />
          <Variavel nome="validarPlaca(placa)" valor={validarPlaca(placa)} />
        </div>
      </div>
    </Exemplo>
  )
}

function DemoDebounce() {
  const [texto, setTexto] = useState('')
  const busca = useDebounce(texto, 300)
  const [buscas, setBuscas] = useState(0)
  const primeira = useRef(true)
  useEffect(() => {
    if (primeira.current) {
      primeira.current = false
      return
    }
    setBuscas((n) => n + 1)
  }, [busca])
  return (
    <Exemplo titulo="▶ Experimente: digite rápido e compare" coluna>
      <BarraBusca valor={texto} onChange={setTexto} placeholder="Digite uma placa" />
      <div className="linha" style={{ flexWrap: 'wrap' }}>
        <Variavel nome="texto (muda a cada tecla)" valor={texto} />
        <Variavel nome="useDebounce(texto, 300)" valor={busca} />
        <Variavel nome="buscas que iriam ao backend" valor={buscas} />
      </div>
    </Exemplo>
  )
}

function DemoUseApi() {
  const [status, setStatus] = useState('')
  const [simularErro, setSimularErro] = useState(false)
  const { dados, carregando, erro, recarregar } = useApi(async () => {
    if (simularErro) throw new ErroApi('Sem conexão com o servidor. Confira a internet e tente de novo.', 0)
    return listarOrdens({ status })
  }, [status, simularErro])

  let conteudo
  if (carregando) conteudo = <EstadoCarregando />
  else if (erro) conteudo = <EstadoErro mensagem={erro.message} onTentarDeNovo={() => setSimularErro(false)} />
  else if (dados.length === 0) conteudo = <EstadoVazio titulo="Nenhuma OS encontrada" />
  else
    conteudo = (
      <div className="vt-demo-cartoes">
        {dados.map((os) => (
          <CartaoOS key={os.id} ordem={os} />
        ))}
      </div>
    )

  return (
    <Exemplo titulo="▶ Experimente: troque o filtro, simule um erro e veja as quatro situações" coluna>
      <Filtros opcoes={FILTROS_OS} valor={status} onChange={setStatus} />
      <div className="linha" style={{ flexWrap: 'wrap' }}>
        <label className="vt-checkbox">
          <input type="checkbox" checked={simularErro} onChange={(e) => setSimularErro(e.target.checked)} /> Simular
          backend desligado
        </label>
        <Botao variante="secundario" tamanho="pequeno" icone={RotateCcw} onClick={recarregar}>
          recarregar()
        </Botao>
        <Variavel nome="carregando" valor={carregando} />
        <Variavel nome="erro" valor={erro ? erro.message : null} />
        <Variavel nome="dados.length" valor={dados?.length ?? null} />
      </div>
      {conteudo}
    </Exemplo>
  )
}

function DemoTela({ rota, texto }) {
  return (
    <div className="pilha">
      <Aviso tom="info" titulo="▶ O resultado, funcionando">
        {texto}
      </Aviso>
      <div className="vt-molduras">
        <Moldura rota={rota} tipo="pc" />
        <Moldura rota={rota} tipo="celular" />
      </div>
    </div>
  )
}

export const DEMOS = {
  jsx: DemoJsx,
  props: DemoProps,
  contador: DemoContador,
  campo: DemoCampo,
  debounce: DemoDebounce,
  useapi: DemoUseApi,
  'tela-lista': () => (
    <DemoTela
      rota="/veiculos"
      texto="Este é o código acima rodando de verdade (com os dados de exemplo). Digite na busca, clique em “Novo veículo”."
    />
  ),
  'tela-form': () => (
    <DemoTela
      rota="/veiculos/novo"
      texto="Teste: clique em Salvar com tudo vazio, depois uma placa errada (AB12345), depois uma certa (XYZ1A23). Na versão com dados de exemplo o veículo novo aparece na lista até recarregar a página."
    />
  ),
}
