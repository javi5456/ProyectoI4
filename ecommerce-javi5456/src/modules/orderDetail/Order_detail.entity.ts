import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinTable,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Product } from '../products/Product.entity';
import { Order } from '../orders/Order.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: 'orders_details',
})
export class Orders_details {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'Id del detalle del pedido',
    example: '123e4567-e89b-12d3-a456-426655440000',
  })
  id: string = uuid();

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @ApiProperty({
    description: 'Precio del detalle del pedido',
    example: 100,
  })
  price: number;

  @ManyToMany(() => Product)
  @JoinTable({
    name: 'orders_details_products',
    joinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'orderdetail_id',
      referencedColumnName: 'id',
    },
  })
  @ApiProperty({
    description: 'Productos del detalle del pedido',
    example: '123e4567-e89b-12d3-a456-426655440000',
  })
  products: Product[];

  @OneToOne(() => Order, (order) => order.orders_details)
  order: Order;
}
