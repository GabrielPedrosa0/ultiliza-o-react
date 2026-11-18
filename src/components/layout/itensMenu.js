// Itens do menu lateral (PC) e das abas (celular). Integrante 6.
// Para incluir uma tela no menu, acrescente aqui e crie a rota em routes/AppRoutes.jsx.
import { CalendarDays, Car, ClipboardList, LayoutDashboard, Menu, Package, Settings, Users } from 'lucide-react'

// Menu lateral do PC. `emBreve` mostra a etiqueta "Em breve" (telas da versão 2).
export const ITENS_MENU = [
  { para: '/', rotulo: 'Painel', icone: LayoutDashboard },
  { para: '/ordens', rotulo: 'Ordens de serviço', icone: ClipboardList },
  { para: '/clientes', rotulo: 'Clientes', icone: Users },
  { para: '/veiculos', rotulo: 'Veículos', icone: Car },
  { para: '/estoque', rotulo: 'Estoque', icone: Package, emBreve: true },
  { para: '/agenda', rotulo: 'Agenda', icone: CalendarDays },
]

// Fica no rodapé do menu lateral.
export const ITEM_CONFIGURACOES = { para: '/configuracoes', rotulo: 'Configurações', icone: Settings }

// Barra de abas do celular: no máximo 5. Veículos ocupa o lugar de Estoque (versão 2),
// porque o CRUD de veículo é obrigatório no N695. O resto fica em "Mais".
export const ABAS_CELULAR = [
  { para: '/', rotulo: 'Início', icone: LayoutDashboard },
  { para: '/ordens', rotulo: 'Ordens', icone: ClipboardList },
  { para: '/clientes', rotulo: 'Clientes', icone: Users },
  { para: '/veiculos', rotulo: 'Veículos', icone: Car },
  { para: '/mais', rotulo: 'Mais', icone: Menu },
]
