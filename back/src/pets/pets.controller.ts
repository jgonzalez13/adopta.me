import {
  Controller,
  Get,
  Req,
  Query,
  UseGuards,
  Res,
  Post,
  Body,
} from '@nestjs/common';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';
import { PetsService } from './pets.service';
import { DecodedJwt } from '../auth/dto/decodedJwt.dto';
import { GenericPagedDTO } from '../generics/genericPaged.dto';
import { AuthGuard } from '@nestjs/passport';
import { NewPetDTO } from './dto/newPet.dto';

@Controller('pets')
@ApiUseTags('Pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @ApiOperation({
    title: 'Get pets paged',
    description: 'Gets the list of the current users pets',
  })
  @UseGuards(AuthGuard())
  @Get()
  getPaged(@Query() query: GenericPagedDTO, @Req() req: any) {
    const { page, perPage } = query;
    const user = req.user as DecodedJwt;
    return this.petsService.getPaged(user.id, false, page || 1, perPage || 10);
  }

  @ApiOperation({
    title: 'Create a new pet',
    description: 'Sets in adoption a new pet',
  })
  @UseGuards(AuthGuard())
  @Post()
  createPet(@Body() body: NewPetDTO, @Req() req: any) {
    const user = req.user as DecodedJwt;
    return this.petsService.createPet(user.id, body);
  }
}
