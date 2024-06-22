import { Module } from "@nestjs/common";
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import { DogsModule } from "./dogs/dogs.module";
import { ConfigModule } from "@nestjs/config";


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,  
    }),
    DogsModule,
  ],
  controllers: [],
  providers: [

  ],
})
export class AppModule { }
