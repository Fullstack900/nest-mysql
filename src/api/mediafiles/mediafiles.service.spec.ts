import { Test, TestingModule } from '@nestjs/testing';
import { MediafilesService } from './mediafiles.service';

describe('MediafilesService', () => {
  let service: MediafilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MediafilesService],
    }).compile();

    service = module.get<MediafilesService>(MediafilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
