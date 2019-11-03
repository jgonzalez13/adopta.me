import {
  Table,
  Model,
  Column,
  ForeignKey,
  BelongsToMany,
} from 'sequelize-typescript';
import { UsersModel } from './users.model';
import { PetTypesModel } from '../pets/petTypes.model';
import { UserPetPreferenceModel } from './userPetPreferences.model';

@Table({
  tableName: 'userconfig',
  timestamps: true,
})
export class UserConfigModel extends Model<UserConfigModel> {
  @ForeignKey(() => UsersModel)
  userId: number;

  @Column({
    allowNull: false,
  })
  distance: number;

  @BelongsToMany(() => PetTypesModel, () => UserPetPreferenceModel)
  petsPreference: PetTypesModel[];
}

export const USER_CONFIG_PROVIDER = 'USER_CONFIG_PROVIDER';

export const UserConfigProvider = {
  provide: USER_CONFIG_PROVIDER,
  useValue: UserConfigModel,
};
