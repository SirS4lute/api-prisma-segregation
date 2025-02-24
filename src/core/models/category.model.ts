import { Product } from "./product.model";

export class Category {
  public name: string;
  public id?: number;
  public products?: Product[];
  
  private constructor(data: Category) {
    Object.assign(this, data);
  }

  static createFrom(data: Category): Category {
    return new Category(data);
  }
}