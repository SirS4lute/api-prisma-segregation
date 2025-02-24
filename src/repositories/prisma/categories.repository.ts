import { PrismaClient } from '@prisma/client';
import { Category } from '../../core/models/category.model';
import { CategoriesRepository } from '../../modules/categories/interfaces/categories-repository.interface';

export class PrismaCategoriesRepository implements CategoriesRepository {
  private prisma = new PrismaClient();

  async findAll(): Promise<Category[]> {
    return this.prisma.category.findMany();
  }
}