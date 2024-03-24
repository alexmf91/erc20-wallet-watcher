import { Injectable } from '@nestjs/common';
import {
  ethers,
  formatEther,
  formatUnits,
  type Contract,
  type JsonRpcProvider,
} from 'ethers';

import { chainlinkPriceFeedAbi } from './contract';

@Injectable()
export class EthersService {
  private provider: JsonRpcProvider;
  private contract: Contract;
  private priceFeedContract: Contract;

  constructor(
    rpcProviderUrl: string,
    tokenAddress: string,
    tokenAbi: any[],
    priceFeedAddress: string,
  ) {
    this.provider = new ethers.JsonRpcProvider(rpcProviderUrl);
    this.contract = new ethers.Contract(tokenAddress, tokenAbi, this.provider);
    this.priceFeedContract = new ethers.Contract(
      priceFeedAddress,
      chainlinkPriceFeedAbi,
      this.provider,
    );
  }

  async getTokenBalance(accountAddress: string): Promise<number> {
    const balance = await this.contract.balanceOf(accountAddress);
    return +formatEther(balance);
  }

  async getTokenTotalSupply(): Promise<number> {
    const totalSupply = await this.contract.totalSupply();
    return +formatEther(totalSupply);
  }

  async getTokenUsdPrice(): Promise<{ price: number; unit: string }> {
    const decimals = await this.priceFeedContract.decimals();
    const [, price] = await this.priceFeedContract.latestRoundData();

    return { price: parseFloat(formatUnits(price, decimals)), unit: 'USD' };
  }

  async getTokenDetails(): Promise<{
    name: string;
    symbol: string;
    decimals: number;
    totalSupply: number;
  }> {
    const [name, symbol, decimals, totalSupply] = await Promise.all([
      this.contract.name(),
      this.contract.symbol(),
      this.contract.decimals().then((decimalsBigInt) => Number(decimalsBigInt)),
      this.getTokenTotalSupply(),
    ]);

    return { name, symbol, decimals, totalSupply };
  }
}
