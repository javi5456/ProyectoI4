import { IsNotEmpty, IsUUID } from 'class-validator';

export class ProductsIdDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
