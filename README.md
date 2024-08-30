## package.json

### Autenticação
```json
{
  "dependencies": {
    "@nestjs/jwt": "^10.1.0",
    "@nestjs/passport": "^10.0.1",
    "bcryptjs": "^2.4.3",
    "passport-jwt": "^4.0.1",
  },
  "devDependencies": {
    "@types/bcryptjs": "^2.4.6",
    "@types/passport-jwt": "^3.0.9",
  }
}
```

### E-mail
```json
{
  "dependencies": {
    "@nestjs-modules/mailer": "^2.0.2",
    "nodemailer": "^6.9.14",
  },
  "devDependencies": {
    "@types/nodemailer": "^6.4.15",
  }
}
```

## Docker

### .dockerignore

```md
# Ignorar diretórios node_modules
**/node_modules
**/npm-debug.log

# Ignorar arquivos de configuração de IDE
**/.idea
**/.vscode
**/*.swp

# Ignorar arquivos de teste
**/tests
**/__tests__

# Ignorar arquivos de log
**/*.log

# Ignorar arquivos específicos da build
**/dist
**/build
**/.next

# Ignorar outros arquivos desnecessários
**/.env
**/.DS_Store
```

### Dockerfile (Produção)

```Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production
RUN npm install @nestjs/cli --global

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
```

### Dockerfile.development (Desenvolvimento)

```Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start:dev" ]
```

### docker-compose.yml

```yml
version: '3.8'

services:
  backend:
    build:
      context: .
      dockerfile: Dockerfile.development
    container_name: api-container
    volumes:
      - ./api:/app
      - /app/node_modules
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=${NODE_ENV}
      - DB_URI=${DB_URI}
      - JWT_PRIVATE_KEY=${JWT_PRIVATE_KEY}
      - JWT_PUBLIC_KEY=${JWT_PUBLIC_KEY}
      - PORT=${PORT}
      - FRONTEND_URL=${FRONTEND_URL}
      - EMAIL_SENDER_USER=${EMAIL_SENDER_USER}
      - EMAIL_SENDER_PASSWORD=${EMAIL_SENDER_PASSWORD}
      - EMAIL_SENDER_HOST=${EMAIL_SENDER_HOST}
      - EMAIL_SENDER_PORT=${EMAIL_SENDER_PORT}
    env_file:
      - .env
    command: npm run start:dev
    networks:
      - app-network
    depends_on:
      - db

  db:
    image: mongo:5.0
    ports:  
      - '27017:27017'
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:

networks:
  app-network:
    driver: bridge
```

## Heroku

### heroku.yml

```yml
build:
  docker:
    web: Dockerfile
```

## GitHub

### .github/workflows/deploy.yml

```yml
name: Deploy api

on:
  push:
    branches:
      - main

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'

      - name: Deploy to Heroku (Backend)
        env:
          HEROKU_API_KEY: ${{ secrets.HEROKU_API_KEY }}
        run: |
          heroku container:login
          heroku container:push web --app coderace-api
          heroku container:release web --app coderace-api
```

## Env Module

### env.ts
```ts
DB_URI: z.string().url(),
JWT_PRIVATE_KEY: z.string(),
JWT_PUBLIC_KEY: z.string(),
PORT: z.coerce.number().optional().default(3000),
FRONTEND_URL: z.string().url(),
EMAIL_SENDER_HOST: z.string(),
EMAIL_SENDER_USER: z.string(),
EMAIL_SENDER_PASSWORD: z.string(),
EMAIL_SENDER_PORT: z.coerce.number().optional().default(587),
NODE_ENV: z
  .enum(['development', 'production', 'test'])
  .default('development'),
```

## Swagger

### main.ts
```ts
 const swaggerOptions = new DocumentBuilder()
    .setTitle('EMP Soluções')
    .setDescription('API EMP Soluções')
    .addBearerAuth()
    .build();

const document = SwaggerModule.createDocument(app, swaggerOptions);
SwaggerModule.setup('swagger', app, document);
```