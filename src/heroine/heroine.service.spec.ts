import { Test, TestingModule } from '@nestjs/testing';
import { HeroineService } from './heroine.service';

describe('HeroineService', () => {
  let service: HeroineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HeroineService],
    }).compile();

    service = module.get<HeroineService>(HeroineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
