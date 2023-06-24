import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDirectorInput } from './dto/create-director.input';
import { UpdateDirectorInput } from './dto/update-director.input';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { DirectorDocument } from './entities/director.entity';

@Injectable()
export class DirectorService {
  constructor(
    @InjectModel('Director') private directorModel: Model<DirectorDocument>,
  ) {}

  async create(createDirectorInput: CreateDirectorInput) {
    try {
      const registerModel = new this.directorModel(createDirectorInput);
      return await registerModel.save();
    } catch (error) {
      throw new HttpException(error, error.status || HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    return await this.directorModel.find();
  }

  async findOne(id: string) {
    const director = await this.directorModel.findOne({ _id: id });
    if (!director) {
      throw new NotFoundException('Director not found');
    }
    return director;
  }

  update(id: number, updateDirectorInput: UpdateDirectorInput) {
    return `This action updates a #${id} director`;
  }

  remove(id: number) {
    return `This action removes a #${id} director`;
  }
}
