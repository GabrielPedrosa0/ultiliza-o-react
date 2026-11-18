// Usuários. Integrante 6.
// Figma "PC — Usuários". Service: services/usuariosService.js. Perfis: constants/perfis.js.
// Troque o <EmConstrucao> pelo conteúdo da tela. Modelo pronto: pages/Painel/PainelPage.jsx.
import CabecalhoPagina from '../../components/layout/CabecalhoPagina'
import EmConstrucao from '../../components/ui/EmConstrucao'

export default function UsuariosPage() {
  return (
    <>
      <CabecalhoPagina titulo="Usuários" />
      <EmConstrucao
        titulo="Usuários"
        responsavel="Integrante 6"
        descricao="Quem acessa o sistema e com qual perfil (Gerente, Recepção ou Mecânico). Só o Gerente vê esta tela."
      />
    </>
  )
}
