# DailyLuck

# Projeto de Mensagens da Sorte - Desafio Técnico

Este projeto é uma aplicação web desenvolvida como parte do desafio técnico para a posição de Analista de Sistemas. O
objetivo principal é criar um website de mensagens da sorte exclusivo para colaboradores, com funcionalidades que
incluem mensagens aleatórias, mensagens da equipe e gerenciamento de usuários.

## Tecnologias Utilizadas

- **Front-End**: React.js
- **Back-End**: Node.js
- **Banco de Dados**: MySQL
- **Banco de Dados de Mensagens Aleatórias (API Pública)**: [Adviceslip API](https://api.adviceslip.com/)

## Pré-requisitos

Antes de começar, certifique-se de ter atendido aos seguintes requisitos:

- Node.js e npm instalados
- Banco de dados MySQL configurado
- Git instalado
- Outros pré-requisitos específicos do seu ambiente de desenvolvimento

## Instalação

1. Clone o repositório:

```bash
   git clone https://github.com/seu-usuario/seu-projeto.git
```   

2. Acesse a pasta do projeto:

```bash
   cd seu-projeto
```

3. Instale as dependências do front-end:

```bash
   cd frontend
   npm install
```

4. Instale as dependências do back-end:

``` bash
   cd ../backend
   npm install
```

5. Configuração do Banco de Dados:

Configure as informações de conexão ao MySQL no arquivo backend/config/database.js.

6. Inicie o servidor do back-end:

```bash
npm start
```

7. Inicie o servidor do front-end:

```bash
cd ../frontend
npm start
```

8. Acesse a aplicação no navegador em http://localhost:3000.

## Funcionalidades Principais

- **Cadastro de Colaboradores:** Os colaboradores podem se cadastrar utilizando um CPF válido.


- **Página de Login:** A página de login permite que os colaboradores acessem a aplicação.


- **Menu de Opções:** O menu de opções inclui funcionalidades como Mensagens Aleatórias, Mensagens da Equipe, Cadastro de
Mensagens e Usuários (para administradores).


- **Cadastro de Mensagens:** Líderes de equipe podem cadastrar mensagens que os colaboradores visualizarão.


- **Mensagens Aleatórias:** Os colaboradores podem acessar mensagens aleatórias a partir de uma API pública.


- **Cadastro de Usuários e Inativação:** Administradores podem cadastrar novos líderes de equipe e inativar usuários.


- **Cadastro de Líderes:** Apenas administradores podem cadastrar líderes de equipe.


## Documentação Técnica

Para obter informações detalhadas sobre o projeto, incluindo estrutura de diretórios, arquitetura e outros detalhes
técnicos, consulte a documentação técnica no Swagger.

Diponível em **/doc**

## Contribuição

Para contribuir com este projeto, siga estas etapas:

1.Faça um fork do projeto.

2.Crie uma branch com uma descrição da sua contribuição (git checkout -b feature/nova-feature).

3.Faça commit das suas alterações (git commit -m 'Adicione uma nova feature').

4.Faça push para a branch (git push origin feature/nova-feature).

5.Abra um Pull Request.

## Contato

Se você tiver alguma dúvida ou precisar de ajuda, sinta-se à vontade para entrar em contato.

**[Contate me](https://linktr.ee/patrick.siqueira?utm_source=linktree_profile_share&ltsid=0f8bd710-fee0-4736-9b56-a099f83942a4)**

## Licença

Este projeto está licenciado sob a [Nome da Licença] - consulte o arquivo LICENSE.md para obter detalhes.