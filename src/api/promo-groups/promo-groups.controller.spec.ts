import { Test, TestingModule } from '@nestjs/testing';
import { PromoGroupsController } from './promo-groups.controller';
import { PromoGroupsService } from './promo-groups.service';

describe('PromoGroupsController', () => {
  let controller: PromoGroupsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PromoGroupsController],
      providers: [PromoGroupsService],
    }).compile();

    controller = module.get<PromoGroupsController>(PromoGroupsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
