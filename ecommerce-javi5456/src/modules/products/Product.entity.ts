import { IsString, MaxLength } from 'class-validator';
import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  BeforeInsert,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Category } from '../categories/Category.entity';
import { Orders_details } from '../orderDetail/Order_detail.entity';
import { ApiProperty } from '@nestjs/swagger';
@Entity({
  name: 'products',
})
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'Identificador del producto',
    example: '123e4567-e89b-12d3-a456-426655440000',
  })
  id: string = uuid();

  @Column({ type: 'varchar', length: 50, nullable: false })
  @IsString()
  @Unique(['name'])
  @MaxLength(50)
  @ApiProperty({
    description: 'Nombre del producto',
    example: 'Producto de prueba',
  })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  @IsString()
  @ApiProperty({
    description: 'Descripción del producto',
    example: 'Producto de prueba',
  })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  @ApiProperty({
    description: 'Precio del producto',
    example: '123.45',
  })
  price: number;

  @Column({ type: 'int', nullable: false })
  @ApiProperty({
    description: 'Stock del producto',
    example: '123',
  })
  stock: number;

  @Column({ nullable: true })
  @ApiProperty({
    description:
      'Url de la imagen del producto si no se asigna una se le asigna una por defecto',
    example: 'https://ejemplo.com/imagen-del-producto.jpg',
  })
  imgUrl: string;

  @BeforeInsert()
  asignarUrlPorDefecto() {
    if (!this.imgUrl || this.imgUrl.trim() === '') {
      this.imgUrl = 'https://ejemplo.com/imagen-por-defecto.jpg';
    }
  }
  @ManyToOne(() => Category, (categories) => categories.products, {
    nullable: true,
  })
  @JoinColumn({ name: 'categorie_id' })
  category: Category;

  @ManyToMany(() => Orders_details, (Orders_details) => Orders_details.products)
  orders_details: Orders_details[];
}
