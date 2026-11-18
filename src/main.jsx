// Entrada da VITRINE. A mesma página abre em dois modos:
//  - a vitrine (navegação + seções);
//  - o app de verdade (rotas do projeto), usado dentro das molduras de PC e celular.
// Ver vitrine/ambiente.js para o porquê de usar MemoryRouter.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { appPedido, guardarHtmlOriginal, secaoDoEndereco } from './vitrine/ambiente'
import './styles/global.css'
import './vitrine/vitrine.css'
import { instalarApiDeExemplo, trocarModo } from './vitrine/apiExemplo'
import { RotasApp } from './routes/AppRoutes'
import Vitrine from './vitrine/Vitrine'
import RotasExemplo from './vitrine/RotasExemplo'
import LayoutPrincipal from './components/layout/LayoutPrincipal'
import TutorialListaVeiculos from './vitrine/guia/TutorialListaVeiculos'
import TutorialFormVeiculo from './vitrine/guia/TutorialFormVeiculo'

guardarHtmlOriginal()
instalarApiDeExemplo()

const app = appPedido()
if (app?.modo) trocarModo(app.modo, { soNestaJanela: true })

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {app ? (
      <MemoryRouter initialEntries={[app.rota]}>
        <Routes>
          <Route path="/exemplo/*" element={<RotasExemplo />} />
          {/* Na vitrine, as telas de veículos são as do tutorial do guia (seções 10 e 11) */}
          <Route
            path="/veiculos"
            element={
              <LayoutPrincipal>
                <TutorialListaVeiculos />
              </LayoutPrincipal>
            }
          />
          <Route
            path="/veiculos/novo"
            element={
              <LayoutPrincipal>
                <TutorialFormVeiculo />
              </LayoutPrincipal>
            }
          />
          <Route path="/*" element={<RotasApp />} />
        </Routes>
      </MemoryRouter>
    ) : (
      <MemoryRouter initialEntries={[`/${secaoDoEndereco() ?? ''}`]}>
        <Vitrine />
      </MemoryRouter>
    )}
  </StrictMode>,
)
