import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieResolver } from './movie.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieSchema } from './entities/movie.entity';
import { DirectorSchema } from 'src/director/entities/director.entity';
import { DirectorService } from 'src/director/director.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Movie', schema: MovieSchema },
      { name: 'Director', schema: DirectorSchema },
    ]),
  ],
  providers: [MovieResolver, MovieService, DirectorService],
})
export class MovieModule {}
