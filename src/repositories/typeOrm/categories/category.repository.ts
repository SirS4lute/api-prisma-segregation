import { Repository } from 'typeorm';
import { Category } from 'src/core/models/category.model'; // Entidade de domínio
import { CategoryEntity } from './category.entity'; // Entidade do TypeORM
import { CategoryMapper } from './category.mapper'; // Mapper
import { AppDataSource } from 'typeOrm/data-source'; // DataSource do TypeORM
import { CategoriesRepository } from 'src/modules/categories/interfaces/categories-repository.interface';

export class TypeORMCategoriesRepository implements CategoriesRepository {
    private repository: Repository<CategoryEntity>;

    constructor() {
        // Obtém o repositório da entidade CategoryEntity
        this.repository = AppDataSource.getRepository(CategoryEntity);
    }

    /**
     * Retorna todas as categorias, convertendo-as para o domínio.
     */
    async findAll(): Promise<Category[]> {
        // Busca todas as categorias no banco de dados
        const categoryEntities = await this.repository.find({
            relations: ['products'], // Carrega os produtos relacionados (opcional)
        });

        // Converte as entidades do TypeORM para o domínio
        return categoryEntities.map(CategoryMapper.toDomain);
    }
}