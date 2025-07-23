import { IsString, IsNotEmpty, IsNumber, IsPositive, IsEnum, MinLength } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsString()
  @IsNotEmpty()
  photo: string; // ex: URL de l’image ou nom du fichier

  @IsEnum(['IN_STOCK', 'ON_ORDER'])
  status: 'IN_STOCK' | 'ON_ORDER';
  
}

export class SearchByNameDto {
  @IsString()
  @MinLength(1)
  prefix: string;
}