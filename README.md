# Desafio inGaia - Back-end Developer
API REST desenvolvida em Node utilizando Typescript e MongoDB para o desafio de back-end da inGaia, o serviço está disponível online no Heroku e pode ser acessado através do endereço https://ingaia-node-api.herokuapp.com/

## Arquitetura da API

## Funcionalidades
 - Listar uma playlist de musicas informando o nome de uma cidade
 - Listar as estatísticas de cidades que foram consultadas pela API
 
## Instalação
Primeiro será necessário realizar clonar o projeto:
```
git clone https://github.com/wellgdias/ingaia-node-api.git
```
### Configurar variáveis de ambiente
Para a correta execução da API será necessário configurar as variáveis de ambiente, realize a cópia do arquivo de exemplo `.env.example` renomeando para `.env`,
altere as variáveis `WEATHER_APIKEY`, `SPOTIFY_CLIENTID` e `SPOTIFY_CLIENTSECRET` com as suas chaves das API do OpenWeatherMaps e Spotify, caso queira executar a API localmente altere também as variáveis `MONGO_URL` e `PORT`
````
MONGO_URL='mongodb://mongo:27017/ingaia-node-api'
PORT=3030
WEATHER_APIKEY=''
SPOTIFY_CLIENTID=''
SPOTIFY_CLIENTSECRET=''
````

### Criação do container Docker
Para criar o container Docker e executar API, é necessário a geração da build, o seguinte comando pode ser executado:
 ```
npm run up
```
Este comando vai realizar a compilação da build, gerar um container docker e iniciar a execução da API, caso queira executar os comandos separados utilizar 
`npm run build` para gerar a build e `docker-compose up` para criação do container

## Endpoints da API
### Listar uma playlist
```
GET /api/v1/music/:city
```
informar o nome da cidade como parâmetro para requisição

### Listar as estatísticas
```
GET /api/v1/stats
```

## Executar a API no ambiente local
Para executar a API no ambiente local é necessário possuir o NodeJS e o MongoDB instalado na maquina.

### Instalação das dependências
Primeiro deve ser executado a instalação das dependências
```
npm install
``` 

### Execução da API
Para executar a API localmente deverá ser executado o seguinte comando
```
npm run dev
``` 

### Testes da API
Para executar os testes unitários da API
```
npm run test:unit
```
Para executar os testes de integração da API
```
npm run test:integration
```
Para executar os testes unitários e os de integração da API e gerar a cobertura dos testes
```
npm run test:ci
```



