import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateManufacturerDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
