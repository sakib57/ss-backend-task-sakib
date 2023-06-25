import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 3000;

  const options = {
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 200,
    credentials: true,
    allowedHeaders:
      'Origin,X-Requested-With,Content-Type,Accept,Authorization,authorization,X-Forwarded-for,traceparent,request-id,request-context,user-agent',
    exposedHeaders: 'X-TEST-KEY,X-TEST-KEY-EXPIRES',
  };
  app.use(cookieParser());
  app.use(
    compression({
      level: 6,
      filter: shouldCompress,
    }),
  );
  app.enableCors(options);
  Logger.log(`Server running on http://localhost:${PORT}`, 'Bootstrap');
  await app.listen(PORT);
}
bootstrap();

function shouldCompress(req, res) {
  if (
    req.headers['x-no-compression'] &&
    req.headers['x-no-compression'] === 'true'
  ) {
    return false;
  }

  return compression.filter(req, res);
}
