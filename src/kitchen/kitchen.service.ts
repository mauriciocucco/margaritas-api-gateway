import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { GetOrdersDto } from '../orders/dtos/get-orders.dto';
import * as qs from 'qs';

@Injectable()
export class KitchenService {
  private readonly apiHeader: string;
  private readonly apiKey: string;
  private readonly kitchenServiceUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.apiHeader = this.configService.get<string>('API_GATEWAY_HEADER');
    this.apiKey = this.configService.get<string>('API_GATEWAY_KEY');
    this.kitchenServiceUrl = this.configService.get<string>(
      'KITCHEN_SERVICE_URL',
    );
  }

  async getRecipes() {
    try {
      const response = await firstValueFrom(
        this.httpService.get(this.kitchenServiceUrl + '/recipes', {
          headers: { [this.apiHeader]: this.apiKey },
        }),
      );

      return response.data;
    } catch (error) {
      console.error('Failed to fetch recipes', error);

      throw new InternalServerErrorException('Error fetching recipes');
    }
  }

  async getAllOrders(getOrdersDto: GetOrdersDto) {
    try {
      const queryString = qs.stringify(getOrdersDto);
      const response = await firstValueFrom(
        this.httpService.get(
          `${this.kitchenServiceUrl}/orders?${queryString}`,
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
}
