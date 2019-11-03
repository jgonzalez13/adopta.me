import { Module } from '@nestjs/common';
import { PetsProvider } from './pets.model';
import { PetPicturesProvider } from './petPictures.model';
import { PetTypesProvider } from './petTypes.model';
import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [PetsProvider, PetPicturesProvider, PetTypesProvider, PetsService],
  exports: [PetsProvider, PetPicturesProvider, PetTypesProvider],
  controllers: [PetsController],
  imports: [AuthModule],
})
export class PetsModule {}
