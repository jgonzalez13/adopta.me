import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DecodedJwt } from './dto/decodedJwt.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: '12saedrutyh23porghjwel95i8terkjgns',
    });
  }

  async validate(payload: DecodedJwt | null) {
    console.log(payload);
    return this.authService.validateUser(payload);
  }
}
