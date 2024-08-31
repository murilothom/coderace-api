# API CodeRace

## Visão Geral

CodeRace API é a camada de backend da aplicação CodeRace, responsável por gerenciar a autenticação de usuários, manipulação de dados de funcionários, registros de horários, e feedbacks. Esta API foi desenvolvida utilizando o framework NestJS e inclui módulos para autenticação, gerenciamento de funcionários, empresas e registro de feedbacks.

## Funcionalidades

- **Autenticação e Autorização:** Utilização de JWT para proteger rotas e garantir acesso seguro.
- **Gerenciamento de Funcionários:** CRUD completo para gerenciamento de dados de funcionários.
- **Gerenciamento de Empresas:** CRUD completo para dados de empresas.
- **Registro de Horários:** Manipulação e registro de horários de entrada e saída dos funcionários.
- **Feedbacks:** Recepção e armazenamento de feedbacks dos funcionários.

## Estrutura do Projeto

- **src/auth:** Módulo responsável pela autenticação e autorização, incluindo estratégias JWT e guardas de autenticação.
- **src/employee:** Módulo que gerencia operações relacionadas aos funcionários, incluindo criação, atualização e exclusão.
- **src/enterprise:** Módulo dedicado à gestão de dados das empresas, permitindo a criação e gerenciamento de empresas.
- **src/feedback:** Módulo para manipulação de feedbacks dos funcionários, incluindo armazenamento e recuperação de dados.
- **src/record-time:** Módulo responsável pelo registro de horários de trabalho dos funcionários.
- **src/env:** Gerenciamento de variáveis de ambiente para configuração da aplicação.

## Pré-requisitos

- Node.js (versão mais recente recomendada)
- npm (gerenciador de pacotes do Node)
- MongoDB (para armazenamento de dados)
- Docker (para executar a aplicação em um ambiente contêinerizado)

## Instalação

1. **Clonar o repositório:**
   ```bash
   git clone https://github.com/murilothom/coderace-api.git
   ```

2. **Navegar até o diretório do projeto:**
   ```bash
   cd coderace-api
   ```

3. **Instalar as dependências:**
   ```bash
   npm install
   ```

4. **Configurar o banco de dados MongoDB:**
   - Certifique-se de que o MongoDB está instalado e em execução.
   - Configure a string de conexão com o MongoDB no arquivo `.env`.

5. **Executar a aplicação localmente:**
   ```bash
   npm run start:dev
   ```

## Uso de Docker

Para rodar a aplicação utilizando Docker:

1. **Construir a imagem do Docker:**
   ```bash
   docker build -t coderace-api .
   ```

2. **Rodar o contêiner:**
   ```bash
   docker run -p 3000:3000 coderace-api
   ```

## Variáveis de Ambiente

- Crie um arquivo `.env` na raiz do projeto as variáveis requeridas:
