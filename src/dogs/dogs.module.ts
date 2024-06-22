import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DogsService } from './dogs.service';
import { DogsController } from './dogs.controller';

@Module({
  imports: [
    ConfigModule,
  ],
  controllers: [DogsController],
  providers: [DogsService],
})
export class DogsModule {}
