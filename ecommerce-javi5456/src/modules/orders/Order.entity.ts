import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from '../users/Users.entity';
import { Orders_details } from '../orderDetail/Order_detail.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: 'orders',
})
export class Order {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'Id del pedido',
    example: '1234567890',
  })
  id: string = uuid();

  @ManyToOne(() => User, (user) => user.orders, { onDelete: 'CASCADE' })
  user: User;

  @Column()
  @ApiProperty({
    description: 'Fecha del pedido',
    example: '2021-05-20',
  })
  date: Date;

  @OneToOne(() => Orders_details, (orders_details) => orders_details.order, {
    cascade: true,
  })
  @JoinColumn()
  orders_details: Orders_details;
}
