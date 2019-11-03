import {
  Table,
  Model,
  Column,
  ForeignKey,
  BelongsTo,
  HasMany,
  DataType,
} from 'sequelize-typescript';
import { UsersModel } from '../users/users.model';
import { SwipesModel } from '../swipes/swipes.model';
import { PetTypesModel } from './petTypes.model';

@Table({
  tableName: 'pets',
  paranoid: true,
  timestamps: true,
})
export class PetsModel extends Model<PetsModel> {
  @ForeignKey(() => UsersModel)
  ownerId: number;

  @BelongsTo(() => UsersModel)
  owner: UsersModel;

  @ForeignKey(() => PetTypesModel)
  typeId: number;

  @BelongsTo(() => PetTypesModel)
  type: PetTypesModel;

  @Column({
    allowNull: false,
  })
  name: string;

  @Column({
    allowNull: false,
  })
  age: number;

  @Column({
    allowNull: false,
  })
  description: string;

  @Column({
    allowNull: false,
    type: DataType.GEOMETRY('POINT', 4326),
  })
  location: GeoJSON.Point;

  @Column({
    allowNull: false,
  })
  adopted: boolean;

  @HasMany(() => SwipesModel)
  swipes: SwipesModel[];
}

export const PETS_PROVIDER = 'PETS_PROVIDER';

export const PetsProvider = {
  provide: 'PETS_PROVIDER',
  useValue: PetsModel,
};
