import { ApiProperty } from '@nestjs/swagger';

export class GetDetailsResponseDto {
  @ApiProperty({
    description: 'Name of the token',
    example: 'Chainlink Token',
  })
  name: string;

  @ApiProperty({
    description: "Token's symbol",
    example: 'LINK',
  })
  symbol: string;

  @ApiProperty({
    description: 'Number of decimal places the token uses',
    example: 18,
  })
  decimals: number;

  @ApiProperty({
    description: "Token's total supply",
    example: 1000,
  })
  totalSupply: number;
}
