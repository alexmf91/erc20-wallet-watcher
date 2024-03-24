import { Module } from '@nestjs/common';

import { EthersModule } from 'src/modules/ethers';

import { ChainlinkController } from './chainlink.controller';
import { ChainlinkService } from './chainlink.service';
import {
  chainlinkTokenABI,
  chainlinkTokenAddress,
  chainlinkUsdPriceFeedAddress,
} from './contract';

@Module({
  imports: [
    EthersModule.forRootAsync({
      tokenAddress: chainlinkTokenAddress,
      tokenAbi: chainlinkTokenABI,
      priceFeedAddress: chainlinkUsdPriceFeedAddress,
    }),
  ],
  controllers: [ChainlinkController],
  providers: [ChainlinkService],
})
export class ChainlinkModule {}
