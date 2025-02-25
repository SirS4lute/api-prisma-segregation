import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ProductEntity } from '../products/product.entity';

@Entity('Category')
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @OneToMany(() => ProductEntity, (product) => product.category)
    products?: ProductEntity[];
}