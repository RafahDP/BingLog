# Tracker de Séries

API REST para manter um catálogo de séries, animes e outras mídias, com informações de progresso e status.

> Atualmente, os dados ficam apenas na memória do servidor. Eles são reiniciados quando a aplicação é encerrada ou reiniciada.

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

O servidor fica disponível em `http://localhost:3000`.

## Endpoints

Todas as rotas de mídia usam o prefixo `/medias` e recebem ou retornam JSON.

| Método | Rota | Descrição |
| --- | --- | --- |
| `GET` | `/` | Verifica se a API está operante |
| `GET` | `/medias` | Lista todas as mídias |
| `GET` | `/medias/:id` | Busca uma mídia pelo ID |
| `POST` | `/medias` | Cadastra uma mídia |
| `PUT` | `/medias/:id` | Atualiza o progresso e/ou status |
| `DELETE` | `/medias/:id` | Remove uma mídia |

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

No cadastro, `title` e `type` são obrigatórios. `totalEpisodes` e `currentEpisode` assumem o valor `0` quando omitidos; `status` assume `Planned`.

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

Atualizar o progresso (`PUT /medias/1`):

```json
{
  "currentEpisode": 1051,
  "status": "Assistindo"
}
```

O `PUT` permite enviar apenas um dos campos (`currentEpisode` ou `status`) para atualizar.

## Respostas de erro

- `400 Bad Request`: cadastro sem `title` ou `type`.
- `404 Not Found`: ID de mídia não encontrado.

## Estrutura do projeto

```text
.
├── server.js
├── package.json
└── src
    ├── entities
    │   └── Media.js
    ├── repositories
    │   └── MediaRepository.js
    └── resources
        └── MediaController.js
```

O servidor e as rotas descritas neste README estão implementados em `server.js`. Os módulos em `src/` representam uma estrutura em desenvolvimento.
