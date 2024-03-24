import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import type { EnvironmentVariables } from 'src/config/environments';
import { EthersModuleOptions } from './ethers.config.interface';
import { EthersService } from './ethers.service';

@Global()
@Module({})
export class EthersModule {
  static forRootAsync(options: EthersModuleOptions): DynamicModule {
    return {
      module: EthersModule,
      providers: [
        {
          provide: 'ETHERS_SERVICE_OPTIONS',
          useValue: options,
        },
        {
          provide: EthersService,
          useFactory: (
            configService: ConfigService<EnvironmentVariables>,
            ethersOptions: EthersModuleOptions,
          ) => {
            const rpcProviderUrl = configService.get('RPC_PROVIDER_URL', {
              infer: true,
            });
            return new EthersService(
              rpcProviderUrl,
              ethersOptions.tokenAddress,
              ethersOptions.tokenAbi,
              ethersOptions.priceFeedAddress,
            );
          },
          inject: [ConfigService, 'ETHERS_SERVICE_OPTIONS'],
        },
      ],
      exports: [EthersService],
    };
  }
}
