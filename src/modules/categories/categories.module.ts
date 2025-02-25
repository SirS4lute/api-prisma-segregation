import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { PrismaCategoriesRepository } from '../../repositories/prisma/categories.repository';
import { TypeORMCategoriesRepository } from 'src/repositories/typeOrm/categories/category.repository';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  controllers: [CategoriesController],
  providers: [
    CategoriesService, 
    { 
      provide: 'CategoriesRepository', 
      useClass: process.env.DATABASE_ORM == 'typeOrm' ? 
        TypeORMCategoriesRepository : PrismaCategoriesRepository 
    }
  ],
  exports: [CategoriesService],
})
export class CategoriesModule {}
