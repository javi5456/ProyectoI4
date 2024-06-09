import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';
import { strict } from 'assert';

@Injectable()
export class OrdersService {
  constructor(private ordersRepository: OrdersRepository) {}

  addORder(userId: string, product: any) {
    return this.ordersRepository.addOrder(userId, product);
  }
  getOrders(id: string) {
    return this.ordersRepository.getOrders(id);
  }
}
