import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { UUID } from 'crypto';
import { Product } from './Product.entity';
import { Roles } from 'src/decorator/roles.decorator';
import { Role } from '../auth/roles.enum';
import { RolesGuard } from 'src/guards/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductsService) {}
  @Get()
  getProducts(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ): Promise<Product[]> {
    if (page && limit) {
      return this.productService.getProducts(page, limit);
    }
    return this.productService.getProducts(page, limit);
  }
  @Get('seeder')
  async addProducts() {
    return await this.productService.addProducts();
  }
  @Put(':id')
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  async updateProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() product: Product,
  ): Promise<void> {
    return await this.productService.updateProduct(id, product);
  }
}
