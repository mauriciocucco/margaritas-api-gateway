import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Query,
  ParseArrayPipe,
  UsePipes,
} from '@nestjs/common';
import { OrdersService } from '../orders/orders.service';
import { DispatchOrderDto } from './dtos/dispatch-order.dto';
import { GetOrdersDto } from './dtos/get-orders.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Post()
  @UsePipes(new ParseArrayPipe({ items: DispatchOrderDto }))
  async dispatchOrder(@Body() dispatchOrdersDto: DispatchOrderDto[]) {
    return await this.orderService.dispatchBulkOrders(dispatchOrdersDto);
  }

  @Get()
  async getAllOrders(@Query() getOrdersDto?: GetOrdersDto) {
    return this.orderService.getAllOrders(getOrdersDto);
  }

  @Get(':id')
  async getOrderById(@Param('id') id: string) {
    return this.orderService.getOrderById(id);
  }
}
