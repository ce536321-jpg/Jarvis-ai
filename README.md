# JARVIS AI — versão Web

Assistente pessoal futurista em formato de site.

## Rodar localmente

Requisitos: Node.js 20+

```bash
npm install
cp .env.example .env
# preencha OPENAI_API_KEY
npm start
```

Abra `http://localhost:3000`.

## Publicar
Veja `GUIA_PUBLICAR.md`. O projeto já inclui `render.yaml` para facilitar o deploy.

## Segurança
A chave da API deve permanecer no servidor, em variável de ambiente. Não coloque segredos no navegador.
