import { Test, TestingModule } from '@nestjs/testing';
import { ChainlinkController } from './chainlink.controller';
import { ChainlinkService } from './chainlink.service';
import { GetBalanceParamDto } from './dto';
import { EthersService } from 'src/modules/ethers';

describe('ChainlinkController', () => {
  let controller: ChainlinkController;
  let service: ChainlinkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChainlinkController],
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

    controller = module.get<ChainlinkController>(ChainlinkController);
    service = module.get<ChainlinkService>(ChainlinkService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getBalance', () => {
    it('should return balance and balanceInUSD', async () => {
      const address = '0xTEST';
      const balance = 100;
      const priceDetails = { price: 2, unit: 'USD' };
      const expected = { balance, balanceInUSD: 200 };

      jest.spyOn(service, 'getBalance').mockResolvedValue(balance);
      jest.spyOn(service, 'getUsdPrice').mockResolvedValue(priceDetails);

      expect(
        await controller.getBalance({ address } as GetBalanceParamDto),
      ).toEqual(expected);
      expect(service.getBalance).toHaveBeenCalledWith(address);
      expect(service.getUsdPrice).toHaveBeenCalled();
    });
  });

  describe('getTotalSupply', () => {
    it('should return total supply and totalSupplyInUSD', async () => {
      const totalSupply = 1000;
      const priceDetails = { price: 2, unit: 'USD' };
      const expected = { totalSupply, totalSupplyInUSD: 2000 };

      jest.spyOn(service, 'getTotalSupply').mockResolvedValue(totalSupply);
      jest.spyOn(service, 'getUsdPrice').mockResolvedValue(priceDetails);

      expect(await controller.getTotalSupply()).toEqual(expected);
      expect(service.getTotalSupply).toHaveBeenCalled();
      expect(service.getUsdPrice).toHaveBeenCalled();
    });
  });

  describe('getUsdPrice', () => {
    it('should return the current price of the LINK token in USD', async () => {
      const priceDetails = { price: 3, unit: 'USD' };

      jest.spyOn(service, 'getUsdPrice').mockResolvedValue(priceDetails);

      expect(await controller.getUsdPrice()).toEqual(priceDetails);
      expect(service.getUsdPrice).toHaveBeenCalled();
    });
  });

  describe('getDetails', () => {
    it('should return LINK token details', async () => {
      const details = {
        name: 'ChainLink',
        symbol: 'LINK',
        decimals: 18,
        totalSupply: 1000,
      };

      jest.spyOn(service, 'getDetails').mockResolvedValue(details);

      expect(await controller.getDetails()).toEqual(details);
      expect(service.getDetails).toHaveBeenCalled();
    });
  });
});
