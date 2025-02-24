import { Category } from "src/core/models/category.model";

export interface CategoriesRepository {
  findAll(): Promise<Category[]>;
}