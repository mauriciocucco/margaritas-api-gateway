import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { KitchenController } from './kitchen.controller';
import { KitchenService } from './kitchen.service';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [KitchenController],
  providers: [KitchenService],
})
export class KitchenModule {}
