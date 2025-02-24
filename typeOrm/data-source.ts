import { DataSource } from 'typeorm';
import { ProductEntity } from 'src/repositories/typeOrm/products/product.entity';
import { CategoryEntity } from 'src/repositories/typeOrm/categories/category.entity';

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'prisma/dev.db',
    logging: true,
    entities: [ProductEntity, CategoryEntity],
});