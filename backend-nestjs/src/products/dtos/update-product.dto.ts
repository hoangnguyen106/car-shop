// import { PartialType } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends CreateProductDto {
  @IsArray()
  @IsNotEmpty()
  potision: string;
}
