import { Test, TestingModule } from '@nestjs/testing';
import { PromoGroupsService } from './promo-groups.service';

describe('PromoGroupsService', () => {
  let service: PromoGroupsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PromoGroupsService],
    }).compile();

    service = module.get<PromoGroupsService>(PromoGroupsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
