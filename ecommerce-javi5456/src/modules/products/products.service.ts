import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly productRepository: ProductsRepository) {}
  async getProducts(page, limit) {
    return await this.productRepository.getProducts(page, limit);
  }
  async addProducts() {
    return await this.productRepository.addProducts();
  }
  async updateProduct(id, product) {
    return await this.productRepository.updateProduct(id, product);
  }
}
