// Rotas das telas de exemplo (só existem na vitrine).
import { Route, Routes } from 'react-router-dom'
import LayoutPrincipal from '../components/layout/LayoutPrincipal'
import ExemploLogin from './exemplos/ExemploLogin'
import ExemploListaOrdens from './exemplos/ExemploListaOrdens'
import ExemploDetalheOS from './exemplos/ExemploDetalheOS'
import ExemploMecanicos from './exemplos/ExemploMecanicos'
import ExemploServicosPecas from './exemplos/ExemploServicosPecas'
import ExemploNovoCliente from './exemplos/ExemploNovoCliente'

export default function RotasExemplo() {
  return (
    <Routes>
      <Route path="login" element={<ExemploLogin />} />
      <Route element={<LayoutPrincipal />}>
        <Route path="ordens" element={<ExemploListaOrdens />} />
        <Route path="ordens/:id" element={<ExemploDetalheOS />} />
        <Route path="mecanicos" element={<ExemploMecanicos />} />
        <Route path="servicos" element={<ExemploServicosPecas aba="servicos" />} />
        <Route path="pecas" element={<ExemploServicosPecas aba="pecas" />} />
        <Route path="clientes/novo" element={<ExemploNovoCliente />} />
      </Route>
    </Routes>
  )
}
