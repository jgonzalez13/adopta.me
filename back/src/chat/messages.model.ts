import {
  Table,
  Model,
  ForeignKey,
  Column,
  BelongsTo,
} from 'sequelize-typescript';
import { UsersModel } from '../users/users.model';
import { PetsModel } from '../pets/pets.model';
import { SwipesModel } from '../swipes/swipes.model';

@Table({
  tableName: 'messages',
  timestamps: true,
  paranoid: true,
})
export class MessagesModel extends Model<MessagesModel> {
  @ForeignKey(() => UsersModel)
  RecipitAid: number;

  @BelongsTo(() => UsersModel)
  RecipitA: UsersModel;

  @ForeignKey(() => UsersModel)
  RecipitBid: number;

  @BelongsTo(() => UsersModel)
  RecipitB: UsersModel;

  @ForeignKey(() => SwipesModel)
  swipeId: number;

  @Column({
    allowNull: false,
  })
  message: string;
}

export const MESSAGES_PROVIDER = 'MESSAGES_PROVIDER';

export const MessagesProvider = {
  provide: MESSAGES_PROVIDER,
  useValue: MessagesModel,
};
