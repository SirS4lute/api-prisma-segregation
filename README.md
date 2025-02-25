# Product API - NestJS [EN]

This project was developed using NestJS, following best architectural practices and ensuring segregation between the Prisma and TypeORM ORMs. The goal is to provide a robust API for managing products and categories, allowing seamless switching between ORMs via configuration.

## 🛠️ Technologies Used
- **NestJS**
- **Prisma ORM**
- **TypeORM**
- **SQLite** (Database used for development)
- **Swagger** (API Documentation)

---

## 🚀 How to Initialize the Project

### 1️⃣ Clone the Repository
```bash
 git clone <URL_DO_REPOSITORIO>
 cd api-prisma-segregation
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Configure the Environment
Rename the `.env.example` file to `.env` and set the necessary configurations:
```ini
DATABASE_ORM=prisma # or typeOrm
DATABASE_URL='file:./dev.db'
```

### 4️⃣ Run Migrations (Using Prisma)
```bash
npx prisma migrate dev
```

### 5️⃣ Start the Server
```bash
npm run start:dev
```
The server will be available at: `http://localhost:3000`

---

## 🔀 Switching Between Prisma and TypeORM

The project allows switching between ORMs without impacting the application core. To do this, simply modify the `DATABASE_ORM` variable in the `.env` file:

- **To use Prisma:**
  ```ini
  DATABASE_ORM=prisma
  ```
  - Prisma will be initialized automatically.
  - Make sure to run `npx prisma migrate dev` to create the database.

- **To use TypeORM:**
  ```ini
  DATABASE_ORM=typeOrm
  ```
  - TypeORM will be initialized automatically.
  - Ensure that the entities are correctly configured in `data-source.ts`.

---

## 📜 API Documentation
The interactive API documentation can be accessed via Swagger at:
```bash
http://localhost:3000/api/docs
```

### 📌 Main Endpoints

#### 🔹 Products
- **`GET /products`** → List all products
- **`GET /products/:id`** → Get a product by ID
- **`POST /products`** → Create a new product
  ```json
  {
    "name": "Keyboard",
    "price": 100,
    "categoryId": 1
  }
  ```
- **`PUT /products/:id`** → Update an existing product
  ```json
  {
    "name": "Mechanical Keyboard",
    "price": 200,
    "categoryId": 1
  }
  ```
- **`DELETE /products/:id`** → Delete a product by ID

#### 🔹 Categorias
- **`GET /categories`** → List all categories

---

## 📌 Final Considerations
This project was structured to allow easy maintenance and scalability. The separation between ORMs avoids database coupling, making it possible to adapt to new technologies in the future. 🚀

If you have questions, suggestions, or improvements, feel free to contribute to the project! 😊



# API de Produtos - NestJS [PT-BR]

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

