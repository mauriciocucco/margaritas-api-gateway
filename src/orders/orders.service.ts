import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { DispatchOrderDto } from './dtos/dispatch-order.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { GetOrdersDto } from './dtos/get-orders.dto';
import * as qs from 'qs';

@Injectable()
export class OrdersService {
  private readonly apiHeader: string;
  private readonly apiKey: string;
  private readonly managerServiceUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.apiHeader = this.configService.get<string>('API_GATEWAY_HEADER');
    this.apiKey = this.configService.get<string>('API_GATEWAY_KEY');
    this.managerServiceUrl = this.configService.get<string>(
      'MANAGER_SERVICE_URL',
    );
  }

  async dispatchBulkOrders(dispatchOrdersDto: DispatchOrderDto[]) {
    try {
      if (dispatchOrdersDto.length > 50) {
        throw new BadRequestException(
          'The maximum number of orders per batch is 50.',
        );
      }

      const response = await firstValueFrom(
        this.httpService.post(
          this.managerServiceUrl + '/orders',
          dispatchOrdersDto,
          {
            headers: { [this.apiHeader]: this.apiKey },
          },
        ),
      );

      return response.data;
    } catch (error) {
      console.error('Failed to dispatch order', error);

      throw new InternalServerErrorException('Error dispatching order');
    }
  }

  async getAllOrders(getOrdersDto: GetOrdersDto) {
    try {
      const queryString = qs.stringify(getOrdersDto);
      const response = await firstValueFrom(
        this.httpService.get(
          `${this.managerServiceUrl}/orders?${queryString}`,
          {
            headers: { [this.apiHeader]: this.apiKey },
          },
        ),
      );

      return response.data;
    } catch (error) {
      console.error('Failed to fetch all orders', error);

      throw new InternalServerErrorException('Error fetching all orders');
    }
  }

  async getOrderById(id: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(this.managerServiceUrl + `/orders/${id}`, {
          headers: { [this.apiHeader]: this.apiKey },
        }),
      );

      if (!response.data) {
        throw new NotFoundException(`Order with ID ${id} not found`);
      }

      return response.data;
    } catch (error) {
      console.error(`Failed to fetch order with ID ${id}`, error);

      throw new InternalServerErrorException(
        `Error fetching order with ID ${id}`,
      );
    }
  }
}
