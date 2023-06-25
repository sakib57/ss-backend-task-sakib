import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MovieService } from './movie.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieInput } from './dto/create-movie.input';
import { UpdateMovieInput } from './dto/update-movie.input';
import Permission from 'src/auth/permissions/permission.type';
import { UseGuards } from '@nestjs/common';
import { PermissionGuard } from 'src/auth/guards/role.guard';
import { Permissions } from 'src/auth/decorators/permission.decorator';

@Resolver(() => Movie)
export class MovieResolver {
  constructor(private readonly movieService: MovieService) {}

  // Movie creation
  @Mutation(() => Movie)
  @Permissions(Permission.MovieCreate)
  @UseGuards(PermissionGuard)
  createMovie(@Args('createMovieInput') createMovieInput: CreateMovieInput) {
    return this.movieService.create(createMovieInput);
  }

  // Movie List
  @Query(() => [Movie], { name: 'movies' })
  @Permissions(Permission.MovieList)
  @UseGuards(PermissionGuard)
  findAll() {
    return this.movieService.findAll();
  }

  // Find one movie
  @Query(() => Movie, { name: 'movie' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.movieService.findOne(id);
  }

  @Mutation(() => Movie)
  updateMovie(@Args('updateMovieInput') updateMovieInput: UpdateMovieInput) {
    return this.movieService.update(updateMovieInput.id, updateMovieInput);
  }

  @Mutation(() => Movie)
  removeMovie(@Args('id', { type: () => Int }) id: number) {
    return this.movieService.remove(id);
  }
}
