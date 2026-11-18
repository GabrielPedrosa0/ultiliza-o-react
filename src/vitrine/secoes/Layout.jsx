import PaginaSecao, { Bloco } from '../partes/PaginaSecao'
import Exemplo from '../partes/Exemplo'
import Moldura from '../partes/Moldura'
import BlocoCodigo from '../partes/BlocoCodigo'
import TabelaProps from '../partes/TabelaProps'

const L = 'components/layout/'

export function SecLayout() {
  return (
    <PaginaSecao
      grupo="Layout"
      titulo="Moldura do app"
      descricao="O LayoutPrincipal envolve todas as telas internas: no PC, menu lateral escuro + barra superior com a busca; no celular, a barra de abas embaixo. A tela entra no meio (<Outlet />). Abaixo, o app de verdade rodando nas duas larguras."
      arquivos={[
        `${L}LayoutPrincipal.jsx`,
        `${L}MenuLateral.jsx`,
        `${L}BarraSuperior.jsx`,
        `${L}BarraAbas.jsx`,
        `${L}CabecalhoPagina.jsx`,
        `${L}RodapeAcoes.jsx`,
        `${L}Logo.jsx`,
        `${L}itensMenu.js`,
        `${L}layout.css`,
        'routes/AppRoutes.jsx',
      ]}
      responsavel="Integrante 6"
    >
      <div className="vt-molduras">
        <Moldura rota="/" tipo="pc" />
        <Moldura rota="/" tipo="celular" />
      </div>

      <Exemplo
        titulo="Esqueleto de toda página"
        descricao="CabecalhoPagina (título + ações) e o conteúdo dentro de .pagina. No celular o cabeçalho vira a barra branca do topo."
        codigo={`
import { Plus } from 'lucide-react'
import CabecalhoPagina from '../../components/layout/CabecalhoPagina'
import RodapeAcoes from '../../components/layout/RodapeAcoes'
import Botao from '../../components/ui/Botao'

export default function ListaClientesPage() {
  return (
    <>
      <CabecalhoPagina
        titulo="Clientes"
        acoes={<Botao icone={Plus}>Novo cliente</Botao>}   {/* só PC */}
      />
      <div className="pagina">
        ...conteúdo...
      </div>
      <RodapeAcoes soCelular>                                {/* barra fixa embaixo, só celular */}
        <Botao icone={Plus} larguraTotal>Novo cliente</Botao>
      </RodapeAcoes>
    </>
  )
}

// Tela de detalhe, com voltar e ações diferentes no celular:
<CabecalhoPagina
  titulo={\`OS \${os.id}\`}
  voltarPara={-1}                                          {/* -1 = voltar no histórico */}
  acoes={<Botao variante="secundario" icone={Printer}>Imprimir</Botao>}
  acoesCelular={<Botao variante="fantasma" icone={EllipsisVertical} aria-label="Mais ações" />}
/>`}
      />

      <Bloco titulo="Adicionar uma tela nova">
        <BlocoCodigo
          titulo="routes/AppRoutes.jsx + components/layout/itensMenu.js"
          codigo={`
// 1. routes/AppRoutes.jsx, dentro de <Route element={<LayoutPrincipal />}>:
<Route path="agenda" element={<AgendaPage />} />

// 2. Se aparece no menu, em components/layout/itensMenu.js:
{ para: '/agenda', rotulo: 'Agenda', icone: CalendarDays },          // ITENS_MENU (PC)
{ para: '/agenda', rotulo: 'Agenda', descricao: 'OS por dia', icone: CalendarDays },  // ITENS_MAIS (celular)
// Só para um perfil:  { ..., perfis: ['GERENTE'] }
// ABAS_CELULAR tem no máximo 5 abas; o resto vai para "Mais".`}
        />
      </Bloco>

      <Bloco titulo="Propriedades do CabecalhoPagina">
        <TabelaProps
          linhas={[
            ['titulo', 'string', '', 'Título da tela (H1 no PC, barra do topo no celular).'],
            ['tituloCelular', 'string', '', 'Outro título no celular (ex.: Painel / Início).'],
            ['subtitulo', 'string', '', 'Linha de apoio (só PC).'],
            ['voltarPara', 'string | -1', '', 'Mostra a seta de voltar.'],
            ['acoes', 'elemento', '', 'Botões à direita, só no PC.'],
            ['acoesCelular', 'elemento', '', 'Botões à direita, só no celular (ex.: ⋮).'],
            ['extra', 'elemento', '', 'Algo embaixo do título (ex.: filtros).'],
          ]}
        />
      </Bloco>
    </PaginaSecao>
  )
}

