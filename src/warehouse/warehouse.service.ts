import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { GetPurchaseHistoryDto } from './dtos/get-purchase-history.dto';
import * as qs from 'qs';

@Injectable()
export class WarehouseService {
  private readonly apiHeader: string;
  private readonly apiKey: string;
  private readonly warehouseServiceUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiHeader = this.configService.get<string>('API_GATEWAY_HEADER');
    this.apiKey = this.configService.get<string>('API_GATEWAY_KEY');
    this.warehouseServiceUrl = this.configService.get<string>(
      'WAREHOUSE_SERVICE_URL',
    );
  }

  async getInventory() {
    try {
      const response = await firstValueFrom(
        this.httpService.get(this.warehouseServiceUrl + '/inventory', {
          headers: { [this.apiHeader]: this.apiKey },
        }),
      );
      return response.data;
    } catch (error) {
      console.error('Failed to fetch inventory', error);

      throw new InternalServerErrorException('Error fetching inventory');
    }
  }

  async getPurchaseHistory(getPurchaseHistoryDto?: GetPurchaseHistoryDto) {
    try {
      const queryString = qs.stringify(getPurchaseHistoryDto);
      const response = await firstValueFrom(
        this.httpService.get(
          `${this.warehouseServiceUrl}/purchase-history?${queryString}`,
          {
            headers: { [this.apiHeader]: this.apiKey },
          },
        ),
      );
      return response.data;
    } catch (error) {
      console.error('Failed to fetch purchase history', error);

      throw new InternalServerErrorException('Error fetching purchase history');
    }
  }
}
