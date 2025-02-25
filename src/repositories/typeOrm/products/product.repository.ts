import { Repository } from 'typeorm';
import { Product } from 'src/core/models/product.model';
import { ProductEntity } from './product.entity';
import { ProductMapper } from './product.mapper';
import { AppDataSource } from 'typeOrm/data-source';
import { ProductsRepository } from 'src/modules/products/interfaces/products-repository.interface';

export class TypeORMProductsRepository implements ProductsRepository {
    private repository: Repository<ProductEntity>;

    constructor() {
        this.repository = AppDataSource.getRepository(ProductEntity);
    }

    /**
     * Cria um novo produto no banco de dados.
     */
    async create(product: Product): Promise<Product> {
        const productEntity = ProductMapper.toEntity(product);
        const savedEntity = await this.repository.save(productEntity);
        return ProductMapper.toDomain(savedEntity);
    }

    /**
     * Retorna todos os produtos, incluindo a categoria relacionada.
     */
    async findAll(): Promise<Product[]> {
        const productEntities = await this.repository.find({ relations: ['category'] });
        return productEntities.map(ProductMapper.toDomain);
    }

    /**
     * Busca um produto pelo ID, incluindo a categoria relacionada.
     */
    async findById(id: number): Promise<Product | null> {
        const productEntity = await this.repository.findOne({
            where: { id },
            relations: ['category'],
        });
        if (!productEntity) return null;
        return ProductMapper.toDomain(productEntity);
    }

    /**
     * Atualiza um produto existente.
     */
    async update(id: number, product: Partial<Product>): Promise<Product> {
        await this.repository.update(id, ProductMapper.toEntity(product as Product));
        const updatedEntity = await this.repository.findOne({
            where: { id },
            relations: ['category'],
        });
        if (!updatedEntity) throw new Error('Product not found');
        return ProductMapper.toDomain(updatedEntity);
    }

    /**
     * Remove um produto pelo ID.
     */
    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}