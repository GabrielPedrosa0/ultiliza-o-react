# Guia do frontend e vitrine de componentes — Oficina App

Site para o grupo **aprender, ver, testar e copiar** o frontend do projeto `oficina-mecanica-os`
(sistema de ordens de serviço para oficina mecânica, React + Vite e FastAPI).

- **Guia do frontend** (topo do menu): React do zero para quem nunca mexeu com frontend, em 14 seções, com exemplos
  funcionando ao vivo e duas telas feitas passo a passo.
- **Vitrine de componentes**: todos os componentes do projeto funcionando, com “Copiar uso”, “Copiar arquivo” e a
  tabela de propriedades. Cores, fontes e ícones do Figma; telas completas no PC e no celular lado a lado.

O site é estático (só HTML, CSS e JavaScript) e usa **dados de exemplo**: não precisa de backend nem de banco.

---

## Rodar no computador

Precisa do [Node.js 22](https://nodejs.org).

```bash
npm install
npm run dev          # http://localhost:5174
```

Rodando no computador aparece, no topo, a opção **Backend real**: com o FastAPI do projeto ligado em
`http://127.0.0.1:8000`, a vitrine passa a usar os dados de verdade e mostra **Conectado** ou **Backend desligado**
(com os comandos para ligar). No site publicado ela usa sempre os de exemplo: lá não existe backend em `/api`.

Para ligar o backend (no repositório `oficina-mecanica-os`):

```bash
cd backend
python3 -m venv .venv && source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt                      # inclui o uvicorn
uvicorn app:app --reload
python ../scripts/dados_exemplo.py                   # em outro terminal: dados do Figma
```

| Comando | O que faz |
|---|---|
| `npm run dev` | Site no computador, atualizando a cada arquivo salvo |
| `npm run build` | Gera o site pronto em `dist/` (é o que a Vercel e o GitHub Pages publicam) |
| `npm run preview` | Abre o `dist/` para conferir antes de publicar |
| `npm run arquivo` | Gera **um único** `dist/index.html` com tudo dentro (abre sem servidor, dá para mandar por WhatsApp) |
| `npm run sincronizar` | Puxa o código e o guia mais novos do repositório do projeto (veja “Atualizar”) |
| `npm run lint` | Confere o código |

---

## Publicar

### 1. Criar o repositório no GitHub

```bash
git init
git add .
git commit -m "Guia do frontend e vitrine de componentes"
git branch -M main
git remote add origin https://github.com/USUARIO/oficina-guia-frontend.git   # crie o repositório vazio antes, no site
git push -u origin main
```

Depois escolha **um** dos dois jeitos abaixo (os dois são grátis).

### 2a. Pela Vercel (mais simples)

1. Entre em https://vercel.com com a conta do GitHub.
2. **Add New → Project**, escolha o repositório `oficina-guia-frontend` e clique em **Deploy**.
   O `vercel.json` já diz tudo que ela precisa (Vite, `npm run build`, pasta `dist`).
3. Em cerca de 1 minuto sai o link `https://oficina-guia-frontend.vercel.app` (ou parecido).

Cada `git push` na `main` publica de novo sozinho, e cada Pull Request ganha um link de prévia.

### 2b. Pelo próprio GitHub (GitHub Pages)

1. No repositório: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Faça um `git push` (ou, na aba **Actions**, abra “Publicar no GitHub Pages” e clique em **Run workflow**).
3. Quando o workflow ficar verde, o site está em `https://USUARIO.github.io/oficina-guia-frontend/`.

O workflow fica em `.github/workflows/github-pages.yml`: instala, confere o código, gera o `dist/` e publica.
Cada `git push` na `main` publica de novo.

> Repositório **privado** só pode usar o GitHub Pages em planos pagos. Se o repositório for privado, use a Vercel.

### Links para mandar no grupo

Cada seção tem endereço próprio:

- `.../#1-comece-aqui` — começo do guia
- `.../#10-sua-primeira-tela-passo-a-passo` — tutorial da primeira tela
- `.../#botao`, `.../#campo`, `.../#telas` — componentes e telas completas

---

## Atualizar

Os componentes vêm do repositório do projeto. Com os dois repositórios lado a lado
(`oficina-mecanica-os/` e `oficina-guia-frontend/` na mesma pasta):

```bash
npm run sincronizar      # copia frontend/src e docs/guia_frontend.md do projeto
npm run dev              # confira
git add . && git commit -m "Atualiza componentes e guia" && git push    # publica de novo
```

Outro caminho: `npm run sincronizar -- caminho/até/oficina-mecanica-os/frontend/src`.

---

## Como é montado

```
src/
├── components/ styles/ utils/ constants/ hooks/ services/ routes/ pages/
│                       cópias exatas do frontend do projeto (não edite aqui: edite lá e sincronize)
└── vitrine/            só deste site
    ├── guia/           o guia: guia_frontend.md (cópia do docs/ do projeto), demonstrações ao vivo
    │                   (Demos.jsx) e as duas telas do tutorial
    ├── secoes/         as páginas da vitrine (fundações, componentes, layout, backend, utilitários)
    ├── exemplos/       telas de exemplo (Lista de OS, Detalhe da OS, Login) para os integrantes copiarem
    ├── apiExemplo.js   “backend de mentira” com os dados do Figma
    └── ambiente.js     navegação que funciona em qualquer endereço (site, arquivo local, iframe)
```

- Cada `## ` do `guia_frontend.md` vira uma seção do menu; `<!-- demo:nome -->` vira um exemplo ao vivo.
- As molduras de PC e celular abrem o app de verdade num iframe com a largura certa (1440 px e 390 px).
- O `.prettierignore` impede o `npm run formatar` de mexer no texto do guia.
