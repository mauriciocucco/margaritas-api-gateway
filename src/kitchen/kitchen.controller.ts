import { Controller, Get, Query } from '@nestjs/common';
import { KitchenService } from './kitchen.service';
import { GetOrdersDto } from '../orders/dtos/get-orders.dto';

@Controller('kitchen')
export class KitchenController {
  constructor(private readonly kitchenService: KitchenService) {}

  @Get('recipes')
  async getRecipes() {
    return this.kitchenService.getRecipes();
  }

  @Get()
  async getAllOrders(@Query() getOrdersDto?: GetOrdersDto) {
    return this.kitchenService.getAllOrders(getOrdersDto);
  }
}
