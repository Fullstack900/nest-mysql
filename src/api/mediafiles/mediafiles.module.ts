import { Module } from '@nestjs/common';
import { MediafilesService } from './mediafiles.service';
import { MediafilesController } from './mediafiles.controller';
import { Mediafile } from './entities/mediafile.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Mediafile])],
  controllers: [MediafilesController],
  providers: [MediafilesService]
})
export class MediafilesModule { }
