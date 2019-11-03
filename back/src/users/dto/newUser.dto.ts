import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsDateString } from 'class-validator';

export class NewUserDTO {
  @ApiModelProperty()
  @IsEmail()
  readonly email: string;

  @ApiModelProperty()
  @IsString()
  readonly password: string;

  @ApiModelProperty()
  @IsString()
  readonly firstName: string;

  @ApiModelProperty()
  @IsString()
  readonly lastName: string;

  @ApiModelProperty()
  @IsDateString()
  readonly birthDate: string;
}
