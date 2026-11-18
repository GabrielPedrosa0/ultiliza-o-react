// Novo cliente. Integrante 5.
// Figma "PC — Novo cliente" e "Celular — Novo cliente". Componentes: GrupoCampos e Campo. Validação: validarCpfCnpj e validarCep.
// Troque o <EmConstrucao> pelo conteúdo da tela. Modelo pronto: pages/Painel/PainelPage.jsx.
import CabecalhoPagina from '../../components/layout/CabecalhoPagina'
import EmConstrucao from '../../components/ui/EmConstrucao'

export default function FormClientePage() {
  return (
    <>
      <CabecalhoPagina titulo="Novo cliente" voltarPara="/clientes" />
      <EmConstrucao
        titulo="Novo cliente"
        responsavel="Integrante 5"
        descricao="Dados pessoais (nome, CPF ou CNPJ, telefone, e-mail) e endereço (CEP, rua, número, complemento, bairro, cidade, UF)."
      />
    </>
  )
}
