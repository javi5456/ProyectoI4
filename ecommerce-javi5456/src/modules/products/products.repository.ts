import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './Product.entity';

import * as data from '../../utils/data.json';
import { Category } from '../categories/Category.entity';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categorieRepository: Repository<Category>,
  ) {}

  async getProducts(page, limit): Promise<Product[]> {
    let products = await this.productRepository.find({
      relations: {
        category: true,
      },
    });
    const start = (page - 1) * limit;
    const end = start + limit;
    products = products.slice(start, end);
    return products;
  }
  async addProducts() {
    const categories = await this.categorieRepository.find();
    data?.map(async (element) => {
      const category = categories.find(
        (category) => category.name === element.category,
      );
      const product = new Product();
      product.name = element.name;
      product.description = element.description;
      product.price = element.price;
      product.imgUrl = element.imgUrl;
      product.stock = element.stock;
      product.category = category;

      await this.productRepository
        .createQueryBuilder()
        .insert()
        .into(Product)
        .values(product)
        .orUpdate(['description', 'price', 'imgUrl', 'stock'], ['name'])
        .execute();
    });
    return 'products is already';
  }
  async updateProduct(id, product) {
    const productDb = await this.productRepository.findOneBy(id);
    if (!productDb) throw new NotFoundException(`Product ${id} does not exist`);
    const updateProduct = await this.productRepository.update(id, product);
    return updateProduct;
  }
}
