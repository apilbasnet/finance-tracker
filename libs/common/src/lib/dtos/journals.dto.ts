import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class JournalDTO {
  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  account!: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  debit!: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  credit!: number;
}
