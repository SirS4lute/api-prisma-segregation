import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaProductsRepository } from 'src/repositories/prisma/products.repository';
import { TypeORMProductsRepository } from 'src/repositories/typeOrm/products/product.repository';

@Module({
  controllers: [ProductsController],
  providers: [
    ProductsService, 
    { 
      provide: 'ProductsRepository', 
      // useClass: PrismaProductsRepository 
      useClass: TypeORMProductsRepository
    }
  ],	
  exports: [ProductsService],
})
export class ProductsModule {}
