import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MovieModule } from './movie/movie.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [UserModule, AuthModule, MovieModule],
})
export class AppModule {}
