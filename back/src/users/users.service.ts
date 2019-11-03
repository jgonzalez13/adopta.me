import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { USERS_PROVIDER, UsersModel } from './users.model';
import { NewUserDTO } from './dto/newUser.dto';
import * as saltGenerator from 'crypto-random-string';
import { sha256 } from 'js-sha256';
import { USER_CONFIG_PROVIDER, UserConfigModel } from './userConfig.model';
import {
  USER_PET_PREFERENCE_PROVIDER,
  UserPetPreferenceModel,
} from './userPetPreferences.model';
import { PET_TYPES_PROVIDER, PetTypesModel } from '../pets/petTypes.model';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_PROVIDER)
    private readonly Users: typeof UsersModel,
    @Inject(USER_CONFIG_PROVIDER)
    private readonly UserConfig: typeof UserConfigModel,
    @Inject(USER_PET_PREFERENCE_PROVIDER)
    private readonly UserPetPreference: typeof UserPetPreferenceModel,
    @Inject(PET_TYPES_PROVIDER)
    private readonly PetTypes: typeof PetTypesModel,
  ) {}

  async getById(userId: number) {
    const user = await this.Users.findByPk(userId, {
      include: [
        {
          model: this.UserConfig,
          include: [
            {
              model: this.PetTypes,
            },
          ],
        },
      ],
    });
    if (!user) {
      throw new NotFoundException();
    }

    const sanitizedUser = user.get({ plain: true }) as UsersModel;
    delete sanitizedUser.salt;
    delete sanitizedUser.password;

    return sanitizedUser;
  }

  async createUser(newUser: NewUserDTO) {
    const salt = saltGenerator({ length: 32 });
    const password = sha256(salt + newUser.password);

    const userCreated = (await this.Users.create(
      {
        ...newUser,
        salt,
        password,
        config: {
          distance: 8000,
        },
      },
      {
        include: [
          {
            model: this.UserConfig,
          },
        ],
      },
    )).get({ plain: true }) as UsersModel;

    delete userCreated.salt;
    delete userCreated.password;

    const defaultPetPreferences = [];
    for (let i = 0; i < 5; i++) {
      defaultPetPreferences.push({
        userConfigId: userCreated.config.id,
        petTypeId: i + 1,
      });
    }

    await this.UserPetPreference.bulkCreate(defaultPetPreferences);

    return userCreated;
  }
}
