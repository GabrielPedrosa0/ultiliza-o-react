import { useState } from 'react'
import PaginaSecao, { Bloco } from '../partes/PaginaSecao'
import Exemplo from '../partes/Exemplo'
import Campo from '../../components/ui/Campo'
import SeloStatus from '../../components/ui/SeloStatus'
import * as F from '../../utils/formatadores'
import * as V from '../../utils/validadores'
import { ACAO_PRINCIPAL, LISTA_STATUS, TRANSICOES } from '../../constants/statusOS'

const agora = new Date()
const hojeAs17 = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate(), 17)
const amanha = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate() + 1, 10)

const EXEMPLOS_FORMATO = [
  ['formatarMoeda(1250)', F.formatarMoeda(1250)],
  ['formatarMoedaCurta(18240)', F.formatarMoedaCurta(18240)],
  ['formatarCentavos(34000)', F.formatarCentavos(34000)],
  ["formatarPlaca('qrs-4f21')", F.formatarPlaca('qrs-4f21')],
  ["formatarTelefone('85900000001')", F.formatarTelefone('85900000001')],
  ['formatarKm(82300)', F.formatarKm(82300)],
  ["plural(2, 'veículo')", F.plural(2, 'veículo')],
  ['formatarPrevisao(hoje 17h)', F.formatarPrevisao(hojeAs17)],
  ["formatarPrevisao(hoje 17h, { separador: ' ' })", F.formatarPrevisao(hojeAs17, { separador: ' ' })],
  ['formatarPrevisao(amanhã)', F.formatarPrevisao(amanha)],
  ['formatarPrevisao(null)', F.formatarPrevisao(null)],
  ['formatarMomento(hoje 17h)', F.formatarMomento(hojeAs17)],
  ["formatarData('2026-11-11T08:10:00')", F.formatarData('2026-11-11T08:10:00')],
  ['paraDataSemFuso(new Date())', F.paraDataSemFuso(agora)],
  ["deCampoDataHora('2026-11-11T17:00')", F.deCampoDataHora('2026-11-11T17:00')],
  ["iniciais('Marina Souza')", F.iniciais('Marina Souza')],
  ['formatarNumeroOS(1042)', F.formatarNumeroOS(1042)],
  ["linkWhatsApp('(85) 90000-0001', 'Olá')", F.linkWhatsApp('(85) 90000-0001', 'Olá')],
]

export function SecFormatadores() {
  return (
    <PaginaSecao
      grupo="Utilitários"
      titulo="Formatadores"
      descricao="Transformam o dado do backend no texto da tela (especificação 2.3). Nunca formate na mão: assim todo o app mostra igual."
      arquivos={['utils/formatadores.js', 'utils/ordemServico.js']}
    >
      <Bloco>
        <div className="vt-props">
          <table>
            <thead>
              <tr>
                <th>Chamada</th>
                <th>Resultado</th>
              </tr>
            </thead>
            <tbody>
              {EXEMPLOS_FORMATO.map(([chamada, resultado]) => (
                <tr key={chamada}>
                  <td>
                    <code>{chamada}</code>
                  </td>
                  <td>
                    <strong>{resultado}</strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Bloco>
    </PaginaSecao>
  )
}

export function SecValidadores() {
  const [valores, setValores] = useState({
    placa: 'ABC1D2',
    email: 'voce@oficina',
    telefone: '(85) 9000-01',
    senha: '1234',
    ano: '1940',
  })
  const mudar = (c) => (e) => setValores({ ...valores, [c]: e.target.value })
  return (
    <PaginaSecao
      grupo="Utilitários"
      titulo="Validadores"
      descricao="Cada função devolve a mensagem de erro (curta e acionável) ou null. Passe direto para a propriedade erro do Campo. O backend valida de novo; isto só avisa antes de enviar."
      arquivos={['utils/validadores.js']}
    >
      <Exemplo
        titulo="Teste digitando"
        codigo={`
import { validar, validarEmail, validarPlaca, validarTelefone } from '../../utils/validadores'

// Ao enviar o formulário:
const erros = validar({
  placa: validarPlaca(form.placa),
  telefone: validarTelefone(form.telefone),
  email: validarEmail(form.email, { obrigatorio: false }),
})
setErros(erros)
if (Object.keys(erros).length) return      // tem erro: não envia

<Campo rotulo="Placa" value={form.placa} onChange={...} erro={erros.placa} />`}
      >
        <div className="vt-grade-campos">
          <Campo
            rotulo="Placa (validarPlaca)"
            value={valores.placa}
            onChange={mudar('placa')}
            erro={V.validarPlaca(valores.placa)}
            ajuda="Placa válida"
          />
          <Campo
            rotulo="E-mail (validarEmail)"
            value={valores.email}
            onChange={mudar('email')}
            erro={V.validarEmail(valores.email)}
            ajuda="E-mail válido"
          />
          <Campo
            rotulo="Telefone (validarTelefone)"
            value={valores.telefone}
            onChange={mudar('telefone')}
            erro={V.validarTelefone(valores.telefone)}
            ajuda="Telefone válido"
          />
          <Campo
            rotulo="Senha (validarSenha)"
            tipo="senha"
            value={valores.senha}
            onChange={mudar('senha')}
            erro={V.validarSenha(valores.senha)}
            ajuda="Senha válida"
          />
          <Campo
            rotulo="Ano (validarAno)"
            tipo="number"
            value={valores.ano}
            onChange={mudar('ano')}
            erro={V.validarAno(valores.ano)}
            ajuda="Ano válido"
          />
        </div>
      </Exemplo>
    </PaginaSecao>
  )
}

export function SecStatus() {
  return (
    <PaginaSecao
      grupo="Utilitários"
      titulo="Status da OS"
      descricao="Os 6 status com o código do backend, o texto, a cor, para onde cada um pode ir e o botão principal do Detalhe. Cancelado já está aqui, esperando o backend (Integrante 3)."
      arquivos={['constants/statusOS.js']}
    >
      <Bloco>
        <div className="vt-props">
          <table>
            <thead>
              <tr>
                <th>Código</th>
                <th>Selo</th>
                <th>Filtro</th>
                <th>Pode ir para</th>
                <th>Botão principal</th>
              </tr>
            </thead>
            <tbody>
              {LISTA_STATUS.map((s) => (
                <tr key={s.valor}>
                  <td>
                    <code>{s.valor}</code>
                  </td>
                  <td>
                    <SeloStatus status={s.valor} />
                  </td>
                  <td>{s.rotuloFiltro}</td>
                  <td>
                    {TRANSICOES[s.valor].map((t) => LISTA_STATUS.find((x) => x.valor === t).rotulo).join(', ') || '—'}
                  </td>
                  <td>{ACAO_PRINCIPAL[s.valor]?.rotulo ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Bloco>
    </PaginaSecao>
  )
}
