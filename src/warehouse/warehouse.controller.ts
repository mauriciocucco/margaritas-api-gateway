import { Controller, Get } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';

@Controller('warehouse')
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

  @Get('inventory')
  async getInventory() {
    return this.warehouseService.getInventory();
  }

  @Get('purchase-history')
  async getPurchaseHistory() {
    return this.warehouseService.getPurchaseHistory();
  }
}
