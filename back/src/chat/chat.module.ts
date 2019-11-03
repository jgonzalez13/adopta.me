import { Module } from '@nestjs/common';
import { MessagesProvider } from './messages.model';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { SwipesModule } from '../swipes/swipes.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [MessagesProvider, ChatService],
  exports: [MessagesProvider],
  controllers: [ChatController],
  imports: [AuthModule, SwipesModule],
})
export class ChatModule {}
