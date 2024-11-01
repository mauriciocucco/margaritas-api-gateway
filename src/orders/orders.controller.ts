import {
  Controller,
  Post,
  Body,
  InternalServerErrorException,
} from '@nestjs/common';
import { OrdersService } from '../orders/orders.service';
import { DispatchOrderDto } from './dtos/dispatch-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Post()
  async dispatchOrder(
    @Body() dispatchOrderDto: DispatchOrderDto,
  ): Promise<any> {
    const response = await this.orderService.dispatchOrder(dispatchOrderDto);

    if ('error' in response) {
      throw new InternalServerErrorException(response);
    }

    return {
      ...response,
      metadata: {
        timestamp: new Date().toISOString(),
      },
    };
  }
}
