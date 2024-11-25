import { Spinner } from "@/components/ui/Spinner";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useState } from "react";
import { useAccount, useReadContracts, useReadContract, useWriteContract, useBlockNumber, usePublicClient, useBalance } from "wagmi";
import { fairLaunch, rewardToken, FairLaunchAddress } from "@/contract";
import { erc20Abi, formatEther, parseEther, parseUnits } from "viem";
import { ToastContainer, toast, Bounce } from 'react-toastify';

const ListItem = ({ leftText, rightText }: { leftText: string; rightText: string }) => {
  return (
    <div className="flex justify-between items-center">
      <p className="text-white/50">{leftText}</p>
      <p>{rightText}</p>
    </div>
  );
};

export const Connected = () => {
  const [isBuying, setIsBuying] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);
  const { address } = useAccount();
  const [depositAmount, setDepositAmount] = useState<string>("");
  const publicClient = usePublicClient();

  const toastId = React.useRef<string | number | null>(null);

  const buyHandler = () => {
    setIsBuying(true);
  };

  const claimHandler = () => {
    setIsClaiming(true);
  };

  const { data: currentBalance } = useBalance({
    address: address,
  });

  const { data: updatingData, refetch: refetchData } = useReadContracts({
    contracts: [
      { ...fairLaunch, functionName: "ethDeposited", args: [address!] },
      { ...fairLaunch, functionName: "getAllocation", args: [address!] },
    ]
  })

  const depositedAmount = formatEther(BigInt(updatingData?.[0].result?.toString() ?? "0"));
  const claimableTokenAmount = formatEther(BigInt(updatingData?.[1].result?.toString() ?? "0"));

  const referralAddress = (() => {
    if (typeof window === 'undefined') return "0x0000000000000000000000000000000000000000";

    const params = new URLSearchParams(window.location.search);
    const ref = params.get('referralAddress');

    // Validate if it's a valid ethereum address
    return ref?.match(/^0x[a-fA-F0-9]{40}$/)
      ? ref
      : "0x0000000000000000000000000000000000000000";
  })();

  const copyReferral = async () => {
    const baseUrl = window.location.origin;
    try {
      await navigator.clipboard.writeText(`${baseUrl}\?referralAddress=${address}`);
      toastId.current = toast.success("Referral link copied!");
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  }

  const {
    writeContractAsync: writeContract,
  } = useWriteContract();

  async function buy() {
    if (!publicClient) return;  // Add check here where it's needed
    setIsBuying(true);
    toastId.current = toast.loading("Pending...");
    try {
      // if (allowance < depositAmount) {
      //   toast.update(toastId.current, { render: "Approving Token..." });
      //   const txRes = await writeContract({
      //     ...depositToken,
      //     functionName: "approve",
      //     args: [FairLaunchAddress, parseUnits(depositAmount as `${number}`, 18)],
      //   });
      //   await publicClient.waitForTransactionReceipt({ hash: txRes });
      // }
      toast.update(toastId.current, { render: "Buying Token..." });
      const tx = await writeContract({
        ...fairLaunch,
        functionName: "deposit",
        args: [referralAddress],
        value: parseEther(depositAmount),
      });
      await publicClient.waitForTransactionReceipt({ hash: tx });
      toast.update(toastId.current, { render: "Buy token is done", type: "success", autoClose: 3000, isLoading: false });
    }
    catch (e: any) {
      console.error(e);
      refetchData();
      setIsBuying(false);
      toast.update(toastId.current, { render: e?.shortMessage || e?.message || e, type: "error", autoClose: 3000, isLoading: false });
    } finally {
      setDepositAmount("");
      refetchData();
      setIsBuying(false);
      // toast.update(toastId.current, { render: "Buy token is done", type: "success", autoClose: 3000, isLoading: false });
    }
  }

  return (
    <div className="relative w-full h-full bg-black/75 p-5 flex-1">
      <div className="flex justify-between items-center">
        <p>Buy #GEAR</p>
        <button className="border-2 border-primary px-2 py-1 flex items-center gap-2" onClick={() => copyReferral()}>
          <Image src={"/hero/copy.svg"} width={16} height={16} alt="copy" />
          <span>Referral link</span>
        </button>
      </div>
      <div className="py-2 px-4 bg-white/10 mt-6 flex items-center justify-between">
        <input
          placeholder="0"
          className="focus:outline-none bg-transparent border-none  text-white/50"
          // min={0}
          value={depositAmount}
          onKeyPress={(event) => {
            const keyCode = event.keyCode || event.which;
            const keyValue = String.fromCharCode(keyCode);
            // Allow numbers and single decimal point
            if (!/[0-9.]/.test(keyValue) || 
                (keyValue === '.' && depositAmount.includes('.'))) {
              event.preventDefault();
            }
          }}
          onChange={(e) => {
            setDepositAmount(e.target.value);
          }}
        />
        <div className="text-primary flex items-start gap-4">
          <span className="h-[26px] w-[2px] block bg-white"></span>
          <p className="cursor-pointer" onClick={() => { setDepositAmount(parseFloat(currentBalance?.formatted ?? "0").toFixed(3)) }}>MAX</p>
        </div>
      </div>
      <p className="text-right text-white/50 mt-1">Your Balance: {parseFloat(currentBalance?.formatted ?? "0").toFixed(3)} ETH</p>
      <div className="mt-6 flex flex-col gap-8">
        <ListItem leftText="Spent" rightText={`${depositedAmount} ETH`} />
        <ListItem leftText="Redeem" rightText={`${claimableTokenAmount} $GEAR`} />
        {/* <ListItem leftText="Your Referral earnings" rightText="0 eth" />
        <ListItem leftText="Pending Referral Earnings" rightText="0 eth" /> */}
      </div>
      <div className="mt-6 flex-col flex gap-4">
        <button
          onClick={buy}
          className={cn("relative group", isBuying && "pointer-events-none")}
        >
          <div
            className={cn(
              "opacity-0 pointer-events-none absolute top-[53%] left-1/2 -translate-x-1/2 -translate-y-1/2",
              isBuying && "opacity-100"
            )}
          >
            <Spinner />
          </div>
          <Image
            className={cn("w-full h-auto relative", isBuying && "blur-sm")}
            width={510}
            height={56}
            src={"/buttons/buy-normal.svg"}
            alt="buy"
          />
          <Image
            className={cn(
              "opacity-0 group-hover:opacity-100 transition-all duration-300 absolute top-0 left-0 w-full h-auto",
              isBuying && "!opacity-0"
            )}
            width={510}
            height={56}
            src={"/buttons/buy-active.svg"}
            alt="buy"
          />
        </button>
        <button
          // onClick={claimHandler}
          className={cn("relative group", "cursor-not-allowed")}
        >
          <div
            className={cn(
              "opacity-0 pointer-events-none absolute top-[53%] left-1/2 -translate-x-1/2 -translate-y-1/2",
              isClaiming && "opacity-100"
            )}
          >
            <Spinner />
          </div>
          <Image
            className={cn("w-full h-auto relative", isClaiming && "blur-sm")}
            width={510}
            height={56}
            src={"/buttons/claim-normal.svg"}
            alt="buy"
          />
          <Image
            className={cn(
              "opacity-0 group-hover:opacity-100 transition-all duration-300 absolute top-0 left-0 w-full h-auto",
              isClaiming && "!opacity-0"
            )}
            width={510}
            height={56}
            src={"/buttons/claim-normal.svg"}
            alt="buy"
          />
        </button>
      </div>
      {/* Corners */}
      <Image
        width={43}
        height={43}
        alt="corner"
        className="absolute top-0 left-0 pointer-events-none"
        src="/hero/corners/tl.png"
      />
      <Image
        width={43}
        height={43}
        alt="corner"
        className="absolute top-0 right-0 pointer-events-none"
        src="/hero/corners/tr.png"
      />
      <Image
        width={43}
        height={43}
        alt="corner"
        className="absolute bottom-0 left-0 pointer-events-none"
        src="/hero/corners/bl.png"
      />
      <Image
        width={43}
        height={43}
        alt="corner"
        className="absolute bottom-0 right-0 pointer-events-none"
        src="/hero/corners/br.png"
      />
    </div>
  );
};
