import { Sequelize } from 'sequelize-typescript';
import { UsersModel } from '../users/users.model';
import { PetsModel } from '../pets/pets.model';
import { PetPicturesModel } from '../pets/petPictures.model';
import { PetTypesModel } from '../pets/petTypes.model';
import { UserConfigModel } from '../users/userConfig.model';
import { UserPetPreferenceModel } from '../users/userPetPreferences.model';
import { SwipesModel } from '../swipes/swipes.model';
import { MessagesModel } from '../chat/messages.model';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const populate = async () => {
        await PetTypesModel.bulkCreate([
          {
            name: 'Perro',
          },
          {
            name: 'Gato',
          },
          {
            name: 'Conejo',
          },
          {
            name: 'Tortuga',
          },
          {
            name: 'Ave',
          },
        ]);

        const users = await UsersModel.bulkCreate([
          {
            email: 'lomito@adopta.me',
            salt: 'abfb9720a8b31afae15f487b3d626ed5',
            password:
              '8de088cb1dd6b4497c7c190ba27ba73bd246e0c0b4bb9790eb2c17ab7303d4be',
            firstName: 'Perroberto',
            lastName: 'Lomingez',
            birthDate: '2000-02-10 00:00:00',
          },
          {
            email: 'elmany@adopta.me',
            salt: 'abfb9720a8b31afae15f487b3d626ed5',
            password:
              '8de088cb1dd6b4497c7c190ba27ba73bd246e0c0b4bb9790eb2c17ab7303d4be',
            firstName: 'Emmanuel',
            lastName: 'Torres',
            birthDate: '2000-02-10 00:00:00',
          },
          {
            email: 'hola@gmail.com',
            salt: 'abfb9720a8b31afae15f487b3d626ed5',
            password:
              '8de088cb1dd6b4497c7c190ba27ba73bd246e0c0b4bb9790eb2c17ab7303d4be',
            firstName: 'Emmanuel',
            lastName: 'Torres',
            birthDate: '2000-02-10 00:00:00',
          },
        ]);

        for (let u of users) {
          const userConfig = await UserConfigModel.create({
            distance: 8000,
            userId: u.id,
          });

          await UserPetPreferenceModel.bulkCreate([
            {
              userConfigId: userConfig.id,
              petTypeId: 1,
            },
            {
              userConfigId: userConfig.id,
              petTypeId: 2,
            },
            {
              userConfigId: userConfig.id,
              petTypeId: 3,
            },
            {
              userConfigId: userConfig.id,
              petTypeId: 4,
            },
            {
              userConfigId: userConfig.id,
              petTypeId: 5,
            },
          ]);
        }

        await PetsModel.bulkCreate([
          {
            name: 'Tobi',
            age: 5,
            description: 'Jueguetón y Travieso',
            location: {
              type: 'Point',
              coordinates: [-103.734588, 19.277577],
            },
            adopted: false,
            ownerId: users[0].id,
            typeId: 1,
          },
          {
            name: 'Luna',
            age: 16,
            description: 'Esterilizada, muy cariñosa',
            location: {
              type: 'Point',
              coordinates: [-103.732678, 19.252625],
            },
            adopted: false,
            ownerId: users[0].id,
            typeId: 2,
          },
          {
            name: 'Panzon',
            age: 10,
            description: 'Esponjoso y comelón',
            location: {
              type: 'Point',
              coordinates: [-103.706792, 19.2606],
            },
            adopted: false,
            ownerId: users[0].id,
            typeId: 3,
          },
          {
            name: 'Tortu',
            age: 24,
            description: 'Tortuga macho, no hace mas que comer',
            location: {
              type: 'Point',
              coordinates: [-103.72487, 19.237741],
            },
            adopted: false,
            ownerId: users[0].id,
            typeId: 4,
          },
          {
            name: 'Cotorro',
            age: 7,
            description: 'Se sabe la biblia en 4 idiomas',
            location: {
              type: 'Point',
              coordinates: [-103.717384, 19.266455],
            },
            adopted: false,
            ownerId: users[0].id,
            typeId: 5,
          },
        ]);
      };

      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'ErizO321456',
        database: 'adoptame',
      });
      sequelize.addModels([
        UsersModel,
        UserConfigModel,
        UserPetPreferenceModel,
        PetsModel,
        PetPicturesModel,
        PetTypesModel,
        SwipesModel,
        MessagesModel,
      ]);
      await sequelize.sync({ force: true });
      await populate();
      return sequelize;
    },
  },
];
