import { ApiProperty } from '@nestjs/swagger';

export class GetBalanceResponseDto {
  @ApiProperty({
    description: 'LINK balance of the wallet',
    example: 10,
  })
  balance: number;

  @ApiProperty({
    description: 'Equivalent balance in USD',
    example: 1000,
  })
  balanceInUSD: number;
}