const TELAS = [
  [
    'Painel / Início',
    '/',
    'PainelPage, tela real do projeto ligada ao backend (modelo de referência), com “Mecânicos em expediente”.',
    'pages/Painel/PainelPage.jsx',
  ],
  [
    'Ordens de serviço',
    '/exemplo/ordens',
    'Exemplo de composição: busca, filtros, cartões e tabela. Clique numa OS.',
    'vitrine/exemplos/ExemploListaOrdens.jsx',
  ],
  [
    'Detalhe da OS',
    '/exemplo/ordens/primeira',
    'Exemplo de composição do Figma: Serviços e Peças com subtotais, Apontamentos, e à direita Ordem de serviço, Veículo e Cliente. Abre a primeira OS que existir (com o backend real também).',
    'vitrine/exemplos/ExemploDetalheOS.jsx',
  ],
  [
    'Mecânicos',
    '/exemplo/mecanicos',
    'Exemplo de composição: Tabela no PC, lista com avatar no celular, expediente e OS em serviço.',
    'vitrine/exemplos/ExemploMecanicos.jsx',
  ],
  [
    'Serviços e peças',
    '/exemplo/pecas',
    'Exemplo de composição: duas telas no PC (Serviços e Peças) e abas no celular; busca e etiqueta de estoque baixo.',
    'vitrine/exemplos/ExemploServicosPecas.jsx',
  ],
  [
    'Novo cliente',
    '/exemplo/clientes/novo',
    'Exemplo de composição: Dados pessoais e Endereço com GrupoCampos, CPF/CNPJ e CEP validados. Clique em Salvar com o nome vazio.',
    'vitrine/exemplos/ExemploNovoCliente.jsx',
  ],
  [
    'Veículos',
    '/veiculos',
    'A tela feita no tutorial do guia (seções 10 e 11): lista com busca por placa e o botão Novo veículo.',
    'vitrine/guia/TutorialListaVeiculos.jsx',
  ],
  [
    'Login',
    '/exemplo/login',
    'Exemplo de composição: validação, erro do backend e authService. Teste com recepcao@oficina.com.br / oficina123.',
    'vitrine/exemplos/ExemploLogin.jsx',
  ],
  [
    'Mais (celular)',
    '/mais',
    'Tela real do projeto: Mecânicos, Serviços, Peças e Usuários, como no Figma.',
    'pages/Mais/MaisPage.jsx',
  ],
  [
    'Tela em construção',
    '/usuarios',
    'Como estão as telas que cada integrante ainda vai fazer.',
    'pages/Usuarios/UsuariosPage.jsx',
  ],
]

export function SecTelas() {
  return (
    <PaginaSecao
      grupo="Layout"
      titulo="Telas completas"
      descricao="Telas inteiras montadas só com os componentes, nas duas larguras, seguindo o Figma do MVP. As de exemplo mostram como os integrantes podem montar as suas: copie, troque os caminhos (tire o /exemplo) e ajuste."
      arquivos={[
        'vitrine/exemplos/ExemploListaOrdens.jsx',
        'vitrine/exemplos/ExemploDetalheOS.jsx',
        'vitrine/exemplos/ExemploMecanicos.jsx',
        'vitrine/exemplos/ExemploServicosPecas.jsx',
        'vitrine/exemplos/ExemploNovoCliente.jsx',
        'vitrine/exemplos/ExemploLogin.jsx',
        'vitrine/exemplos/exemplos.css',
        'pages/Painel/PainelPage.jsx',
        'pages/Painel/painel.css',
      ]}
    >
      {TELAS.map(([titulo, rota, texto, arquivo]) => (
        <Bloco key={rota} titulo={titulo} texto={`${texto} Arquivo: src/${arquivo}`}>
          <div className="vt-molduras">
            <Moldura rota={rota} tipo="pc" />
            <Moldura rota={rota} tipo="celular" />
          </div>
        </Bloco>
      ))}
    </PaginaSecao>
  )
}
