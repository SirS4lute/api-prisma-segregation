# API de Produtos - NestJS

Este projeto foi desenvolvido utilizando o **NestJS**, seguindo boas práticas de arquitetura e garantindo a segregação entre os ORMs **Prisma** e **TypeORM**. O objetivo é proporcionar uma API robusta para gerenciar produtos e categorias, permitindo alternar entre os ORMs via configuração.

## 🛠️ Tecnologias Utilizadas
- **NestJS**
- **Prisma ORM**
- **TypeORM**
- **SQLite** (Banco de dados utilizado para desenvolvimento)
- **Swagger** (Documentação da API)

---

## 🚀 Como Inicializar o Projeto

### 1️⃣ Clonar o Repositório
```bash
 git clone <URL_DO_REPOSITORIO>
 cd api-prisma-segregation
```

### 2️⃣ Instalar as Dependências
```bash
npm install
```

### 3️⃣ Configurar o Ambiente
Renomeie o arquivo `.env.example` para `.env` e defina as configurações necessárias:
```ini
DATABASE_ORM=prisma # ou typeOrm
DATABASE_URL='file:./dev.db'
```

### 4️⃣ Executar as Migrações (Usando Prisma)
```bash
npx prisma migrate dev
```

### 5️⃣ Iniciar o Servidor
```bash
npm run start:dev
```
O servidor estará disponível em: `http://localhost:3000`

---

## 🔀 Alternando entre Prisma e TypeORM

O projeto permite alternar entre os ORMs sem impactar o core da aplicação. Para isso, basta modificar a variável `DATABASE_ORM` no arquivo `.env`:

- **Para usar Prisma:**
  ```ini
  DATABASE_ORM=prisma
  ```
  - O Prisma será inicializado automaticamente.
  - Certifique-se de executar `npx prisma migrate dev` para criar o banco de dados.

- **Para usar TypeORM:**
  ```ini
  DATABASE_ORM=typeOrm
  ```
  - O TypeORM será inicializado automaticamente.
  - Certifique-se de configurar corretamente as entidades no `data-source.ts`.

---

## 📜 Documentação da API
A documentação interativa da API pode ser acessada via Swagger em:
```bash
http://localhost:3000/api/docs
```

### 📌 Endpoints Principais

#### 🔹 Produtos
- **`GET /products`** → Lista todos os produtos
- **`GET /products/:id`** → Retorna um produto pelo ID
- **`POST /products`** → Cria um novo produto
  ```json
  {
    "name": "Keyboard",
    "price": 100,
    "categoryId": 1
  }
  ```
- **`PUT /products/:id`** → Atualiza um produto existente
  ```json
  {
    "name": "Mechanical Keyboard",
    "price": 200,
    "categoryId": 1
  }
  ```
- **`DELETE /products/:id`** → Remove um produto pelo ID

#### 🔹 Categorias
- **`GET /categories`** → Lista todas as categorias

---

## 📌 Considerações Finais
Este projeto foi estruturado de forma a permitir fácil manutenção e escalabilidade. A separação entre os ORMs evita acoplamento ao banco de dados, tornando possível a adaptação para novas tecnologias no futuro. 🚀

Caso tenha dúvidas, sugestões ou melhorias, contribua com o projeto! 😊

