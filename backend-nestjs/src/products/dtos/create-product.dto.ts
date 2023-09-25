import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { Category } from 'src/categories/schemas/category.schema';
import { Manufacturer } from 'src/manufacturer/schemas/manufacturer.schema';
import { Picture } from '../schemas';
import { CreatePictureDto } from './create-picture.dto';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(10000)
  @Max(1000000000)
  price: number;

  @IsString()
  @MaxLength(500)
  description: string;

  @IsNotEmpty()
  avatar: string;

  @IsMongoId()
  @IsNotEmpty()
  category: string;

  @IsMongoId()
  @IsNotEmpty()
  manufacturer: string;

  @ApiProperty({
    type: [CreatePictureDto],
  })
  @IsArray()
  @ArrayNotEmpty()
  pictures: [Picture];
}
