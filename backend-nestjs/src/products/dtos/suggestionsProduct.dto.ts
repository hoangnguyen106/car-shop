import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class SuggestionsProduct {
  @IsMongoId()
  @IsString()
  @IsOptional()
  category: string;

  @IsMongoId()
  @IsString()
  @IsOptional()
  manufacturer: string;
}
