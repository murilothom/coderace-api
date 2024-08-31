
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