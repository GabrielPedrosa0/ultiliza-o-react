// EXEMPLO DE COMPOSIÇÃO — "Novo cliente" (Figma "PC — Novo cliente" e "Celular — Novo cliente").
// Integrante 5: pode copiar para pages/Clientes/FormClientePage.jsx e ajustar.
// Dados pessoais + Endereço com GrupoCampos; valida no navegador antes de mandar ao backend.
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CabecalhoPagina from '../../components/layout/CabecalhoPagina'
import RodapeAcoes from '../../components/layout/RodapeAcoes'
import Aviso from '../../components/ui/Aviso'
import Botao from '../../components/ui/Botao'
import Campo from '../../components/ui/Campo'
import Cartao from '../../components/ui/Cartao'
import GrupoCampos from '../../components/ui/GrupoCampos'
import { useAcao } from '../../hooks/useApi'
import { cadastrarCliente } from '../../services/clientesService'
import { formatarCep, formatarCpfCnpj, formatarTelefone } from '../../utils/formatadores'
import { obrigatorio, validar, validarCep, validarCpfCnpj, validarEmail } from '../../utils/validadores'
import './exemplos.css'

const VAZIO = {
  nome: '',
  cpf_cnpj: '',
  telefone: '',
  email: '',
  cep: '',
  rua: '',
  numero: '',
  complemento: '',
  bairro: '',
  cidade: '',
  uf: '',
}

export default function ExemploNovoCliente() {
  const navigate = useNavigate()
  const [dados, setDados] = useState(VAZIO)
  const [erros, setErros] = useState({})
  const { executar, executando, erro, limparErro } = useAcao(cadastrarCliente)

  const mudar = (campo, formatar) => (e) =>
    setDados({ ...dados, [campo]: formatar ? formatar(e.target.value) : e.target.value })

  async function salvar(e) {
    e.preventDefault()
    const encontrados = validar({
      nome: obrigatorio(dados.nome, 'Informe o nome.'),
      cpf_cnpj: dados.cpf_cnpj ? validarCpfCnpj(dados.cpf_cnpj) : null,
      telefone: obrigatorio(dados.telefone, 'Informe o telefone.'),
      email: dados.email ? validarEmail(dados.email) : null,
      cep: dados.cep ? validarCep(dados.cep) : null,
    })
    setErros(encontrados)
    if (Object.keys(encontrados).length) return
    const salvo = await executar({ ...dados, uf: dados.uf.toUpperCase() || null, email: dados.email || null })
    if (salvo) navigate(`/clientes/${salvo.id}`)
  }

  return (
    <>
      <CabecalhoPagina titulo="Novo cliente" voltarPara={-1} />
      <form className="pagina exemplo-form" onSubmit={salvar} noValidate>
        {erro && (
          <Aviso tom="perigo" titulo="Não foi possível salvar" onFechar={limparErro}>
            {erro.message}
          </Aviso>
        )}
        <Cartao>
          <GrupoCampos titulo="Dados pessoais" colunas={2}>
            <Campo rotulo="Nome" value={dados.nome} onChange={mudar('nome')} erro={erros.nome} className="ocupa-tudo" />
            <Campo
              rotulo="CPF ou CNPJ"
              inputMode="numeric"
              value={dados.cpf_cnpj}
              onChange={mudar('cpf_cnpj', formatarCpfCnpj)}
              erro={erros.cpf_cnpj}
              opcional
            />
            <Campo
              rotulo="Telefone"
              tipo="tel"
              value={dados.telefone}
              onChange={mudar('telefone', formatarTelefone)}
              erro={erros.telefone}
            />
            <Campo
              rotulo="E-mail"
              tipo="email"
              value={dados.email}
              onChange={mudar('email')}
              erro={erros.email}
              opcional
              className="ocupa-tudo"
            />
          </GrupoCampos>
        </Cartao>
        <Cartao>
          <GrupoCampos titulo="Endereço" colunas={3}>
            <Campo
              rotulo="CEP"
              inputMode="numeric"
              value={dados.cep}
              onChange={mudar('cep', formatarCep)}
              erro={erros.cep}
              opcional
            />
            <Campo rotulo="Rua" value={dados.rua} onChange={mudar('rua')} className="ocupa-2" opcional />
            <Campo rotulo="Número" value={dados.numero} onChange={mudar('numero')} opcional />
            <Campo
              rotulo="Complemento"
              value={dados.complemento}
              onChange={mudar('complemento')}
              className="ocupa-2"
              opcional
            />
            <Campo rotulo="Bairro" value={dados.bairro} onChange={mudar('bairro')} opcional />
            <Campo rotulo="Cidade" value={dados.cidade} onChange={mudar('cidade')} opcional />
            <Campo rotulo="UF" value={dados.uf} onChange={mudar('uf')} maxLength={2} opcional />
          </GrupoCampos>
        </Cartao>
        <RodapeAcoes>
          <Botao variante="secundario" onClick={() => navigate(-1)}>
            Cancelar
          </Botao>
          <Botao type="submit" carregando={executando}>
            Salvar cliente
          </Botao>
        </RodapeAcoes>
      </form>
    </>
  )
}
