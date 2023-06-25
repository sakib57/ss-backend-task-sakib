import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateMovieInput } from './dto/create-movie.input';
import { UpdateMovieInput } from './dto/update-movie.input';
import { Model } from 'mongoose';
import { MovieDocument } from './entities/movie.entity';
import { DirectorService } from 'src/director/director.service';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel('Movie') private movieModel: Model<MovieDocument>,
    private directorService: DirectorService,
  ) {}

  async create(createMovieInput: CreateMovieInput) {
    try {
      const movie = await this.movieModel.findOne({
        name: createMovieInput.name,
      });
      if (movie) {
        throw new ConflictException('Movie already exist');
      }
      const director = await this.directorService.findOne(
        createMovieInput.director,
      );
      if (!director) {
        return Promise.reject(new NotFoundException('Director not found'));
      }
      const registerModel = new this.movieModel(createMovieInput);
      return await registerModel.save();
    } catch (error) {
      throw new HttpException(error, error.status || HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    return await this.movieModel
      .find()
      .populate([{ path: 'director' }, { path: 'hero' }, { path: 'heroine' }]);
  }

  async findOne(id: string) {
    const movie = await (
      await this.movieModel.findOne({ _id: id })
    ).populate([{ path: 'director' }, { path: 'hero' }, { path: 'heroine' }]);
    if (!movie) {
      return Promise.reject(new NotFoundException('Hero not found'));
    }
    return movie;
  }

  update(id: number, updateMovieInput: UpdateMovieInput) {
    return `This action updates a #${id} movie`;
  }

  remove(id: number) {
    return `This action removes a #${id} movie`;
  }
}
