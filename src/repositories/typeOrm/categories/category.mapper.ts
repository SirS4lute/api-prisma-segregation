import { Category } from 'src/core/models/category.model'; // Entidade de domínio
import { CategoryEntity } from './category.entity'; // Entidade do TypeORM
import { Product } from 'src/core/models/product.model'; // Entidade de domínio Product
import { ProductEntity } from '../products/product.entity'; // Entidade do TypeORM Product
import { ProductMapper } from '../products/product.mapper'; // Mapper de Product

export class CategoryMapper {
    /**
     * Converte uma entidade do TypeORM (CategoryEntity) para a entidade de domínio (Category).
     * Inclui a conversão dos produtos relacionados, se existirem.
     */
    public static toDomain(entity: CategoryEntity): Category {
        // Converte os produtos relacionados (se existirem)
        const products: Product[] = entity.products
            ? entity.products.map(ProductMapper.toDomain)
            : [];

        return Category.createFrom({
            id: entity.id,
            name: entity.name,
            products: products, // Adiciona os produtos convertidos
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

        // Converte os produtos relacionados (se existirem)
        if (domain.products) {
            entity.products = domain.products.map(ProductMapper.toEntity);
        }

        return entity;
    }
}