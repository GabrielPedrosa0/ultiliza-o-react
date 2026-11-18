// Tabela de propriedades: [nome, tipo, padrão, descrição]
export default function TabelaProps({ linhas }) {
  return (
    <div className="vt-props">
      <table>
        <thead>
          <tr>
            <th>Propriedade</th>
            <th>Tipo</th>
            <th>Padrão</th>
            <th>Para que serve</th>
          </tr>
        </thead>
        <tbody>
          {linhas.map(([nome, tipo, padrao, descricao]) => (
            <tr key={nome}>
              <td>
                <code>{nome}</code>
              </td>
              <td>
                <code className="vt-props__tipo">{tipo}</code>
              </td>
              <td>{padrao ? <code>{padrao}</code> : '—'}</td>
              <td>{descricao}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
