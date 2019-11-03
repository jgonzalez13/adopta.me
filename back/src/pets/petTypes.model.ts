import { Table, Model, Column } from 'sequelize-typescript';

@Table({
  tableName: 'pettypes',
  paranoid: true,
  timestamps: true,
})
export class PetTypesModel extends Model<PetTypesModel> {
  @Column({
    allowNull: false,
  })
  name: string;
}

export const PET_TYPES_PROVIDER = 'PET_TYPES_PROVIDER';

export const PetTypesProvider = {
  provide: PET_TYPES_PROVIDER,
  useValue: PetTypesModel,
};
