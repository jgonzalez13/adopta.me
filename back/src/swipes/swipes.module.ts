import { Module } from '@nestjs/common';
import { SwipesProvider } from './swipes.model';
import { SwipesService } from './swipes.service';
import { SwipesController } from './swipes.controller';
import { PetsModule } from '../pets/pets.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [SwipesProvider, SwipesService],
  exports: [SwipesProvider],
  controllers: [SwipesController],
  imports: [AuthModule, PetsModule],
})
export class SwipesModule {}
