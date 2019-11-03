import { Test, TestingModule } from '@nestjs/testing';
import { SwipesService } from './swipes.service';

describe('SwipesService', () => {
  let service: SwipesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SwipesService],
    }).compile();

    service = module.get<SwipesService>(SwipesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
