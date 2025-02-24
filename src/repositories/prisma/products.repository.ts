import { PrismaClient } from '@prisma/client';
import { Product } from '../../core/models/product.model';
import { ProductsRepository } from '../../modules/products/interfaces/products-repository.interface';

export class PrismaProductsRepository implements ProductsRepository {
  private prisma = new PrismaClient();

  async create(product: Product): Promise<Product> {
    return this.prisma.product.create({ 
      data: {
        name: product.name,
        price: product.price,
        categoryId: product.categoryId,
      },
      include: { category: true }
    });
  }

  async findAll(): Promise<Product[]> {
    return this.prisma.product.findMany({
        include: { category: true },
    });
  }

  async findById(id: number): Promise<Product | null> {
    return this.prisma.product.findUnique({
      where: { id },
      include: { category: true },
    });
  }

  async update(id: number, product: Partial<Product>): Promise<Product> {
    return this.prisma.product.update({ 
      where: { id }, 
      data: {
        name: product.name,
        price: product.price,
        categoryId: product.categoryId,
      }
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.product.delete({ where: { id } });
  }
}