// Rotas das telas de exemplo (só existem na vitrine).
import { Route, Routes } from 'react-router-dom'
import LayoutPrincipal from '../components/layout/LayoutPrincipal'
import ExemploLogin from './exemplos/ExemploLogin'
import ExemploListaOrdens from './exemplos/ExemploListaOrdens'
import ExemploDetalheOS from './exemplos/ExemploDetalheOS'

export default function RotasExemplo() {
  return (
    <Routes>
      <Route path="login" element={<ExemploLogin />} />
      <Route element={<LayoutPrincipal />}>
        <Route path="ordens" element={<ExemploListaOrdens />} />
        <Route path="ordens/:id" element={<ExemploDetalheOS />} />
      </Route>
    </Routes>
  )
}
