import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { Product } from './Product.entity';
import { CategorieController } from '../categories/categories.controller';
import { Category } from '../categories/Category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category])],
  controllers: [ProductController],
  providers: [ProductsService, ProductsRepository],
})
export class ProductsModule {}
