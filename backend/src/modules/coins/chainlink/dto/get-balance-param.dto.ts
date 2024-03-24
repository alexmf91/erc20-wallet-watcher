import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class GetBalanceParamDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^0x[a-fA-F0-9]{40}$/, {
    message: 'address must be a valid Ethereum wallet address',
  })
  address: string;
}
