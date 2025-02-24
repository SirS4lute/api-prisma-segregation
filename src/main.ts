import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AppDataSource } from 'typeOrm/data-source';

async function initializeDatabase() {
    try {
        // Inicializa o banco de dados
        await AppDataSource.initialize();
        console.log('Banco de dados inicializado com sucesso!');

        // Aqui você pode iniciar seu servidor ou executar outras operações
    } catch (error) {
        console.error('Erro ao inicializar o banco de dados:', error);
    }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita o uso de validação de dados
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

  // Configuração do Swagger
  const config = new DocumentBuilder()
  .setTitle('API de Produtos')
  .setDescription('Documentação da API de produtos e categorias')
  .setVersion('1.0')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  if (process.env.DATABASE_ORM == 'typeOrm') {
    // Inicializa o banco de dados typeORM
    await initializeDatabase();
  }

  // Inicia a aplicação
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
