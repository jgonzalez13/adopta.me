import { IsLatitude, IsLongitude } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class LatLngDTO {
  @ApiModelProperty()
  @IsLatitude()
  readonly lat: number;

  @ApiModelProperty()
  @IsLongitude()
  readonly lng: number;
}
