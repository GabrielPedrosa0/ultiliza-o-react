// EXEMPLO DE COMPOSIÇÃO — tela de Login (especificação 3.1).
// Integrante 5: pode copiar para pages/Login/LoginPage.jsx (e o CSS para login.css).
// Usuário de teste do backend: recepcao@oficina.com.br / oficina123
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '../../components/layout/Logo'
import Aviso from '../../components/ui/Aviso'
import Botao from '../../components/ui/Botao'
import Campo from '../../components/ui/Campo'
import { useAcao } from '../../hooks/useApi'
import { entrar } from '../../services/authService'
import { validar, validarEmail, validarSenha } from '../../utils/validadores'
import './exemplos.css'

export default function ExemploLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erros, setErros] = useState({})
  const login = useAcao(entrar)

  async function enviar(e) {
    e.preventDefault()
    const encontrados = validar({ email: validarEmail(email), senha: validarSenha(senha) })
    setErros(encontrados)
    if (Object.keys(encontrados).length) return
    if (await login.executar(email.trim(), senha)) navigate('/')
  }

  return (
    <div className="login">
      <aside className="login__marca so-pc">
        <Logo />
        <div>
          <p className="login__frase">Ordens de serviço, clientes, mecânicos e peças em um só lugar.</p>
          <p className="login__apoio">
            Acompanhe cada veículo da entrada à entrega, com tudo o que foi feito registrado.
          </p>
        </div>
      </aside>

      <main className="login__area">
        <form className="login__form" onSubmit={enviar} noValidate>
          <div className="so-celular">
            <Logo claro={false} />
          </div>
          <div>
            <h1 className="t-h2">Entrar</h1>
            <p className="texto-secundario">Use o e-mail e a senha cadastrados pelo gerente.</p>
          </div>

          {login.erro && <Aviso tom="perigo">{login.erro.message}</Aviso>}

          <Campo
            rotulo="E-mail"
            tipo="email"
            autoComplete="username"
            placeholder="voce@oficina.com.br"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            erro={erros.email}
          />
          <Campo
            rotulo="Senha"
            tipo="senha"
            autoComplete="current-password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            erro={erros.senha}
          />
          <Botao type="submit" larguraTotal carregando={login.executando}>
            Entrar
          </Botao>
          <Botao variante="fantasma" larguraTotal>
            Esqueci minha senha
          </Botao>
        </form>
      </main>
    </div>
  )
}
