import { Module } from '@nestjs/common';
import { DirectorService } from './director.service';
import { DirectorResolver } from './director.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { DirectorSchema } from './entities/director.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Director', schema: DirectorSchema }]),
  ],
  providers: [DirectorResolver, DirectorService],
})
export class DirectorModule {}
