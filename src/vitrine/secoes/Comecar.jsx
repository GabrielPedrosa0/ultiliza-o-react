import { Link } from 'react-router-dom'
import { ClipboardCopy, FolderTree, Palette, PlugZap } from 'lucide-react'
import PaginaSecao, { Bloco } from '../partes/PaginaSecao'
import BlocoCodigo from '../partes/BlocoCodigo'

const ESTRUTURA = `
frontend/src/
├── styles/           tokens.css (cores, fontes, espaços) e global.css
├── components/
│   ├── ui/           Botao, Campo, SeloStatus, Placa, Avatar, Indicador, Filtros,
│   │                 Cartao, ItemLista, BarraBusca, Aviso, Estados, Modal, EmConstrucao
│   ├── layout/       LayoutPrincipal, MenuLateral, BarraSuperior, BarraAbas,
│   │                 CabecalhoPagina, RodapeAcoes, Logo, itensMenu.js
│   └── os/           CartaoOS, TabelaOS, ItensOS
├── constants/        statusOS.js (os 6 status, cores e botões)
├── utils/            formatadores.js, validadores.js, ordemServico.js
├── hooks/            useApi.js (useApi, useAcao), useDebounce.js
├── services/         api.js + um service por grupo de rotas
├── routes/           AppRoutes.jsx
└── pages/            uma pasta por tela (cada integrante faz a sua)
`

const PASSOS = `
// 1. Copie o arquivo (botão "Copiar arquivo") para o MESMO caminho em frontend/src/
//    Ex.: components/ui/Botao.jsx  ->  frontend/src/components/ui/Botao.jsx
//    Se a pasta tiver um .css (ui.css, layout.css, os.css), ele precisa estar lá também.

// 2. Importe na sua página (o caminho é relativo à página):
import Botao from '../../components/ui/Botao'
import { Plus } from 'lucide-react'

// 3. Use e configure pelas propriedades (veja a tabela de cada componente):
<Botao para="/ordens/nova" icone={Plus}>Nova ordem</Botao>
`

export default function ComoUsar() {
  return (
    <PaginaSecao
      grupo="Vitrine"
      titulo="Como usar a vitrine"
      descricao="Aqui estão todos os componentes do frontend funcionando, com o código para copiar. Eles seguem o Figma (Fundações). Nunca mexeu com React? Comece pelo Guia do frontend, no topo do menu."
    >
      <div className="vt-cartoes">
        <div className="vt-cartao-info">
          <ClipboardCopy size={20} />
          <p className="vt-cartao-info__titulo">Copiar e configurar</p>
          <p>Cada componente tem exemplos com “Copiar uso” e a lista de arquivos com “Copiar arquivo”.</p>
        </div>
        <div className="vt-cartao-info">
          <Palette size={20} />
          <p className="vt-cartao-info__titulo">Só cores por função</p>
          <p>
            Use <code>var(--fundo-primario)</code>, <code>var(--texto-secundario)</code>… nunca um hex solto.{' '}
            <Link to="/cores">Ver cores</Link>
          </p>
        </div>
        <div className="vt-cartao-info">
          <PlugZap size={20} />
          <p className="vt-cartao-info__titulo">Backend pelos services</p>
          <p>
            Tela nenhuma chama <code>fetch</code>: usa o service do grupo com <code>useApi</code>.{' '}
            <Link to="/api">Ver conexão</Link>
          </p>
        </div>
        <div className="vt-cartao-info">
          <FolderTree size={20} />
          <p className="vt-cartao-info__titulo">Telas de exemplo</p>
          <p>
            Lista de OS, Detalhe e Login montados só com os componentes. <Link to="/telas">Ver telas</Link>
          </p>
        </div>
      </div>

      <Bloco titulo="Passo a passo">
        <BlocoCodigo codigo={PASSOS} titulo="Usar um componente" />
      </Bloco>

      <Bloco
        titulo="Onde fica cada coisa"
        texto="A mesma estrutura do repositório oficina-mecanica-os. Os arquivos desta vitrine são cópias exatas dos de lá."
      >
        <BlocoCodigo codigo={ESTRUTURA} titulo="frontend/src" />
      </Bloco>

      <Bloco titulo="Dados de exemplo × backend real">
        <p className="vt-bloco__texto">
          Rodando a vitrine no seu computador (`npm run dev`), o topo deixa escolher de onde vêm os dados; na versão
          publicada são sempre os de exemplo. <strong>Dados de exemplo</strong> funciona sem nada rodando (são os dados
          do Figma). <strong>Backend real</strong> usa o FastAPI em <code>http://127.0.0.1:8000</code>: rode{' '}
          <code>uvicorn app:app --reload</code> dentro de <code>backend/</code> e, para ter dados,{' '}
          <code>python scripts/dados_exemplo.py</code> na raiz do repositório.
        </p>
      </Bloco>

      <Bloco titulo="Regras do Figma que valem para todos">
        <ul className="vt-lista">
          <li>Um único botão Primário (laranja) por tela.</li>
          <li>Status sempre com texto, nunca só cor.</li>
          <li>Rótulo do campo sempre visível, nunca só o texto de exemplo.</li>
          <li>
            Celular: botões e campos de 48 px, margem de 16 px, texto de 16 px. PC: 40 px, 32 px e 14 px (já é
            automático).
          </li>
          <li>Ícones da Lucide: 20 px em botões e listas, 24 px na navegação, 16 px junto de texto pequeno.</li>
          <li>Nunca inventar número na tela: todo valor vem do backend.</li>
        </ul>
      </Bloco>
    </PaginaSecao>
  )
}
