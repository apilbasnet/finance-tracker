import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class updateJournalDTO {
  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  account?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  debit?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  credit?: number;
}
