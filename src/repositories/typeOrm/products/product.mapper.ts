import { Product } from 'src/core/models/product.model';
import { ProductEntity } from './product.entity';
import { CategoryMapper } from '../categories/category.mapper';

export class ProductMapper {
    /**
     * Converte uma entidade do TypeORM (ProductEntity) para a entidade de domínio (Product).
     */
    public static toDomain(entity: ProductEntity): Product {
        return Product.createFrom({
            id: entity.id,
            name: entity.name,
            categoryId: entity.categoryId,
            price: entity.price,
            category: entity.category ? CategoryMapper.toDomain(entity.category) : undefined,
        });
    }

    /**
     * Converte a entidade de domínio (Product) para uma entidade do TypeORM (ProductEntity).
     */
    public static toEntity(domain: Product): ProductEntity {
        const entity = new ProductEntity();
        entity.id = domain.id;
        entity.name = domain.name;
        entity.categoryId = domain.categoryId;
        entity.price = domain.price;
        entity.category = domain.category ? CategoryMapper.toEntity(domain.category) : undefined;
        return entity;
    }
}