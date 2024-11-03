import { Module } from '@nestjs/common';
import { OrdersController } from '../orders/orders.controller';
import { OrdersService } from './orders.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
