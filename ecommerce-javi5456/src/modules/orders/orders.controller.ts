import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrdersDto } from './orders.dto';
import { AuthGuard } from 'src/guards/authGuard.guard';
import { ApiTags } from '@nestjs/swagger';
import { Order } from './Order.entity';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Post()
  @UseGuards(AuthGuard)
  addOrder(@Body() order): Promise<Order[]> {
    const { userId, products } = order;
    return this.orderService.addORder(userId, products);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  getOrders(@Param('id', ParseUUIDPipe) id: string): Promise<Order> {
    return this.orderService.getOrders(id);
  }
}
