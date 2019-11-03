import { ApiModelProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class AcceptMessageDTO {
  @ApiModelProperty()
  @IsBoolean()
  readonly accepted: boolean;

  @ApiModelProperty()
  @IsString()
  readonly channelId: string;
}
