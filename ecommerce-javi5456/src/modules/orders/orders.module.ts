import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrdersRepository } from './orders.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './Order.entity';
import { Orders_details } from '../orderDetail/Order_detail.entity';
import { User } from '../users/Users.entity';
import { Product } from '../products/Product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Orders_details, User, Product])],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
})
export class OrdersModule {}
