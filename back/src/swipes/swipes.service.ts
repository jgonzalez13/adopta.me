import { Injectable, Inject } from '@nestjs/common';
import { SwipesModel, SWIPES_PROVIDER } from './swipes.model';
import { PETS_PROVIDER, PetsModel } from '../pets/pets.model';
import { QueryTypes } from 'sequelize';

@Injectable()
export class SwipesService {
  constructor(
    @Inject(SWIPES_PROVIDER) private readonly Swipes: typeof SwipesModel,
    @Inject(PETS_PROVIDER) private readonly Pets: typeof PetsModel,
  ) {}

  async getBatch(userId: number, lat: number, lng: number) {
    const point = `POINT(${lng} ${lat})`;
    const query = `
    Select f1.*, f3.distance from (
      Select * from pets where ownerId <> :id
    ) as f1 inner join (
    select p.id from pets p where p.typeId in (
        select pt.id from pettypes pt
        inner join userpetpreference u on pt.id = u.petTypeId
        inner join userconfig u2 on u.userConfigId = u2.id
        where u2.userId = :id
        )
    ) as f2 on f1.id = f2.id inner join (
        select p.id,
        ST_DISTANCE_SPHERE(
          p.location,
          st_geomfromtext(:point)) as distance
        from pets p
        where
        ST_DISTANCE_SPHERE(
        p.location,
        st_geomfromtext(:point)) < (select distance from userconfig where userId = :id)
    ) as f3 on f2.id = f3.id inner join (
          select p.id from pets p where p.id not in (
            SELECT s.petId from swipes as s where s.adopterId = :id
        )
    ) as f4 on f3.id = f4.id
    LIMIT 50;
    `;

    const cards = await this.Swipes.sequelize.query(query, {
      replacements: {
        id: userId,
        point,
      },
      type: QueryTypes.SELECT,
    });

    // return cards;

    // Randomly select 10
    let selected: any[];
    if (cards.length > 10) {
      selected = [];
      for (let i = 0; i < 10; i++) {
        const index = Math.min(
          Math.floor(Math.random() * cards.length),
          cards.length - 1,
        );
        const random = cards.splice(index, 1)[0] as any;
        selected.push(random);
      }
    }

    return selected || cards;
  }

  async createSwipe(userId: number, petId: number, liked: boolean) {
    const newSwipe = await this.Swipes.create({
      adopterId: userId,
      petId,
      liked,
    });

    // Here goes that firebase thing

    return newSwipe;
  }
}