## 💡 Explicando a arquitetura
Nosso objetivo é montar uma arquitetura desacoplada entre os modelos de negócio e os modelos de banco de dados. Para isso, utilizamos uma camada adicional de abstração, garantindo a segregação entre o domínio da aplicação e a persistência dos dados. Essa estratégia se baseia no conceito do SOLID conhecido como Interface Segregation Principle (ISP). Alguns conceitos abordados aqui podem ser melhor ilustrados em: [SOLID-Principles](https://github.com/SirS4lute/SOLID-Principles).

## 🔍 Aplicação do Interface Segregation Principle (ISP)
A estrutura do projeto garante que nossos módulos, controllers e services não dependam diretamente de um ORM específico. Isso é feito através da criação de interfaces de repositórios dentro de src/modules/{modulo}/interfaces/, definindo um contrato que qualquer implementação de repositório (seja Prisma ou TypeORM) deve seguir.

Exemplo prático:

- A interface products-repository.interface.ts dentro de src/modules/products/interfaces/ define as operações que um repositório de produtos deve ter.
- O serviço products.service.ts não sabe qual ORM está sendo utilizado, pois ele depende apenas da interface.
- No momento da injeção de dependência, o repositório Prisma ou TypeORM é instanciado dinamicamente, baseado na configuração do .env.
Essa abordagem nos permite alternar entre os ORMs sem afetar a regra de negócio, tornando a aplicação mais flexível e desacoplada.

## 📌 Outros Princípios do SOLID Aplicados
### 1️⃣ Dependency Inversion Principle (DIP)
O DIP preconiza que módulos de alto nível não devem depender de módulos de baixo nível diretamente, mas sim de abstrações.

Como aplicamos esse conceito?

- O products.service.ts e o categories.service.ts não dependem diretamente de Prisma ou TypeORM.
- Em vez disso, eles dependem de uma interface (products-repository.interface.ts e categories-repository.interface.ts).
- Isso significa que se quisermos adicionar um novo ORM no futuro (como Sequelize), basta criar uma nova implementação que siga a interface existente, sem alterar os serviços.
Isso se reflete na estrutura do diretório:

```bash
│   ├── modules/
│   │   ├── products/
│   │   │   ├── interfaces/
│   │   │   │   ├── products-repository.interface.ts  # Define as regras do repositório
│   │   │   ├── products.service.ts                   # Implementação do serviço, desacoplado do ORM
```

## 2️⃣ Single Responsibility Principle (SRP)
Cada classe ou módulo tem uma única responsabilidade.
Como aplicamos isso?

- Os repositórios (products.repository.ts, categories.repository.ts) apenas lidam com a persistência de dados.
- Os serviços (products.service.ts, categories.service.ts) apenas contêm regras de negócio e lógica de aplicação.
- Os controladores (products.controller.ts, categories.controller.ts) são responsáveis apenas por receber requisições e chamar os serviços apropriados.
Essa separação de responsabilidades torna a aplicação mais organizada e fácil de manter.

## 📌 Como a Estrutura do Diretório Reflete Esses Princípios
### 1️⃣ Separação de Módulos (SRP)
Cada funcionalidade tem seu próprio módulo, garantindo coesão e modularidade:

```bash
│   ├── modules/
│   │   ├── products/
│   │   │   ├── dto/                 # Definição de objetos de transferência de dados
│   │   │   ├── interfaces/           # Contratos para repositórios
│   │   │   ├── products.controller.ts
│   │   │   ├── products.module.ts
│   │   │   ├── products.service.ts
│   │   ├── categories/
```

### 2️⃣ Camada de Abstração para Repositórios (DIP e ISP)
Criamos uma camada adicional para os ORMs, isolando-os do core da aplicação.

```bash
│   ├── repositories/
│   │   ├── prisma/                   # Implementação do Prisma
│   │   │   ├── products.repository.ts
│   │   │   ├── categories.repository.ts
│   │   ├── typeOrm/                   # Implementação do TypeORM
│   │   │   ├── products/
│   │   │   │   ├── product.entity.ts    # Entidade do TypeORM
│   │   │   │   ├── product.mapper.ts    # Mapper para conversão
│   │   │   │   ├── product.repository.ts
│   │   │   ├── categories/
│   │   │   │   ├── category.entity.ts
│   │   │   │   ├── category.mapper.ts
│   │   │   │   ├── category.repository.ts
```

### 3️⃣ Configuração do ORM Dinâmico
A inicialização do ORM acontece de acordo com a configuração do .env, garantindo flexibilidade.

A camada de mappers (product.mapper.ts e category.mapper.ts) ajuda a manter a separação entre as entidades do banco e os modelos de negócio, seguindo o SRP.

```bash
│── .env                 # Define qual ORM será utilizado
│── typeOrm/
│   ├── data-source.ts    # Configuração do TypeORM
```

No `main.ts`, verificamos a variável `DATABASE_ORM` e inicializamos dinamicamente o ORM correto:

```bash
if (process.env.DATABASE_ORM == 'typeOrm') {
  // Inicializa o banco de dados typeORM
  await initializeDatabase();
}
```

No `products.module.ts` exemplificamos como é feita a escolha de qual ORM será injetado na service, utilizando a interface para manter o desacoplamento

```bash
providers: [
    ProductsService, 
    { 
      provide: 'ProductsRepository', 
      useClass: process.env.DATABASE_ORM == 'typeOrm' ? 
        TypeORMProductsRepository : PrismaProductsRepository
    }
  ],
```

## Arquitetura completa

```bash
api-prisma-segregation/
│── node_modules/                                    # Dependências do projeto
│── prisma/                                          # Diretório do Prisma ORM
│   ├── migrations/                                  # Migrações do banco de dados
│   ├── schema.prisma                                # Esquema do Prisma
│   ├── dev.db                                       # Banco de dados SQLite (usado em desenvolvimento)
│── src/                                             # Código-fonte principal
│   ├── modules/                                     # Módulos da aplicação
│   │   ├── products/                                # Módulo de produtos
│   │   │   ├── dto/                                 # Data Transfer Objects de produtos
│   │   │   │   ├── create-product.dto.ts
│   │   │   │   ├── update-product.dto.ts
│   │   │   ├── interfaces/                          # Interfaces de produtos
│   │   │   │   ├── products-repository.interface.ts 
│   │   │   ├── products.controller.ts
│   │   │   ├── products.module.ts
│   │   │   ├── products.service.ts
│   │   ├── categories/                              # Módulo de categorias
│   │   │   ├── interfaces/                          # Interfaces de produtos
│   │   │   ├── categories.controller.ts
│   │   │   ├── categories.module.ts
│   │   │   ├── categories.service.ts
│   ├── repositories/                                # Diretório de repositórios para persistência de dados
│   │   ├── prisma/                                  # Implementações com Prisma
│   │   │   ├── categories.repository.ts
│   │   │   ├── products.repository.ts
│   │   ├── typeOrm/                                 # Implementações com TypeORM
│   │   │   ├── categories/
│   │   │   │   ├── category.entity.ts               # Entidade de categorias
│   │   │   │   ├── category.mapper.ts               # Mapper entre a entidade de categorias e o modelo de negócios
│   │   │   │   ├── category.repository.ts           # Repository de categorias utilizando typeOrm
│   │   │   ├── products/
│   │   │   │   ├── product.entity.ts                # Entidade de produtos
│   │   │   │   ├── product.mapper.ts                # Mapper entre a entidade de produtos e o modelo de negócios
│   │   │   │   ├── product.repository.ts            # Repository de produtos utilizando typeOrm
│   ├── app.controller.ts                            # Controller principal
│   ├── app.module.ts                                # Módulo raiz da aplicação
│   ├── app.service.ts                               # Serviço principal
│   ├── main.ts                                      # Arquivo de inicialização do NestJS
│── test/                                            # Testes da aplicação
│── typeOrm/                                         # Diretório do TypeORM
│   ├── data-source.ts                               # Configuração do TypeORM
│── .env                                             # Configurações de ambiente
│── .gitignore                                       # Arquivos ignorados pelo Git
│── package.json                                     # Dependências e scripts do projeto
│── tsconfig.json                                    # Configuração do TypeScript
...
```

## 📌 Considerações Finais
Este projeto foi estruturado para ser escalável, modular e flexível, aplicando conceitos essenciais do SOLID para garantir uma arquitetura robusta.

- Prisma e TypeORM estão completamente desacoplados do core da aplicação.
- A troca de ORM é feita apenas editando o arquivo .env.
- Os serviços e controladores não são afetados pela escolha do ORM.
- A arquitetura facilita a evolução da aplicação, permitindo adicionar novos ORMs futuramente sem reescrever toda a lógica de negócio.

Caso tenha dúvidas ou sugestões, sinta-se à vontade para contribuir! 🚀
