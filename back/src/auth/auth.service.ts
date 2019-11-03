import { Injectable, Inject } from '@nestjs/common';
import { UsersModel, USERS_PROVIDER } from '../users/users.model';
import { sha256 } from 'js-sha256';
import { JwtService } from '@nestjs/jwt';
import { DecodedJwt } from './dto/decodedJwt.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USERS_PROVIDER)
    private readonly Users: typeof UsersModel,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const salt = await this.Users.findOne({
      attributes: ['salt'],
      where: {
        email,
      },
    });

    console.log(salt);

    if (!salt) {
      return null;
    }

    const hash = sha256(salt.salt + password);

    const user = await this.Users.findOne({
      attributes: ['id', 'email', 'firstName', 'lastName'],
      where: {
        email,
        password: hash,
      },
    });

    if (!user) {
      return null;
    }

    const plainUser = user.get({ plain: true });

    const jwt = this.jwtService.sign(plainUser);

    return jwt;
  }

  async validateUser(decodedJwt: DecodedJwt): Promise<DecodedJwt> {
    return decodedJwt;
  }
}
