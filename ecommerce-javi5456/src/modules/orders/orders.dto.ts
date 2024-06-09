import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Product } from '../products/Product.entity';
import { Type } from 'class-transformer';
import { ProductsIdDto } from '../products/products.dto';

export class CreateOrdersDto {
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ProductsIdDto)
  products: ProductsIdDto[];
}
