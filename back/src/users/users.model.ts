import {
  Table,
  Model,
  Column,
  DataType,
  HasMany,
  HasOne,
  BelongsToMany,
} from 'sequelize-typescript';
import { PetsModel } from '../pets/pets.model';
import { UserConfigModel } from './userConfig.model';

@Table({
  tableName: 'users',
  paranoid: true,
  timestamps: true,
})
export class UsersModel extends Model<UsersModel> {
  @Column({
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    allowNull: false,
    type: DataType.STRING(32),
  })
  salt: string;

  @Column({
    allowNull: false,
    type: DataType.STRING(64),
  })
  password: string;

  @Column({
    allowNull: false,
  })
  firstName: string;

  @Column({
    allowNull: false,
  })
  lastName: string;

  @Column({
    allowNull: false,
    type: DataType.DATE,
  })
  birthDate: string;

  @Column({
    type: DataType.STRING(36),
  })
  picture: string;

  @HasMany(() => PetsModel)
  pets: PetsModel[];

  @HasOne(() => UserConfigModel)
  config: UserConfigModel;
}

export const USERS_PROVIDER = 'USERS_PROVIDER';

export const UsersProvider = {
  provide: 'USERS_PROVIDER',
  useValue: UsersModel,
};
