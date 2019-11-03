import { Test, TestingModule } from '@nestjs/testing';
import { SwipesController } from './swipes.controller';

describe('Swipes Controller', () => {
  let controller: SwipesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SwipesController],
    }).compile();

    controller = module.get<SwipesController>(SwipesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
