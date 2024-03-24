import { Test, TestingModule } from '@nestjs/testing';
import { ChainlinkService } from './chainlink.service';
import { EthersService } from 'src/modules/ethers';

describe('ChainlinkService', () => {
  let service: ChainlinkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChainlinkService,
        {
          provide: EthersService,
          useValue: {
            getTokenBalance: jest.fn(),
            getTokenTotalSupply: jest.fn(),
            getTokenUsdPrice: jest.fn(),
            getTokenDetails: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ChainlinkService>(ChainlinkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
