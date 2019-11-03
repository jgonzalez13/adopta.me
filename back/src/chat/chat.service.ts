import { Injectable, Inject } from '@nestjs/common';
import { SWIPES_PROVIDER, SwipesModel } from '../swipes/swipes.model';
import { PetsModel } from '../pets/pets.model';
import { UsersModel } from '../users/users.model';
import { Op } from 'sequelize';

@Injectable()
export class ChatService {
  constructor(
    @Inject(SWIPES_PROVIDER) private readonly Swipes: typeof SwipesModel,
  ) {}

  async getAdopterMessages(userId: number) {
    const chats = await this.Swipes.findAll({
      where: {
        adopterId: userId,
        accepted: true,
      },
      include: [
        {
          model: PetsModel,
          include: [
            {
              model: UsersModel,
            },
          ],
        },
      ],
    });

    if (!chats) return [];

    const formattedChats = chats.map(chat => {
      return {
        id: chat.id,
        channelId: chat.channelId,
        petName: chat.pet.name,
        ownerName: `${chat.pet.owner.firstName} ${chat.pet.owner.lastName}`,
        ownerPicture: chat.pet.owner.picture,
      };
    });

    return formattedChats;
  }

  async getOwnerMessages(userId: number) {
    const chats = await this.Swipes.findAll({
      where: {
        accepted: {
          [Op.not]: false,
        },
      },
      include: [
        {
          model: PetsModel,
          where: {
            ownerId: userId,
          },
          required: true,
          include: [
            {
              model: UsersModel,
            },
          ],
        },
        {
          model: UsersModel,
        },
      ],
    });

    if (!chats) return [];

    const formattedChats = chats.map(chat => {
      return {
        id: chat.id,
        channelId: chat.channelId,
        petName: chat.pet.name,
        pending: chat.accepted === false || false,
        adopterName: `${chat.pet.owner.firstName} ${chat.pet.owner.lastName}`,
        adopterPhoto: chat.adopter.picture,
      };
    });

    return formattedChats;
  }

  async setMessageAcceptance(swipeId: number, accepted: boolean) {
    const swipe = await this.Swipes.findByPk(swipeId);

    if (!swipe) {
      return null;
    }

    swipe.accepted = accepted;
    await swipe.save();

    return swipe.get({ plain: true });
  }
}
