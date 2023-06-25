import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieResolver } from './movie.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieSchema } from './entities/movie.entity';
import { DirectorSchema } from 'src/director/entities/director.entity';
import { DirectorService } from 'src/director/director.service';
import { UserService } from 'src/user/user.service';
import { UserSchema } from 'src/user/entities/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Movie', schema: MovieSchema },
      { name: 'User', schema: UserSchema },
      { name: 'Director', schema: DirectorSchema },
    ]),
  ],
  providers: [MovieResolver, MovieService, DirectorService, UserService],
})
export class MovieModule {}
