# Atalhos / Shortcuts
- [Product API - NestJS [PT-BR]](#pt-br)
- [Estrutura de diretórios completa / Full directories structrure](#dir)

# Products API: Example of a decoupled structure - NestJS [EN]

This project was developed using NestJS, following best architectural practices and ensuring segregation between the Prisma and TypeORM ORMs. The goal is to provide a robust API for managing products and categories, allowing seamless switching between ORMs via configuration. My objective here is just to show a decoupled structure.

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
**Attention**: In this project, you can use either Prisma or TypeORM, but you must initialize the project with Prisma first, as the migrations were created exclusively with Prisma. Feel free to create TypeORM migrations!
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

## 💡 Explaining the Architecture
Our goal is to build a decoupled architecture between business models and database models. To achieve this, we use an additional abstraction layer, ensuring segregation between the application domain and data persistence. This strategy is based on the SOLID principle known as the Interface Segregation Principle (ISP). Some concepts covered here can be better illustrated in: [SOLID-Principles](https://github.com/SirS4lute/SOLID-Principles).

## 🔍 Application of the Interface Segregation Principle (ISP)
The project structure ensures that our modules, controllers, and services do not depend directly on a specific ORM. This is achieved by creating repository interfaces inside `src/modules/{module}/interfaces/`, defining a contract that any repository implementation (whether Prisma or TypeORM) must follow.

Practical Example:
- The `products-repository.interface.ts` inside `src/modules/products/interfaces/` defines the operations that a product repository must have.
- The `products.service.ts` service does not know which ORM is being used because it depends only on the interface.
- During dependency injection, the Prisma or TypeORM repository is dynamically instantiated based on the `.env` configuration.

This approach allows us to switch between ORMs without affecting the business logic, making the application more flexible and decoupled.

## 📌 Other Applied SOLID Principles
### 1️⃣ Dependency Inversion Principle (DIP)
DIP states that high-level modules should not depend directly on low-level modules but on abstractions.

How do we apply this concept?
- The `products.service.ts` and `categories.service.ts` do not depend directly on Prisma or TypeORM.
- Instead, they depend on an interface (`products-repository.interface.ts` and `categories-repository.interface.ts`).
- This means that if we want to add a new ORM in the future (such as Sequelize), we only need to create a new implementation that follows the existing interface without changing the services.

This is reflected in the directory structure:
```bash
│   ├── modules/
│   │   ├── products/
│   │   │   ├── interfaces/
│   │   │   │   ├── products-repository.interface.ts  # Defines repository rules
│   │   │   ├── products.service.ts                   # Service implementation, decoupled from ORM
```

## 2️⃣ Single Responsibility Principle (SRP)
Each class or module has a single responsibility.

How do we apply this?
- The repositories (`products.repository.ts`, `categories.repository.ts`) handle only data persistence.
- The services (`products.service.ts`, `categories.service.ts`) contain only business logic and application rules.
- The controllers (`products.controller.ts`, `categories.controller.ts`) are responsible only for receiving requests and calling the appropriate services.

This separation of responsibilities makes the application more organized and easier to maintain.

## 📌 How the Directory Structure Reflects These Principles
### 1️⃣ Module Separation (SRP)
Each functionality has its own module, ensuring cohesion and modularity:
```bash
│   ├── modules/
│   │   ├── products/
│   │   │   ├── dto/                 # Data transfer object definitions
│   │   │   ├── interfaces/           # Repository contracts
│   │   │   ├── products.controller.ts
│   │   │   ├── products.module.ts
│   │   │   ├── products.service.ts
│   │   ├── categories/
```

### 2️⃣ Abstraction Layer for Repositories (DIP and ISP)
We create an additional layer for ORMs, isolating them from the core application.
```bash
│   ├── repositories/
│   │   ├── prisma/                   # Prisma Implementation
│   │   │   ├── products.repository.ts
│   │   │   ├── categories.repository.ts
│   │   ├── typeOrm/                   # TypeORM Implementation
│   │   │   ├── products/
│   │   │   │   ├── product.entity.ts    # TypeORM Entity
│   │   │   │   ├── product.mapper.ts    # Mapper for conversion
│   │   │   │   ├── product.repository.ts
│   │   │   ├── categories/
│   │   │   │   ├── category.entity.ts
│   │   │   │   ├── category.mapper.ts
│   │   │   │   ├── category.repository.ts
```

### 3️⃣ Dynamic ORM Configuration
The ORM initialization happens according to the `.env` configuration, ensuring flexibility.
The mapper layer (`product.mapper.ts` and `category.mapper.ts`) helps maintain the separation between database entities and business models, following SRP principles.
```bash
│── .env                 # Defines which ORM will be used
│── typeOrm/
│   ├── data-source.ts    # TypeORM Configuration
```

In `main.ts`, we check the `DATABASE_ORM` variable and dynamically initialize the correct ORM:
```bash
if (process.env.DATABASE_ORM == 'typeOrm') {
  // Inicializa o banco de dados typeORM
  await initializeDatabase();
}
```

In `products.module.ts`, we exemplify how the choice of ORM is injected into the service, using an interface to maintain decoupling:
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

---

## 📌 Final Considerations
This project was structured to be scalable, modular, and flexible, applying essential SOLID concepts to ensure a robust architecture.
- Prisma and TypeORM are completely decoupled from the core application.
- ORM switching is done simply by editing the `.env` file.
- Services and controllers are not affected by the ORM choice.
- The architecture facilitates application evolution, allowing new ORMs to be added in the future without rewriting the entire business logic.

If you have any questions or suggestions, feel free to contribute! 🚀

---

# API de Produtos: Exemplo de estrutura desacoplada - NestJS [PT-BR] <a name="pt-br"></a>

Este projeto foi desenvolvido utilizando o **NestJS**, seguindo boas práticas de arquitetura e garantindo a segregação entre os ORMs **Prisma** e **TypeORM**. O objetivo é proporcionar uma API robusta para gerenciar produtos e categorias, permitindo alternar entre os ORMs via configuração. Meu objetivo aqui é apenas mostrar uma estrutura desacoplada.

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
**Atenção**: Neste projeto, você pode usar ambos Prisma ou TypeORM, mas você precisa inicializar o projeto com Prisma primeiro, já que as migrations foram criadas exclusivamente com Prisma. Sinta-se livre para criar migrations do TypeORM!
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
A estrutura do projeto garante que nossos módulos, controllers e services não dependam diretamente de um ORM específico. Isso é feito através da criação de interfaces de repositórios dentro de `src/modules/{modulo}/interfaces/`, definindo um contrato que qualquer implementação de repositório (seja Prisma ou TypeORM) deve seguir.

Exemplo prático:
- A interface `products-repository.interface.ts` dentro de `src/modules/products/interfaces/` define as operações que um repositório de produtos deve ter.
- O serviço `products.service.ts` não sabe qual ORM está sendo utilizado, pois ele depende apenas da interface.
- No momento da injeção de dependência, o repositório Prisma ou TypeORM é instanciado dinamicamente, baseado na configuração do `.env`.

Essa abordagem nos permite alternar entre os ORMs sem afetar a regra de negócio, tornando a aplicação mais flexível e desacoplada.

## 📌 Outros Princípios do SOLID Aplicados
### 1️⃣ Dependency Inversion Principle (DIP)
O DIP preconiza que módulos de alto nível não devem depender de módulos de baixo nível diretamente, mas sim de abstrações.

Como aplicamos esse conceito?
- O `products.service.ts` e o `categories.service.ts` não dependem diretamente de Prisma ou TypeORM.
- Em vez disso, eles dependem de uma interface (`products-repository.interface.ts` e `categories-repository.interface.ts`).
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
- Os repositórios (`products.repository.ts`, `categories.repository.ts`) apenas lidam com a persistência de dados.
- Os serviços (`products.service.ts`, `categories.service.ts`) apenas contêm regras de negócio e lógica de aplicação.
- Os controladores (`products.controller.ts`, `categories.controller.ts`) são responsáveis apenas por receber requisições e chamar os serviços apropriados.

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
A camada de mappers (`product.mapper.ts` e `category.mapper.ts`) ajuda a manter a separação entre as entidades do banco e os modelos de negócio, seguindo o SRP.
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

---

## 📌 Considerações Finais
Este projeto foi estruturado para ser escalável, modular e flexível, aplicando conceitos essenciais do SOLID para garantir uma arquitetura robusta.

- Prisma e TypeORM estão completamente desacoplados do core da aplicação.
- A troca de ORM é feita apenas editando o arquivo `.env`.
- Os serviços e controladores não são afetados pela escolha do ORM.
- A arquitetura facilita a evolução da aplicação, permitindo adicionar novos ORMs futuramente sem reescrever toda a lógica de negócio.

Caso tenha dúvidas ou sugestões, sinta-se à vontade para contribuir! 🚀

---

## Estrutura de diretórios completa / Full directories structrure <a name="dir"></a>

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
