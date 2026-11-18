// Endereços das telas. Integrante 6.
// Para criar uma tela nova: crie a página em pages/, acrescente a <Route> aqui e,
// se ela aparece no menu, acrescente também em components/layout/itensMenu.js.
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import LayoutPrincipal from '../components/layout/LayoutPrincipal'

import LoginPage from '../pages/Login/LoginPage'
import PainelPage from '../pages/Painel/PainelPage'
import ListaOrdensPage from '../pages/OrdensServico/ListaOrdensPage'
import NovaOrdemPage from '../pages/OrdensServico/NovaOrdemPage'
import DetalheOrdemPage from '../pages/OrdensServico/DetalheOrdemPage'
import ListaClientesPage from '../pages/Clientes/ListaClientesPage'
import DetalheClientePage from '../pages/Clientes/DetalheClientePage'
import FormClientePage from '../pages/Clientes/FormClientePage'
import ListaVeiculosPage from '../pages/Veiculos/ListaVeiculosPage'
import FormVeiculoPage from '../pages/Veiculos/FormVeiculoPage'
import ListaMecanicosPage from '../pages/Mecanicos/ListaMecanicosPage'
import FormMecanicoPage from '../pages/Mecanicos/FormMecanicoPage'
import ServicosPage from '../pages/Servicos/ServicosPage'
import PecasPage from '../pages/Pecas/PecasPage'
import UsuariosPage from '../pages/Usuarios/UsuariosPage'
import AgendaPage from '../pages/Agenda/AgendaPage'
import MaisPage from '../pages/Mais/MaisPage'
import NaoEncontradaPage from '../pages/NaoEncontrada/NaoEncontradaPage'

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
        <Route path="clientes/novo" element={<FormClientePage />} />
        <Route path="clientes/:id" element={<DetalheClientePage />} />
        <Route path="clientes/:id/editar" element={<FormClientePage />} />

        <Route path="veiculos" element={<ListaVeiculosPage />} />
        <Route path="veiculos/novo" element={<FormVeiculoPage />} />
        <Route path="veiculos/:id/editar" element={<FormVeiculoPage />} />

        <Route path="mecanicos" element={<ListaMecanicosPage />} />
        <Route path="mecanicos/novo" element={<FormMecanicoPage />} />
        <Route path="mecanicos/:id/editar" element={<FormMecanicoPage />} />

        <Route path="servicos" element={<ServicosPage />} />
        <Route path="pecas" element={<PecasPage />} />
        <Route path="usuarios" element={<UsuariosPage />} />
        <Route path="mais" element={<MaisPage />} />

        {/* Fora do menu do MVP, mas a rota continua para quem quiser fazer depois. */}
        <Route path="agenda" element={<AgendaPage />} />
        {/* Endereços antigos: levam para as telas novas do Figma. */}
        <Route path="estoque" element={<Navigate to="/pecas" replace />} />
        <Route path="configuracoes" element={<Navigate to="/usuarios" replace />} />

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
