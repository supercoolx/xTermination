import { isAddress, type Abi, type Address } from "viem";
import FairLaunchABI from "./abis/FairLaunch.json";
import { erc20Abi } from 'viem'

export const RewardTokenAddress = "0xd18C016A3eDB4B734E85255fbfd7e2B614f7CE5F" as Address;
export const FairLaunchAddress = "0x98d61Ae3aa07930ca734794CA51B666383628906" as Address;

export const rewardToken = {
    abi: erc20Abi,
    address: RewardTokenAddress,
    chainId: 97,
}

export const fairLaunch = {
    abi: FairLaunchABI as Abi,
    address: FairLaunchAddress,
    chainId: 97,
} as const;
