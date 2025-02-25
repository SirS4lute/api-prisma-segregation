import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaProductsRepository } from 'src/repositories/prisma/products.repository';
import { TypeORMProductsRepository } from 'src/repositories/typeOrm/products/product.repository';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  controllers: [ProductsController],
  providers: [
    ProductsService, 
    { 
      provide: 'ProductsRepository', 
      useClass: process.env.DATABASE_ORM == 'typeOrm' ? 
        TypeORMProductsRepository : PrismaProductsRepository
    }
  ],	
  exports: [ProductsService],
})
export class ProductsModule {}
