import {
  Table,
  Model,
  ForeignKey,
  Column,
  BelongsTo,
} from 'sequelize-typescript';
import { UsersModel } from '../users/users.model';
import { PetsModel } from '../pets/pets.model';

@Table({
  tableName: 'swipes',
  timestamps: true,
  paranoid: true,
})
export class SwipesModel extends Model<SwipesModel> {
  // @ForeignKey(() => UsersModel)
  // originalOwnerId: number;

  // @BelongsTo(() => UsersModel)
  // originalOwner: UsersModel;

  @ForeignKey(() => UsersModel)
  adopterId: number;

  @BelongsTo(() => UsersModel)
  adopter: UsersModel;

  @ForeignKey(() => PetsModel)
  petId: number;

  @BelongsTo(() => PetsModel)
  pet: PetsModel;

  @Column({
    allowNull: false,
  })
  liked: boolean;

  @Column
  accepted: boolean;

  @Column
  channelId: string;
}

export const SWIPES_PROVIDER = 'SWIPES_PROVIDER';

export const SwipesProvider = {
  provide: SWIPES_PROVIDER,
  useValue: SwipesModel,
};
