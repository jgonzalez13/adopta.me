import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class GenericPagedDTO {
  @ApiModelPropertyOptional()
  @IsNumber()
  @IsOptional()
  page: number;

  @ApiModelPropertyOptional()
  @IsNumber()
  @IsOptional()
  perPage: number;
}
