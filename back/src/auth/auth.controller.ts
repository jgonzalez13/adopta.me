import {
  Controller,
  Post,
  UseGuards,
  Body,
  UnauthorizedException,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import LoginDTO from './dto/login.dto';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';

@Controller('auth')
@ApiUseTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    title: 'Log In',
    description: 'Returns a JWT if credentials are valid',
  })
  @Post()
  async login(@Body() loginDto: LoginDTO) {
    const { email, password } = loginDto;
    const token = await this.authService.login(email, password);
    if (!token) {
      throw new UnauthorizedException();
    }
    return { token };
  }

  @UseGuards(AuthGuard())
  @Post('private')
  async private(@Req() req: any) {
    console.log(req.user);
    return { no: 'no' };
  }
}
