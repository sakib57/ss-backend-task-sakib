import { Module } from '@nestjs/common';
import { HeroineService } from './heroine.service';
import { HeroineResolver } from './heroine.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { HeroineSchema } from './entities/heroine.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Heroine', schema: HeroineSchema }]),
  ],
  providers: [HeroineResolver, HeroineService],
})
export class HeroineModule {}
