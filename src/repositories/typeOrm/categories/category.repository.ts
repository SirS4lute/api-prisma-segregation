import { Repository } from 'typeorm';
import { Category } from 'src/core/models/category.model';
import { CategoryEntity } from './category.entity';
import { CategoryMapper } from './category.mapper';
import { AppDataSource } from 'typeOrm/data-source';
import { CategoriesRepository } from 'src/modules/categories/interfaces/categories-repository.interface';

export class TypeORMCategoriesRepository implements CategoriesRepository {
    private repository: Repository<CategoryEntity>;

    constructor() {
        this.repository = AppDataSource.getRepository(CategoryEntity);
    }

    /**
     * Retorna todas as categorias, convertendo-as para o domínio.
     */
    async findAll(): Promise<Category[]> {
        const categoryEntities = await this.repository.find({
            relations: ['products'],
        });

        return categoryEntities.map(CategoryMapper.toDomain);
    }
}