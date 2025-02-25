import { Category } from 'src/core/models/category.model';
import { CategoryEntity } from './category.entity';
import { Product } from 'src/core/models/product.model';
import { ProductEntity } from '../products/product.entity';
import { ProductMapper } from '../products/product.mapper';

export class CategoryMapper {
    /**
     * Converte uma entidade do TypeORM (CategoryEntity) para a entidade de domínio (Category).
     * Inclui a conversão dos produtos relacionados, se existirem.
     */
    public static toDomain(entity: CategoryEntity): Category {
        const products: Product[] = entity.products
            ? entity.products.map(ProductMapper.toDomain)
            : [];

        return Category.createFrom({
            id: entity.id,
            name: entity.name,
            products: products,
        });
    }

    /**
     * Converte a entidade de domínio (Category) para uma entidade do TypeORM (CategoryEntity).
     * Inclui a conversão dos produtos relacionados, se existirem.
     */
    public static toEntity(domain: Category): CategoryEntity {
        const entity = new CategoryEntity();
        entity.id = domain.id;
        entity.name = domain.name;

        if (domain.products) {
            entity.products = domain.products.map(ProductMapper.toEntity);
        }

        return entity;
    }
}