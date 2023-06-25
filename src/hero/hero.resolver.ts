import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { HeroService } from './hero.service';
import { Hero } from './entities/hero.entity';
import { CreateHeroInput } from './dto/create-hero.input';
import { UpdateHeroInput } from './dto/update-hero.input';
import { UseGuards } from '@nestjs/common';
import { PermissionGuard } from 'src/auth/guards/role.guard';
import { Permissions } from 'src/auth/decorators/permission.decorator';
import Permission from 'src/auth/permissions/permission.type';

@Resolver(() => Hero)
export class HeroResolver {
  constructor(private readonly heroService: HeroService) {}

  @Mutation(() => Hero)
  createHero(@Args('createHeroInput') createHeroInput: CreateHeroInput) {
    return this.heroService.create(createHeroInput);
  }

  @Query(() => [Hero], { name: 'heroes' })
  findAll() {
    return this.heroService.findAll();
  }

  @Query(() => Hero, { name: 'hero' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.heroService.findOne(id);
  }

  @Mutation(() => Hero)
  updateHero(@Args('updateHeroInput') updateHeroInput: UpdateHeroInput) {
    return this.heroService.update(updateHeroInput.id, updateHeroInput);
  }

  @Mutation(() => Hero)
  removeHero(@Args('id', { type: () => Int }) id: number) {
    return this.heroService.remove(id);
  }
}
