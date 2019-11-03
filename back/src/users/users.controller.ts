import { Controller, Post, Req, Body, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiUseTags } from '@nestjs/swagger';
import { NewUserDTO } from './dto/newUser.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
@ApiUseTags('Users')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}

  @ApiOperation({
    title: 'Get self info',
    description: "Get current user's info",
  })
  @UseGuards(AuthGuard())
  @Get()
  async getSelfInfo(@Req() req: any) {
    const user = req.user;
    return this.UsersService.getById(user.id);
  }

  @ApiOperation({
    title: 'Create user',
    description: 'Create new user',
  })
  @Post()
  async createUser(@Body() body: NewUserDTO) {
    return this.UsersService.createUser(body);
  }
}
