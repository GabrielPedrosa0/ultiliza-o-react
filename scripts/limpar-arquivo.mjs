// Depois do `vite build --mode arquivo`: troca o caractere U+FFFD (que uma biblioteca deixa solto no código)
// pela forma escrita �. Alguns serviços de publicação recusam HTML com esse caractere.
import { readFileSync, writeFileSync } from 'node:fs'

const caminho = 'dist/index.html'
const html = readFileSync(caminho, 'utf8')
writeFileSync(caminho, html.replaceAll('�', '\\uFFFD'))
