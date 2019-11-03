import { IsBoolean, IsNumber } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class NewSwipeDTO {
  @ApiModelProperty()
  @IsBoolean()
  readonly liked: boolean;

  @ApiModelProperty()
  @IsNumber()
  readonly petId: number;
}
