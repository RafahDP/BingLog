# Tracker de Séries

API REST em desenvolvimento para manter um catálogo de séries, animes e outras mídias, incluindo progresso e status.

Os dados são mantidos em memória e reiniciam quando o servidor é encerrado. O repositório inicia com a mídia `One Piece` como exemplo.

## Tecnologias

- Node.js
- Express 4
- Nodemon (desenvolvimento)

## Requisitos

- Node.js e npm instalados

## Instalação e execução

Na pasta do projeto, instale as dependências:

```bash
npm install
```

Inicie o servidor em modo de desenvolvimento:

```bash
npm run dev
```

O servidor está configurado para usar `http://localhost:3000`.

> **Atenção:** no estado atual, os caminhos dos imports impedem a inicialização. `server.js` importa `routes/mediaRoutes.js`, mas o arquivo existente é `routes/mediaRoute.js`; esse arquivo, por sua vez, importa `controllers/MediaController.js`, enquanto o controller está em `src/resources/MediaController.js`. Ajuste esses caminhos no código antes de executar a API.

## Endpoints implementados

As rotas configuradas usam o prefixo `/medias` e recebem ou retornam JSON.

| Método | Rota | Descrição |
| --- | --- | --- |
| `GET` | `/medias` | Lista todas as mídias |
| `POST` | `/medias` | Cadastra uma mídia |
| `PUT` | `/medias/:id` | Atualiza o progresso e o status |
| `DELETE` | `/medias/:id` | Remove uma mídia |

O controller também contém uma busca por ID (`getById`), mas ela ainda não está conectada a uma rota.

### Modelo de mídia

```json
{
  "id": 1,
  "title": "One Piece",
  "type": "Anime",
  "totalEpisodes": 1100,
  "currentEpisode": 1050,
  "status": "Assistindo"
}
```

No cadastro, `title` e `type` são obrigatórios. `totalEpisodes` e `currentEpisode` assumem o valor `0` quando omitidos; `status` assume `Planned`. O `id` é gerado pelo repositório.

### Exemplos de requisição

Cadastrar uma mídia (`POST /medias`):

```json
{
  "title": "Frieren",
  "type": "Anime",
  "totalEpisodes": 28,
  "currentEpisode": 0,
  "status": "Planned"
}
```

Atualizar uma mídia (`PUT /medias/1`):

```json
{
  "currentEpisode": 1051,
  "status": "Assistindo"
}
```

Envie `currentEpisode` e `status` na atualização: o repositório atribui os dois campos recebidos ao objeto.

### Respostas

- `POST` retorna `201 Created` e a mídia criada.
- `PUT` retorna `200 OK` e a mídia atualizada; retorna `404 Not Found` se o ID não existir.
- `DELETE` retorna `200 OK` com uma mensagem de sucesso; retorna `404 Not Found` se o ID não existir.
- `GET /medias` retorna `200 OK` e a lista de mídias.
- `POST` retorna `400 Bad Request` quando `title` ou `type` não forem informados.

## Estrutura do projeto

```text
.
├── server.js
├── package.json
├── routes
│   └── mediaRoute.js
└── src
    ├── entities
    │   └── Media.js
    ├── repositories
    │   └── MediaRepository.js
    └── resources
        └── MediaController.js
```
