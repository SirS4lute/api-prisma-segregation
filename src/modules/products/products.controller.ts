import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from '../../core/models/product.model';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() productRequest: CreateProductDto) {
    return this.productsService.create(
      Product.createFrom(
        productRequest
      )
    );
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.productsService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() productRequest: UpdateProductDto) {
    return this.productsService.update(
      id, 
      Product.createFrom(
        productRequest
      )
    );
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.productsService.delete(id);
  }
}