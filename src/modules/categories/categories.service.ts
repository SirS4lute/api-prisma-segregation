import { Inject, Injectable } from '@nestjs/common';
import { CategoriesRepository } from './interfaces/categories-repository.interface';
import { Category } from '../../core/models/category.model';

@Injectable()
export class CategoriesService {
  constructor(
    @Inject('CategoriesRepository')
    private readonly categoriesRepository: CategoriesRepository
  ) {}

  findAll(): Promise<Category[]> {
    return this.categoriesRepository.findAll();
  }
}