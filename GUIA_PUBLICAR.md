# JARVIS — publicar como site

## O que este projeto faz
- Site responsivo para celular e computador
- Chat com o JARVIS
- Entrada e saída por voz
- Memória local
- Núcleo de IA no servidor
- Pronto para hospedagem Node.js

## Publicar pelo celular usando Render + GitHub

1. Crie uma conta no GitHub.
2. Crie um repositório novo, por exemplo `jarvis-ai`.
3. Envie para o repositório TODOS os arquivos desta pasta (não envie apenas o ZIP).
4. Crie uma conta no Render.
5. No Render, escolha para criar um Web Service a partir do seu repositório do GitHub.
6. O Render detectará Node.js. Use:
   - Build Command: `npm install`
   - Start Command: `npm start`
7. Em Environment Variables, adicione:
   - `OPENAI_API_KEY` = sua chave da API
   - `OPENAI_MODEL` = o modelo que você tiver disponível
8. Faça o deploy.
9. O Render fornecerá um endereço HTTPS. Esse será o seu site do JARVIS.

## Importante sobre a chave da API
NUNCA coloque a chave da API dentro de `public/index.html` ou em JavaScript que roda no navegador.
A chave deve ficar somente como variável de ambiente no servidor.

## Voz
No celular, permita o acesso ao microfone quando o navegador pedir. O reconhecimento de voz depende do navegador e das permissões disponíveis.

## Se quiser um domínio próprio
Depois que o site estiver online, você pode conectar um domínio personalizado no serviço de hospedagem.
