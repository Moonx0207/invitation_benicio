# Convite – Aniversário de 1 ano do Benício 🚀🎄

Aplicação React + Vite criada para coletar confirmações de presença do aniversário de 1 ano do Benício com tema Astronauta + Natal.

## Funcionalidades

- Formulário com campos: Nome, Telefone, Acompanhantes (sim/não), Quantidade e Observações.
- Validação simples de telefone (10–11 dígitos).
- Geração automática de mensagem e abertura de duas abas: cliente de e-mail (mailto) e WhatsApp com texto pré-preenchido.
- Layout temático (astronauta + natal) com ícones usando `react-icons`.

## Como usar

1. Instale dependências:
   ```bash
   npm install
   npm run dev
   ```
2. Abra em `http://localhost:5173` (porta padrão Vite) e preencha o formulário.
3. Ajuste os contatos no arquivo `src/InvitationForm.tsx`:
   - `WHATSAPP_NUMERO_IRMA` para o número da sua irmã (formato: `55DDDNUMERO`, sem `+`).
   - `EMAIL_IRMA` para o e-mail real.

## Personalização

- Cores e estilos podem ser alterados em `src/App.css`.
- Caso queira adicionar mais campos (ex.: horário previsto de chegada), basta incluir no estado `FormData` e na composição da mensagem.

## Integração opcional com EmailJS

Para envio de e-mail sem abrir o cliente local:

1. Crie conta em [EmailJS](https://www.emailjs.com/).
2. Instale: `npm install emailjs-com`.
3. Importe e use no submit:
   ```ts
   import emailjs from 'emailjs-com'
   emailjs.send('SERVICE_ID','TEMPLATE_ID', { ...dados }, 'PUBLIC_KEY')
   ```
4. Manter fallback `mailto` para confiabilidade.

## WhatsApp

O link usado: `https://wa.me/NUMERO?text=MENSAGEM`. Certifique-se de que o número está correto e que o usuário tem WhatsApp instalado/logado no navegador.

## Build

```bash
npm run build
npm run preview
```

## Licença

Uso interno familiar. Sem distribuição pública prevista.

