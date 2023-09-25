import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { Manufacturer } from 'src/manufacturer/schemas/manufacturer.schema';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsMongoId()
  @IsNotEmpty()
  manufacturer: [Manufacturer];
}
