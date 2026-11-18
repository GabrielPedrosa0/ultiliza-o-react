// "Mais" do celular: o que não cabe na barra de abas (especificação 4). Integrante 6.
import { useNavigate } from 'react-router-dom'
import { CalendarDays, LogOut, Package, Settings } from 'lucide-react'
import CabecalhoPagina from '../../components/layout/CabecalhoPagina'
import Cartao from '../../components/ui/Cartao'
import ItemLista from '../../components/ui/ItemLista'
import { sair, usuarioSalvo } from '../../services/authService'

export default function MaisPage() {
  const navigate = useNavigate()
  const usuario = usuarioSalvo()

  return (
    <>
      <CabecalhoPagina titulo="Mais" />
      <div className="pagina">
        {usuario && (
          <Cartao semEspaco>
            <ItemLista avatar={usuario.nome} titulo={usuario.nome} subtitulo={usuario.email} />
          </Cartao>
        )}
        <Cartao semEspaco>
          <ItemLista icone={CalendarDays} titulo="Agenda" para="/agenda" />
          <ItemLista icone={Package} titulo="Estoque" subtitulo="Em breve" para="/estoque" />
          <ItemLista icone={Settings} titulo="Configurações" para="/configuracoes" />
        </Cartao>
        <Cartao semEspaco>
          <ItemLista
            icone={LogOut}
            titulo="Sair"
            onClick={() => {
              sair()
              navigate('/login')
            }}
          />
        </Cartao>
      </div>
    </>
  )
}
