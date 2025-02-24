import { Inject, Injectable } from '@nestjs/common';
import { ProductsRepository } from './interfaces/products-repository.interface';
import { Product } from '../../core/models/product.model';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('ProductsRepository')
    private readonly productsRepository: ProductsRepository
  ) {}

  create(product: Product) {
    return this.productsRepository.create(product);
  }

  findAll() {
    return this.productsRepository.findAll();
  }

  findById(id: number) {
    return this.productsRepository.findById(id);
  }

  update(id: number, product: Partial<Product>) {
    return this.productsRepository.update(id, product);
  }

  delete(id: number) {
    return this.productsRepository.delete(id);
  }
}