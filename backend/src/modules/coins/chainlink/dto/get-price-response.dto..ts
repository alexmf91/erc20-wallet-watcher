import { ApiProperty } from '@nestjs/swagger';

export class GetPriceResponseDto {
  @ApiProperty({
    description: 'Current token price, subject to market changes',
    example: 10,
  })
  price: number;

  @ApiProperty({
    description: 'Currency code for the price',
    example: 'USD',
  })
  unit: string;
}
