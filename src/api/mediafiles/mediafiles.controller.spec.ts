import { Test, TestingModule } from '@nestjs/testing';
import { MediafilesController } from './mediafiles.controller';
import { MediafilesService } from './mediafiles.service';

describe('MediafilesController', () => {
  let controller: MediafilesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MediafilesController],
      providers: [MediafilesService],
    }).compile();

    controller = module.get<MediafilesController>(MediafilesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
