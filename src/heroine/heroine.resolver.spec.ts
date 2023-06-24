import { Test, TestingModule } from '@nestjs/testing';
import { HeroineResolver } from './heroine.resolver';
import { HeroineService } from './heroine.service';

describe('HeroineResolver', () => {
  let resolver: HeroineResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HeroineResolver, HeroineService],
    }).compile();

    resolver = module.get<HeroineResolver>(HeroineResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
