import { Test, TestingModule } from '@nestjs/testing';
import { SystemSettingsController } from './system_settings.controller';
import { SystemSettingsService } from './system_settings.service';

describe('SystemSettingsController', () => {
  let controller: SystemSettingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SystemSettingsController],
      providers: [SystemSettingsService],
    }).compile();

    controller = module.get<SystemSettingsController>(SystemSettingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
