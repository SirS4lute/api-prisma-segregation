import { Category } from "./category.model";

export class Product {
  public name: string;
  public categoryId: number;
  public price: number;
  public category?: Category;
  public id?: number;
  
  private constructor(data: Product) {
    Object.assign(this, data);
  }

  static createFrom(data: Product): Product {
    return new Product(data);
  }
}