import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DirectorService } from './director.service';
import { Director } from './entities/director.entity';
import { CreateDirectorInput } from './dto/create-director.input';
import { UpdateDirectorInput } from './dto/update-director.input';

@Resolver(() => Director)
export class DirectorResolver {
  constructor(private readonly directorService: DirectorService) {}

  @Mutation(() => Director)
  createDirector(
    @Args('createDirectorInput') createDirectorInput: CreateDirectorInput,
  ) {
    return this.directorService.create(createDirectorInput);
  }

  @Query(() => [Director], { name: 'directors' })
  findAll() {
    return this.directorService.findAll();
  }

  @Query(() => Director, { name: 'director' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.directorService.findOne(id);
  }

  @Mutation(() => Director)
  updateDirector(
    @Args('updateDirectorInput') updateDirectorInput: UpdateDirectorInput,
  ) {
    return this.directorService.update(
      updateDirectorInput.id,
      updateDirectorInput,
    );
  }

  @Mutation(() => Director)
  removeDirector(@Args('id', { type: () => Int }) id: number) {
    return this.directorService.remove(id);
  }
}
