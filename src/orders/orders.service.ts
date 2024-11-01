import { Injectable } from '@nestjs/common';
import { DispatchOrderDto } from './dtos/dispatch-order.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class OrdersService {
  constructor(private readonly httpService: HttpService) {}

  async dispatchOrder(dispatchOrderDto: DispatchOrderDto) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          'http://manager-service-url/orders',
          dispatchOrderDto,
        ),
      );
      return response;
    } catch (error) {
      console.error('Failed to dispatch order', error);

      return {
        message: 'Error dispatching order',
        error: error.message,
      };
    }
  }
}
