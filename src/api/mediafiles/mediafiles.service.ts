import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mediafile } from './entities/mediafile.entity';

@Injectable()
export class MediafilesService {

  constructor(
    @InjectRepository(Mediafile)
    private mediaRepository: Repository<Mediafile>,
  ) { }

  async create(data) {
    return await this.mediaRepository
      .save(data).then(res => res)
      .catch(e => {
        throw new BadRequestException(e.sqlMessage);
      }
      );
  }

}
