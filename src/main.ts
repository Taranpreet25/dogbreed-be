import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { logger } from './middleware/global.middleware';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, "..", "public"));
  app.enableCors();
  app.use(logger);

  // initSwagger(app);
  
  await app.listen(3001);
  console.log(`Server is listening on PORT : 3001`);
}
bootstrap();
