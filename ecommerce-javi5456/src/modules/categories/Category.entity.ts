import { IsString, MaxLength } from 'class-validator';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Product } from '../products/Product.entity';
import { ApiProperty } from '@nestjs/swagger';
@Entity({
  name: 'categories',
})
export class Category {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'Id de la categoria',
    example: '123e4567-e89b-12d3-a456-426655440000',
  })
  id: string = uuid();

  @Column({ type: 'varchar', length: 50, nullable: false })
  @IsString()
  @MaxLength(50)
  @ApiProperty({
    description: 'Nombre de la categoria',
    example: 'Categoria 1',
  })
  name: string;

  @OneToMany(() => Product, (products) => products.category, {
    nullable: true,
  })
  @JoinColumn()
  @ApiProperty({
    description: 'Lista de productos de la categoria',
  })
  products: Product[];
}
