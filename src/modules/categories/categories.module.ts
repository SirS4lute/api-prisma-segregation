import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { PrismaCategoriesRepository } from '../../repositories/prisma/categories.repository';
import { TypeORMCategoriesRepository } from 'src/repositories/typeOrm/categories/category.repository';

@Module({
  controllers: [CategoriesController],
  providers: [
    CategoriesService, 
    { 
      provide: 'CategoriesRepository', 
      // useClass: PrismaCategoriesRepository
      useClass: TypeORMCategoriesRepository 
    }
  ],
  exports: [CategoriesService],
})
export class CategoriesModule {}
