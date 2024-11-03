import { IsUUID } from 'class-validator';

export class DispatchOrderDto {
  @IsUUID('4')
  customerId: string;
}
