import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './Category.entity';
import * as data from '../../utils/data.json';

@Injectable()
export class CategorieRepository {
  constructor(
    @InjectRepository(Category)
    private readonly categorieRepository: Repository<Category>,
  ) {}

  async getCategories(): Promise<Category[]> {
    return await this.categorieRepository.find();
  }
  async addCategory() {
    data?.map(async (elemnt) => {
      await this.categorieRepository
        .createQueryBuilder()
        .insert()
        .into(Category)
        .values({ name: elemnt.category })
        .orIgnore()
        .execute();
    });
    return 'Category already';
  }
}
