import {
  Table,
  Model,
  Column,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { PetsModel } from './pets.model';

@Table({
  tableName: 'petpictures',
  paranoid: true,
  timestamps: true,
})
export class PetPicturesModel extends Model<PetPicturesModel> {
  @ForeignKey(() => PetsModel)
  petId: number;

  @BelongsTo(() => PetsModel)
  pet: PetsModel;

  @Column({
    allowNull: false,
  })
  fileName: string;
}

export const PET_PICTURES_PROVIDER = 'PETS_PICTURES_PROVIDER';

export const PetPicturesProvider = {
  provide: PET_PICTURES_PROVIDER,
  useValue: PetPicturesModel,
};
