import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { PetsModule } from './pets/pets.module';
import { SwipesModule } from './swipes/swipes.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [UsersModule, AuthModule, DatabaseModule, PetsModule, SwipesModule, ChatModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
