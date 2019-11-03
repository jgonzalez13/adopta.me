import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: '12saedrutyh23porghjwel95i8terkjgns',
      signOptions: { expiresIn: '30d' },
    }),
    forwardRef(() => UsersModule),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService, PassportModule],
})
export class AuthModule {}
