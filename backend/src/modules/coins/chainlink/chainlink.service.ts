import { Injectable } from '@nestjs/common';
import { EthersService } from 'src/modules/ethers';

@Injectable()
export class ChainlinkService {
  constructor(private ethersService: EthersService) {}

  getBalance(address: string) {
    return this.ethersService.getTokenBalance(address);
  }

  getTotalSupply() {
    return this.ethersService.getTokenTotalSupply();
  }

  getUsdPrice() {
    return this.ethersService.getTokenUsdPrice();
  }

  getDetails() {
    return this.ethersService.getTokenDetails();
  }
}
