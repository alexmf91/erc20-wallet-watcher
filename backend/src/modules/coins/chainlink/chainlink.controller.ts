import {
  Controller,
  Get,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ChainlinkService } from './chainlink.service';
import {
  GetBalanceParamDto,
  GetBalanceResponseDto,
  GetDetailsResponseDto,
  GetPriceResponseDto,
  GetTotalSupplyResponseDto,
} from './dto';

@ApiTags('Coins')
@Controller('chainlink')
export class ChainlinkController {
  constructor(private readonly chainlinkService: ChainlinkService) {}

  @Get('balance/:address')
  @ApiOperation({
    summary:
      'Retrieves the LINK balance for a specified wallet address in both the native token and its equivalent in USD',
  })
  @ApiResponse({
    status: 200,
    description: 'Balance fetched successfully',
    type: GetBalanceResponseDto,
  })
  @ApiParam({
    name: 'address',
    required: true,
    description: 'Wallet address to query the LINK balance for',
    type: 'string',
    example: '0x5a821936C1a5606d9Bd870507B52B69964f7318b',
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  async getBalance(@Param() params: GetBalanceParamDto) {
    const [balance, priceDetails] = await Promise.all([
      this.chainlinkService.getBalance(params.address),
      this.chainlinkService.getUsdPrice(),
    ]);
    const balanceInUSD = +(balance * priceDetails.price).toFixed(2);

    return { balance, balanceInUSD };
  }

  @Get('total-supply')
  @ApiOperation({
    summary:
      'Fetches the total supply of LINK tokens in both native units and USD equivalent',
  })
  @ApiResponse({
    status: 200,
    description: 'Total supply fetched successfully',
    type: GetTotalSupplyResponseDto,
  })
  async getTotalSupply() {
    const [totalSupply, priceDetails] = await Promise.all([
      this.chainlinkService.getTotalSupply(),
      this.chainlinkService.getUsdPrice(),
    ]);

    const totalSupplyInUSD = +(totalSupply * priceDetails.price).toFixed(2);

    return { totalSupply, totalSupplyInUSD };
  }

  @Get('price')
  @ApiOperation({
    summary: 'Retrieves the current price of the LINK token in USD',
  })
  @ApiResponse({
    status: 200,
    description: 'Price fetched successfully',
    type: GetPriceResponseDto,
  })
  async getUsdPrice() {
    return await this.chainlinkService.getUsdPrice();
  }

  @Get('details')
  @ApiOperation({
    summary:
      'Provides detailed information about the LINK token, including name, symbol, decimals, and total supply',
  })
  @ApiResponse({
    status: 200,
    description: 'Details fetched successfully',
    type: GetDetailsResponseDto,
  })
  async getDetails() {
    return await this.chainlinkService.getDetails();
  }
}
