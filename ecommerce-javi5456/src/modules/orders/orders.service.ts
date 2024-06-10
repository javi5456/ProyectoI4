import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(private ordersRepository: OrdersRepository) {}

  getAllOrders() {
    return this.ordersRepository.getAllOrders();
  }
  addORder(userId: string, product: any) {
    return this.ordersRepository.addOrder(userId, product);
  }
  getOrders(id: string) {
    return this.ordersRepository.getOrders(id);
  }
}
