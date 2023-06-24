import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MovieModule } from './movie/movie.module';
import { MongooseModule } from '@nestjs/mongoose';
import 'dotenv/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { HeroModule } from './hero/hero.module';
import { HeroineModule } from './heroine/heroine.module';
import { DirectorModule } from './director/director.module';

const DB_CONNECTION = process.env.DB_CONNECTION;
@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    MongooseModule.forRoot(DB_CONNECTION),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      context: ({ req }) => ({ req }),
    }),
    UserModule,
    AuthModule,
    MovieModule,
    HeroModule,
    HeroineModule,
    DirectorModule,
  ],
})
export class AppModule {}
