import { Module } from '@nestjs/common';
import { TimelinesService } from './timelines.service';
import { TimelinesController } from './timelines.controller';
import { Timeline } from './entities/timeline.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Timeline])],
  controllers: [TimelinesController],
  providers: [TimelinesService]
})
export class TimelinesModule { }
