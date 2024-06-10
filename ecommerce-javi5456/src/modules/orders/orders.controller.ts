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
import { AuthGuard } from 'src/guards/authGuard.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Order } from './Order.entity';
import { Roles } from 'src/decorator/roles.decorator';
import { Role } from '../auth/roles.enum';
import { RolesGuard } from 'src/guards/roles.guard';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Get()
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  getAllOrders(): Promise<Order[]> {
    return this.orderService.getAllOrders();
  }
  @Get(':id')
  @UseGuards(AuthGuard)
  getOrders(@Param('id', ParseUUIDPipe) id: string): Promise<Order> {
    return this.orderService.getOrders(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  addOrder(@Body() order): Promise<Order[]> {
    const { userId, products } = order;
    return this.orderService.addORder(userId, products);
  }
}
