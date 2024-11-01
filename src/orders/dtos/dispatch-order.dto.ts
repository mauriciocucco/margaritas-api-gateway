import { IsUUID } from 'class-validator';

export class DispatchOrderDto {
  @IsUUID('3')
  customerId: string;
}
