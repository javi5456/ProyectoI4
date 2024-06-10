import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './Order.entity';
import { User } from '../users/Users.entity';
import { Product } from '../products/Product.entity';
import { Repository } from 'typeorm';
import { Orders_details } from '../orderDetail/Order_detail.entity';
import { UUID } from 'crypto';
import { CreateOrdersDto } from './orders.dto';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,

    @InjectRepository(Orders_details)
    public ordersDetailsRepository: Repository<Orders_details>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async getAllOrders(): Promise<Order[]> {
    const orders = this.ordersRepository.find();
    return orders;
  }
  async addOrder(userId: string, products: any): Promise<Order[]> {
    let total = 0;

    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new NotFoundException(`User ${userId} does not exist`);

    const order = new Order();
    order.date = new Date();
    order.user = user;
    console.log(products);
    const productArray = await Promise.all(
      products.map(async (element) => {
        const product = await this.productRepository.findOneBy({
          id: element.id,
        });
        if (!product)
          throw new NotFoundException(`Product ${element.id} does not exist`);

        total += Number(product.price);

        if (product.stock < 1) {
          throw new Error(`Product ${element.id} is out of stock`);
        }

        const newStock = product.stock - 1;
        if (newStock < 0) {
          throw new Error(`Product ${element.id} stock cannot be negative`);
        }

        await this.productRepository.update(
          { id: element.id },
          { stock: newStock },
        );

        return product;
      }),
    );

    //await this.ordersRepository.save(order);

    const orderDetail = new Orders_details();
    orderDetail.price = Number(total.toFixed(2));
    orderDetail.products = productArray;
    orderDetail.order = order;
    console.log(orderDetail);
    order.orders_details = orderDetail;
    await this.ordersRepository.save(order);
    await this.ordersDetailsRepository.save(orderDetail);
    return await this.ordersRepository.find({
      where: { id: order.id },
      relations: {
        orders_details: true,
      },
    });
  }

  async getOrders(id: string) {
    const orders = await this.ordersRepository.findOne({
      where: { id },
      relations: {
        orders_details: {
          products: true,
        },
      },
      select: {
        orders_details: {
          products: {
            id: true,
            name:true,
            description: true,
            price: true,
            imgUrl: true
        
          },
        },
      },
    });
    if (!orders) {
      throw new NotFoundException(`Order ${id} does not exist`);
    }
    return orders;
  }
}
