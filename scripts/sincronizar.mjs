// Copia os arquivos do frontend e o guia do projeto para a vitrine, para ela mostrar a versão mais nova.
//   npm run sincronizar                              (procura ../oficina-mecanica-os/frontend/src)
//   npm run sincronizar -- C:/caminho/do/frontend/src
import { cpSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { copyFileSync } from 'node:fs'

const origem = resolve(process.argv[2] ?? '../oficina-mecanica-os/frontend/src')
const PASTAS = ['components', 'styles', 'utils', 'constants', 'hooks', 'services', 'routes', 'pages']

if (!existsSync(origem)) {
  console.error(`Não achei ${origem}. Passe o caminho: npm run sincronizar -- caminho/do/frontend/src`)
  process.exit(1)
}
for (const pasta of PASTAS) {
  if (existsSync(`${origem}/${pasta}`)) cpSync(`${origem}/${pasta}`, `src/${pasta}`, { recursive: true })
}
// O guia (docs/guia_frontend.md do repositório) aparece no começo da vitrine.
const guia = resolve(origem, '../../docs/guia_frontend.md')
if (existsSync(guia)) copyFileSync(guia, 'src/vitrine/guia/guia_frontend.md')
console.log(`Vitrine atualizada a partir de ${origem}`)
