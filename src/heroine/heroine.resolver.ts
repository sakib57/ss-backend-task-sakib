import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { HeroineService } from './heroine.service';
import { Heroine } from './entities/heroine.entity';
import { CreateHeroineInput } from './dto/create-heroine.input';
import { UpdateHeroineInput } from './dto/update-heroine.input';

@Resolver(() => Heroine)
export class HeroineResolver {
  constructor(private readonly heroineService: HeroineService) {}

  @Mutation(() => Heroine)
  createHeroine(
    @Args('createHeroineInput') createHeroineInput: CreateHeroineInput,
  ) {
    return this.heroineService.create(createHeroineInput);
  }

  @Query(() => [Heroine], { name: 'heroines' })
  findAll() {
    return this.heroineService.findAll();
  }

  @Query(() => Heroine, { name: 'heroine' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.heroineService.findOne(id);
  }

  @Mutation(() => Heroine)
  updateHeroine(
    @Args('updateHeroineInput') updateHeroineInput: UpdateHeroineInput,
  ) {
    return this.heroineService.update(
      updateHeroineInput.id,
      updateHeroineInput,
    );
  }

  @Mutation(() => Heroine)
  removeHeroine(@Args('id', { type: () => Int }) id: number) {
    return this.heroineService.remove(id);
  }
}
