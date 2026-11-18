// Novo mecânico. Integrante 4.
// Figma "Celular — Novo mecânico". Validação: validarCpfCnpj e validarExpediente em utils/validadores.js.
// Troque o <EmConstrucao> pelo conteúdo da tela. Modelo pronto: pages/Painel/PainelPage.jsx.
import CabecalhoPagina from '../../components/layout/CabecalhoPagina'
import EmConstrucao from '../../components/ui/EmConstrucao'

export default function FormMecanicoPage() {
  return (
    <>
      <CabecalhoPagina titulo="Novo mecânico" voltarPara="/mecanicos" />
      <EmConstrucao
        titulo="Novo mecânico"
        responsavel="Integrante 4"
        descricao="Nome, CPF, telefone e expediente (início e fim). Botão Salvar mecânico."
      />
    </>
  )
}
