import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ProductEntity } from '../products/product.entity';

@Entity('Category') // Nome da tabela no banco de dados
export class CategoryEntity {
    @PrimaryGeneratedColumn() // Coluna de ID gerada automaticamente
    id?: number;

    @Column({ type: 'varchar', length: 255 }) // Coluna para o nome da categoria
    name: string;

    @OneToMany(() => ProductEntity, (product) => product.category) // Relacionamento um-para-muitos
    products?: ProductEntity[]; // Lista de produtos associados à categoria
}