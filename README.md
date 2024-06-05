
# App store
Uma aplicação de ecommerce completa que permite aos usuários navegar por produtos, adicioná-los ao carrinho e realizar compra


## Features

- Carrinho de Compras: Adicionar, remover e atualizar produtos no carrinho.
- Autenticação de Usuário: Registro, login
- Simulação de pagamento aprovado : UseEffect a cada 1 minuto para atualizar os status do pagamento


## Stack

**Front-End:** 
- NextJs 
- React 
- TypeScript 
- Shadcn
- TailwindCss
- Prisma



## Rodando Local

Clone o Repositório

```bash
  git clone https://github.com/marleypm16/store-app.git
```

Entra na pasta do projeto

```bash
  cd my-project
```

Instala as dependencias

```bash
  npm install
```
Insere as variaveis de ambiente .env
```bash
DATABASE_URL - Seu banco de dados
GOOGLE_CLIENT_ID - autentição com o google
GOOGLE_CLIENT_SECRET - autentição com o google
```
Realizar migrate do schema
```bash
 npx prisma migrate dev --name 'nome escolhido'  
```
Alimentar o banco de dados
```bash
npx prisma db seed 
```
Inicia a aplicação
```bash
  npm run dev


