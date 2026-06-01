# CRUD de Produtos

## Integrante
- Vinicius Almeida

## Como rodar o projeto

### Backend
```bash
cd lab-empresta
bun install
bun run dev
```
O servidor sobe em http://localhost:3004

### Frontend
Abra o arquivo `frontand/index.html` com o Live Server do VS Code.

## Rotas implementadas

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /produtos | Lista todos com filtros por nome, tipo e status |
| GET | /produtos/:id | Retorna um produto pelo ID. Retorna 404 se não existir |
| POST | /produtos | Cria um novo produto com id gerado automaticamente |
| PUT | /produtos/:id | Atualiza um produto existente. Retorna 404 se não existir |
| DELETE | /produtos/:id | Remove um produto. Retorna 404 se não existir |