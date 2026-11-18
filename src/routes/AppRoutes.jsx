// Endereços das telas. Integrante 6.
// Para criar uma tela nova: crie a página em pages/, acrescente a <Route> aqui e,
// se ela aparece no menu, acrescente também em components/layout/itensMenu.js.
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LayoutPrincipal from '../components/layout/LayoutPrincipal'
import CabecalhoPagina from '../components/layout/CabecalhoPagina'
import EmConstrucao from '../components/ui/EmConstrucao'

import LoginPage from '../pages/Login/LoginPage'
import PainelPage from '../pages/Painel/PainelPage'
import ListaOrdensPage from '../pages/OrdensServico/ListaOrdensPage'
import NovaOrdemPage from '../pages/OrdensServico/NovaOrdemPage'
import DetalheOrdemPage from '../pages/OrdensServico/DetalheOrdemPage'
import ListaClientesPage from '../pages/Clientes/ListaClientesPage'
import DetalheClientePage from '../pages/Clientes/DetalheClientePage'
import ListaVeiculosPage from '../pages/Veiculos/ListaVeiculosPage'
import FormVeiculoPage from '../pages/Veiculos/FormVeiculoPage'
import AgendaPage from '../pages/Agenda/AgendaPage'
import MaisPage from '../pages/Mais/MaisPage'
import NaoEncontradaPage from '../pages/NaoEncontrada/NaoEncontradaPage'

// Telas da versão 2 ou ainda sem desenho no Figma.
function EmBreve({ titulo, descricao }) {
  return (
    <>
      <CabecalhoPagina titulo={titulo} />
      <EmConstrucao titulo={titulo} descricao={descricao} />
    </>
  )
}

// As rotas sem o roteador: a vitrine de componentes reaproveita isto dentro do roteador dela.
export function RotasApp() {
  return (
    <Routes>
      {/* Fora do layout: tela cheia, sem menu */}
      <Route path="/login" element={<LoginPage />} />

      {/* Dentro do layout: menu lateral (PC) e abas (celular) */}
      <Route element={<LayoutPrincipal />}>
        <Route index element={<PainelPage />} />

        <Route path="ordens" element={<ListaOrdensPage />} />
        <Route path="ordens/nova" element={<NovaOrdemPage />} />
        <Route path="ordens/:id" element={<DetalheOrdemPage />} />

        <Route path="clientes" element={<ListaClientesPage />} />
        <Route path="clientes/:id" element={<DetalheClientePage />} />

        <Route path="veiculos" element={<ListaVeiculosPage />} />
        <Route path="veiculos/novo" element={<FormVeiculoPage />} />
        <Route path="veiculos/:id/editar" element={<FormVeiculoPage />} />

        <Route path="agenda" element={<AgendaPage />} />
        <Route path="mais" element={<MaisPage />} />
        <Route
          path="estoque"
          element={<EmBreve titulo="Estoque" descricao="Fica para a versão 2: peças, quantidades, mínimo e preço." />}
        />
        <Route
          path="configuracoes"
          element={<EmBreve titulo="Configurações" descricao="Dados da oficina e usuários (só o Gerente)." />}
        />

        <Route path="*" element={<NaoEncontradaPage />} />
      </Route>
    </Routes>
  )
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <RotasApp />
    </BrowserRouter>
  )
}
