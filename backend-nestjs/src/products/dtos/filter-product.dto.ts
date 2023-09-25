import { Transform } from 'class-transformer';
import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class SearchProductDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(64)
  @IsOptional()
  readonly name: string;

  @IsMongoId()
  @IsOptional()
  readonly category: string;

  @IsMongoId()
  @IsOptional()
  readonly manufacturer: string;

  @Transform(({ value }) => Number.parseInt(value))
  @IsNumber()
  @Min(1)
  @Max(100)
  @IsOptional()
  readonly limit: number;

  @Transform(({ value }) => Number.parseInt(value))
  @IsNumber()
  @Min(1)
  @IsOptional()
  readonly page: number;
}
