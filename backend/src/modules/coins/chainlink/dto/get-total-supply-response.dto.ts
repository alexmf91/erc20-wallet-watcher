import { ApiProperty } from '@nestjs/swagger';

export class GetTotalSupplyResponseDto {
  @ApiProperty({
    description: 'Total LINK supply',
    example: 10,
  })
  totalSupply: number;

  @ApiProperty({
    description: 'Total LINK supply in USD',
    example: 1000,
  })
  totalSupplyInUSD: number;
}
