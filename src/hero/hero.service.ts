import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateHeroInput } from './dto/create-hero.input';
import { UpdateHeroInput } from './dto/update-hero.input';
import { Model } from 'mongoose';
import { HeroDocument } from './entities/hero.entity';

@Injectable()
export class HeroService {
  constructor(@InjectModel('Hero') private heroModel: Model<HeroDocument>) {}

  async create(createHeroInput: CreateHeroInput) {
    try {
      const registerModel = new this.heroModel(createHeroInput);
      return await registerModel.save();
    } catch (error) {
      throw new HttpException(error, error.status || HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    return await this.heroModel.find();
  }

  async findOne(id: string) {
    const hero = await this.heroModel.findOne({ _id: id });
    if (!hero) {
      throw new NotFoundException('Director not found');
    }
    return hero;
  }

  update(id: number, updateHeroInput: UpdateHeroInput) {
    return `This action updates a #${id} hero`;
  }

  remove(id: number) {
    return `This action removes a #${id} hero`;
  }
}
