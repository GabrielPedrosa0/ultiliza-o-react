// Login. Integrante 5.
// Troque o <EmConstrucao> pela tela do Figma. O que já existe para usar:
//   - authService.entrar(email, senha): faz o login e guarda o token (api.js manda ele sozinho depois)
//   - <Campo tipo="senha" />, <Aviso tom="perigo">, <Botao larguraTotal carregando={...}>
//   - validarEmail / validarSenha em utils/validadores.js
import EmConstrucao from '../../components/ui/EmConstrucao'

export default function LoginPage() {
  return (
    <EmConstrucao
      titulo="Entrar"
      responsavel="Integrante 5"
      descricao="PC: painel escuro com a frase “Ordens de serviço, clientes, mecânicos e peças em um só lugar.” e o formulário à direita. Celular: só o formulário. Ajuda: “Use o e-mail e a senha cadastrados pelo gerente.” e o link Esqueci minha senha."
    />
  )
}
