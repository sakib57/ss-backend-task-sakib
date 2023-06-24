import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateHeroineInput } from './dto/create-heroine.input';
import { UpdateHeroineInput } from './dto/update-heroine.input';
import { Model } from 'mongoose';
import { HeroineDocument } from './entities/heroine.entity';

@Injectable()
export class HeroineService {
  constructor(
    @InjectModel('Heroine') private heroineModel: Model<HeroineDocument>,
  ) {}

  async create(createHeroineInput: CreateHeroineInput) {
    try {
      const registerModel = new this.heroineModel(createHeroineInput);
      return await registerModel.save();
    } catch (error) {
      throw new HttpException(error, error.status || HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    return await this.heroineModel.find();
  }

  async findOne(id: string) {
    const heroine = await this.heroineModel.findOne({ _id: id });
    if (!heroine) {
      throw new NotFoundException('Director not found');
    }
    return heroine;
  }

  update(id: number, updateHeroineInput: UpdateHeroineInput) {
    return `This action updates a #${id} heroine`;
  }

  remove(id: number) {
    return `This action removes a #${id} heroine`;
  }
}
