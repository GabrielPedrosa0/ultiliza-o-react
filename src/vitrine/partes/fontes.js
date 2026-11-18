// Todo o código-fonte do projeto como texto, para mostrar e copiar na vitrine.
// A chave é o caminho a partir de src/, ex.: 'components/ui/Botao.jsx'.
const arquivos = import.meta.glob(
  [
    '../../components/**/*.{js,jsx,css}',
    '../../styles/*.css',
    '../../utils/*.js',
    '../../constants/*.js',
    '../../hooks/*.js',
    '../../services/*.js',
    '../../routes/*.jsx',
    '../../pages/**/*.{jsx,css}',
    '../exemplos/*.{jsx,css}',
  ],
  { query: '?raw', import: 'default', eager: true },
)

export const FONTES = Object.fromEntries(
  Object.entries(arquivos).map(([caminho, texto]) => [
    caminho.replace('../../', '').replace('../exemplos/', 'vitrine/exemplos/'),
    texto,
  ]),
)
