import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePictureDto {
  @IsString()
  @IsNotEmpty()
  potision: number;

  @IsString()
  @IsNotEmpty()
  url: string;
}
