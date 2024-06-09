import { Module } from '@nestjs/common';
import { CategorieController } from './categories.controller';
import { CategorieRepository } from './categories.repository';
import { CategorieService } from './categories.service';
import { Category } from './Category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategorieController],
  providers: [CategorieService, CategorieRepository],
})
export class CategorieModule {}
