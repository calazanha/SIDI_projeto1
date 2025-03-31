# Projeto de Criação de Banco de Dados com React.js e Node.js

Este é um projeto simples que utiliza **React.js** no front-end e **Node.js** no back-end, permitindo que o usuário crie bancos de dados, tabelas e registre dados de forma interativa.

## Funcionalidades

- **Criação de Banco de Dados**: Permite ao usuário criar um banco de dados.
- **Criação de Tabelas**: Após a criação de um banco de dados, o usuário pode criar tabelas e definir as colunas.
- **Inserção de Registros**: O usuário pode inserir registros nas tabelas criadas.
- **Listagem de Bancos, Tabelas e Registros**: O sistema lista os bancos de dados existentes, tabelas e registros em tempo real.

## Tecnologias Utilizadas

- **React.js**: Para o desenvolvimento do front-end.
- **Node.js**: Para o desenvolvimento do back-end.
- **MySQL**: Para o gerenciamento de banco de dados.
- **Axios**: Para comunicação entre o front-end e o back-end.

## Como Executar o Projeto

### 1. Requisitos
Antes de iniciar, certifique-se de que possui os seguintes softwares instalados:

- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- [MySQL](https://dev.mysql.com/downloads/) (ou um banco de dados compatível)

### 2. Configuração do Banco de Dados
1. Inicie o Servidor Apache e o MySQL.
2. Configure um usuário e senha para conexão com o banco (se necessário).
3. Atualize as configurações de conexão no back-end do projeto.

### 3. Executando o Back-end
1. Clone o repositório:
   ```bash
   git clone https://github.com/calazanha/SIDI_projeto1
   cd projeto
   ```
2. Instale as dependências do back-end:
   ```bash
   cd server
   npm install
   ```
3. Inicie o servidor:
   ```bash
   npm start
   ```
4. O servidor estará rodando na porta `3001`.

### 4. Executando o Front-end
1. No diretório raiz do projeto, instale as dependências do front-end:
   ```bash
   cd frontend
   npm install
   ```
2. Inicie o servidor de desenvolvimento:
   ```bash
   npm start
   ```
3. O front-end estará acessível em `http://localhost:3000`.

## 5. Testando o Projeto
1. Abra o navegador e acesse `http://localhost:3000`.
2. Utilize a interface para criar um banco de dados, tabelas e inserir registros.
3. Visualize as tabelas e registros criados.

## 6. Vídeo de Demonstração
Confira o vídeo de teste do aplicativo no link abaixo:

[Vídeo de Teste do App](https://drive.google.com/file/d/1_SF5sAcuiMNJ0Zxig3B8DQNppJNbt37S/view?usp=sharing)
