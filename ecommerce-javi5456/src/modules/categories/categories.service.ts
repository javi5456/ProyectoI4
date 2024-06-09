import { Injectable } from '@nestjs/common';
import { CategorieRepository } from './categories.repository';

@Injectable()
export class CategorieService {
  constructor(private readonly categorieRepository: CategorieRepository) {}
  async getCategorie() {
    return await this.categorieRepository.getCategories();
  }
  async addCategory() {
    return await this.categorieRepository.addCategory();
  }
}
