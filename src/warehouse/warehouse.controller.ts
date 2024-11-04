import { Controller, Get, Query } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { GetPurchaseHistoryDto } from './dtos/get-purchase-history.dto';

@Controller('warehouse')
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

  @Get('inventory')
  async getInventory() {
    return this.warehouseService.getInventory();
  }

  @Get('purchase-history')
  async getPurchaseHistory(
    @Query() getPurchaseHistoryDto?: GetPurchaseHistoryDto,
  ) {
    return this.warehouseService.getPurchaseHistory(getPurchaseHistoryDto);
  }
}
