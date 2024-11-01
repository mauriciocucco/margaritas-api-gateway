import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { OrdersModule } from './orders/orders.module';
import appConfig from './config/app.config';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
      load: [appConfig],
    }),
    OrdersModule,
  ],
})
export class AppModule {}
