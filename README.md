# Tracker de Séries

API REST em desenvolvimento para manter um catálogo de séries, animes e outras mídias, incluindo progresso e status.

Os dados são mantidos em memória e reiniciam quando o servidor é encerrado. Ao iniciar, a API carrega a mídia `One Piece` como exemplo.

## Tecnologias

- Node.js
- Express 4
- Nodemon (desenvolvimento)

## Requisitos

- Node.js e npm instalados
- Postman, para executar os testes manuais da API

## Instalação e execução

Na pasta do projeto, instale as dependências:

```bash
npm install
```

Inicie o servidor:

```bash
npm run dev
```

A API ficará disponível em `http://localhost:3000`.

## Endpoints

Todas as rotas recebem ou retornam JSON.

| Método | Rota | Descrição |
| --- | --- | --- |
| `GET` | `/medias` | Lista todas as mídias |
| `GET` | `/medias/:id` | Busca uma mídia pelo ID |
| `POST` | `/medias` | Cadastra uma mídia |
| `PUT` | `/medias/:id` | Atualiza o progresso e o status |
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

No cadastro, `title` e `type` são obrigatórios. `totalEpisodes` e `currentEpisode` assumem o valor `0` quando omitidos; `status` assume `Planned`. O `id` é gerado pela API.

O `PUT` espera os campos `currentEpisode` e `status`. Os dados não são persistidos: reiniciar o servidor restaura o estado inicial.

## Testes da API no Postman

Os testes abaixo usam os scripts da aba **Scripts > Post-response** de cada requisição. Crie uma Collection, adicione as requisições nesta ordem e defina a variável da coleção `baseUrl` como `http://localhost:3000`. Nas requisições com corpo, selecione **Body > raw > JSON**.

As requisições que criam uma mídia armazenam seu ID na variável `mediaId`, usada nos testes de consulta, atualização e exclusão. Execute a coleção em sequência e reinicie o servidor antes da execução para começar com os dados de exemplo.

### 1. Listar mídias — `GET {{baseUrl}}/medias`

**Post-response:**

```javascript
pm.test("Retorna 200 e uma lista de mídias", () => {
  pm.response.to.have.status(200);
  pm.expect(pm.response.json()).to.be.an("array");
});
```

### 2. Buscar mídia existente — `GET {{baseUrl}}/medias/1`

**Post-response:**

```javascript
pm.test("Retorna a mídia One Piece", () => {
  pm.response.to.have.status(200);

  const media = pm.response.json();
  pm.expect(media.id).to.eql(1);
  pm.expect(media.title).to.eql("One Piece");
});
```

### 3. Buscar mídia inexistente — `GET {{baseUrl}}/medias/999999`

**Post-response:**

```javascript
pm.test("Retorna 404 para uma mídia inexistente", () => {
  pm.response.to.have.status(404);
  pm.expect(pm.response.json()).to.have.property("error");
});
```

### 4. Criar mídia — `POST {{baseUrl}}/medias`

**Body:**

```json
{
  "title": "Frieren",
  "type": "Anime",
  "totalEpisodes": 28,
  "currentEpisode": 0,
  "status": "Planned"
}
```

**Post-response:**

```javascript
pm.test("Cria uma mídia e guarda seu ID", () => {
  pm.response.to.have.status(201);

  const media = pm.response.json();
  pm.expect(media.id).to.exist;
  pm.expect(media.title).to.eql("Frieren");
  pm.expect(media.type).to.eql("Anime");
  pm.collectionVariables.set("mediaId", String(media.id));
});
```

### 5. Criar mídia sem título — `POST {{baseUrl}}/medias`

**Body:**

```json
{
  "type": "Série"
}
```

**Post-response:**

```javascript
pm.test("Retorna 400 quando o título não é informado", () => {
  pm.response.to.have.status(400);
  pm.expect(pm.response.json()).to.have.property("error");
});
```

### 6. Criar mídia sem tipo — `POST {{baseUrl}}/medias`

**Body:**

```json
{
  "title": "Série sem tipo"
}
```

**Post-response:**

```javascript
pm.test("Retorna 400 quando o tipo não é informado", () => {
  pm.response.to.have.status(400);
  pm.expect(pm.response.json()).to.have.property("error");
});
```

### 7. Buscar a mídia criada — `GET {{baseUrl}}/medias/{{mediaId}}`

**Post-response:**

```javascript
pm.test("Retorna a mídia criada", () => {
  pm.response.to.have.status(200);
  pm.expect(pm.response.json().id).to.eql(Number(pm.collectionVariables.get("mediaId")));
});
```

### 8. Atualizar mídia existente — `PUT {{baseUrl}}/medias/{{mediaId}}`

**Body:**

```json
{
  "currentEpisode": 3,
  "status": "Assistindo"
}
```

**Post-response:**

```javascript
pm.test("Atualiza o progresso e o status", () => {
  pm.response.to.have.status(200);

  const media = pm.response.json();
  pm.expect(media.currentEpisode).to.eql(3);
  pm.expect(media.status).to.eql("Assistindo");
});
```

### 9. Atualizar mídia inexistente — `PUT {{baseUrl}}/medias/999999`

**Body:**

```json
{
  "currentEpisode": 1,
  "status": "Assistindo"
}
```

**Post-response:**

```javascript
pm.test("Retorna 404 ao atualizar uma mídia inexistente", () => {
  pm.response.to.have.status(404);
  pm.expect(pm.response.json()).to.have.property("error");
});
```

### 10. Excluir mídia existente — `DELETE {{baseUrl}}/medias/{{mediaId}}`

**Post-response:**

```javascript
pm.test("Exclui a mídia", () => {
  pm.response.to.have.status(200);
  pm.expect(pm.response.json().message).to.eql("Media deleted succesfully!");
});
```

### 11. Confirmar que a mídia foi excluída — `GET {{baseUrl}}/medias/{{mediaId}}`

**Post-response:**

```javascript
pm.test("A mídia excluída não é mais encontrada", () => {
  pm.response.to.have.status(404);
  pm.expect(pm.response.json()).to.have.property("error");
});
```

### 12. Excluir mídia inexistente — `DELETE {{baseUrl}}/medias/999999`

**Post-response:**

```javascript
pm.test("Retorna 404 ao excluir uma mídia inexistente", () => {
  pm.response.to.have.status(404);
  pm.expect(pm.response.json()).to.have.property("error");
});
```

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
