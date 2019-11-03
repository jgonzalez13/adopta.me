import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsObject } from 'class-validator';

export class NewPetDTO {
  @ApiModelProperty()
  @IsString()
  readonly name: string;

  @ApiModelProperty()
  @IsNumber()
  readonly age: number;

  @ApiModelProperty()
  @IsString()
  readonly description: string;

  @ApiModelProperty()
  @IsObject()
  readonly location: GeoJSON.Point;

  @ApiModelProperty()
  @IsNumber()
  readonly typeId: number;
}
