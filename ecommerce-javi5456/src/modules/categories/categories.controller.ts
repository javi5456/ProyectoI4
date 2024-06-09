import { Controller, Get } from '@nestjs/common';
import { CategorieService } from './categories.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('categories')
@Controller('categories')
export class CategorieController {
  constructor(private readonly categorieService: CategorieService) {}
  @Get()
  async getCategorie() {
    return await this.categorieService.getCategorie();
  }
  @Get('seeder')
  async addCategory() {
    return await this.categorieService.addCategory();
  }
}
