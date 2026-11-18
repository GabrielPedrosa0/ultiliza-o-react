import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CabecalhoPagina from '../../components/layout/CabecalhoPagina'
import RodapeAcoes from '../../components/layout/RodapeAcoes'
import Aviso from '../../components/ui/Aviso'
import Botao from '../../components/ui/Botao'
import Campo from '../../components/ui/Campo'
import Cartao from '../../components/ui/Cartao'
import { useAcao } from '../../hooks/useApi'
import { cadastrarVeiculo } from '../../services/veiculosService'
import { limparPlaca, obrigatorio, validar, validarAno, validarPlaca } from '../../utils/validadores'

const VAZIO = { placa: '', marca: '', modelo: '', ano: '', quilometragem: '' }

export default function FormVeiculoPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState(VAZIO) // os valores de todos os campos
  const [erros, setErros] = useState({}) // { placa: 'Placa inválida...' }
  const { executar, executando, erro } = useAcao(cadastrarVeiculo)

  // Devolve a função que atualiza um campo: mudar('placa') -> (evento) => ...
  const mudar = (campo) => (evento) => setForm({ ...form, [campo]: evento.target.value })

  async function salvar(evento) {
    evento.preventDefault() // não deixa o navegador recarregar a página

    const encontrados = validar({
      placa: validarPlaca(form.placa),
      marca: obrigatorio(form.marca, 'Informe a marca.'),
      modelo: obrigatorio(form.modelo, 'Informe o modelo.'),
      ano: validarAno(form.ano),
    })
    setErros(encontrados)
    if (Object.keys(encontrados).length > 0) return // tem erro: não envia

    const veiculo = await executar({
      ...form,
      placa: limparPlaca(form.placa),
      ano: Number(form.ano),
      quilometragem: Number(form.quilometragem || 0),
    })
    if (veiculo) navigate('/veiculos') // deu certo: volta para a lista
  }

  return (
    <>
      <CabecalhoPagina titulo="Novo veículo" voltarPara="/veiculos" />
      <form className="pagina" onSubmit={salvar} noValidate>
        {erro && <Aviso tom="perigo">{erro.message}</Aviso>}
        <Cartao>
          <Campo rotulo="Placa" value={form.placa} onChange={mudar('placa')} erro={erros.placa} />
          <Campo rotulo="Marca" value={form.marca} onChange={mudar('marca')} erro={erros.marca} />
          <Campo rotulo="Modelo" value={form.modelo} onChange={mudar('modelo')} erro={erros.modelo} />
          <Campo rotulo="Ano" tipo="number" value={form.ano} onChange={mudar('ano')} erro={erros.ano} />
          <Campo
            rotulo="Quilometragem"
            tipo="number"
            opcional
            value={form.quilometragem}
            onChange={mudar('quilometragem')}
          />
        </Cartao>
        <RodapeAcoes>
          <Botao type="submit" carregando={executando}>
            Salvar veículo
          </Botao>
        </RodapeAcoes>
      </form>
    </>
  )
}
