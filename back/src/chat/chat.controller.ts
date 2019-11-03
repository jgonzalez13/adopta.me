import {
  Controller,
  Get,
  Req,
  UseGuards,
  Param,
  Put,
  Body,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { ApiOperation, ApiUseTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AcceptMessageDTO } from './dto/acceptMessage.dto';

@ApiUseTags('Chat')
@Controller('chats')
export class ChatController {
  constructor(private readonly ChatService: ChatService) {}

  @ApiOperation({
    title: 'Get Chat List',
    description: 'Gets both owner and adopter messages',
  })
  @UseGuards(AuthGuard())
  @Get()
  async getChats(@Req() req: any) {
    const user = req.user;
    const owner = await this.ChatService.getOwnerMessages(user.id);
    const adopter = await this.ChatService.getAdopterMessages(user.id);

    return {
      owner,
      adopter,
    };
  }

  @ApiOperation({
    title: 'Set Message Acceptance',
    description: 'Set if a message is accepted or rejected',
  })
  @UseGuards(AuthGuard())
  @Put(':id')
  async setAcceptance(@Param('id') id: number, @Body() body: AcceptMessageDTO) {
    const acceptance = this.ChatService.setMessageAcceptance(id, body.accepted);
    return acceptance;
  }
}
