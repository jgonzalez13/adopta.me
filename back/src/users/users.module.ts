import { Module, forwardRef } from '@nestjs/common';
import { UsersProvider } from './users.model';
import { UserConfigProvider } from './userConfig.model';
import { UserPetPreferenceProvider } from './userPetPreferences.model';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthModule } from '../auth/auth.module';
import { PetsModule } from '../pets/pets.module';

@Module({
  providers: [
    UsersProvider,
    UserConfigProvider,
    UserPetPreferenceProvider,
    UsersService,
  ],
  exports: [UsersProvider, UserConfigProvider, UserPetPreferenceProvider],
  controllers: [UsersController],
  imports: [forwardRef(() => AuthModule), PetsModule],
})
export class UsersModule {}
