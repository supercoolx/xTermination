"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Header } from "../../Layout/Header";
import { LineChart } from "../../common/LineChart";
import { Welcome } from "./Welcome";
import { Connected } from "./Connected";

import { useAccount, useReadContracts } from "wagmi";
import { cn } from "@/lib/utils";

import { fairLaunch, FairLaunchAddress } from "@/contract";
import { formatEther } from "viem";
import { useQuery } from '@tanstack/react-query';

import { http, createPublicClient } from 'viem'
import { bscTestnet } from 'viem/chains'

export const publicClient = createPublicClient({
  chain: bscTestnet,
  transport: http(),
})

const fetchEthPrice = async () => {
  const response = await fetch('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD');
  const data = await response.json();
  return data.USD;
};

export const HeroSection = () => {
  const { isConnected } = useAccount();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [totalRaised, setTotalRaised] = useState<bigint | undefined>();

  const { data: updatingData, refetch: refetchData, isLoading, isSuccess, isError } = useReadContracts({
    contracts: [
      { ...fairLaunch, functionName: "deadline" },
      { ...fairLaunch, functionName: "lastPrice" },
      { ...fairLaunch, functionName: "totalTokens" },
      { ...fairLaunch, functionName: "tokensSold" },
    ]
  })

  const endTime = updatingData?.[0].result;
  const lastPrice = updatingData?.[1].result?.toString() ?? "0";
  const totalCap = updatingData?.[2].result?.toString() ?? "0";
  const tokensSold = updatingData?.[3].result?.toString() ?? "0";
  const initialPrice = 0.001;

  useEffect(() => {
    if (!publicClient) return;

    const fetchBalance = async () => {
      const balance = await publicClient.getBalance({
        address: FairLaunchAddress,
      });
      setTotalRaised(balance);
    };

    fetchBalance();
  }, [publicClient]);

  useEffect(() => {
    if (!endTime) return;

    const timer = setInterval(() => {
      const endDate = new Date(Number(endTime.toString()) * 1000);
      const now = new Date();
      const diff = endDate.getTime() - now.getTime();

      if (diff <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  const { data: ethPrice = 0 } = useQuery({
    queryKey: ['ethPrice'],
    queryFn: fetchEthPrice,
    refetchInterval: 30000, // Refetch every 30 seconds
    staleTime: 30000, // Consider data stale after 30 seconds
  });

  const chartBtnClassName = `text-center bg-white/10 border-b-[2px] py-[10px] border-white`;
  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="absolute top-0 left-0 w-full h-auto z-[999] ">
        <Header />
      </div>

      <div className="flex-1 relative z-10 flex-col flex items-center justify-center">
        <div
          className={cn(
            "main-content pt-24 md:pt-48 pb-12 w-full relative z-10 px-8 space-y-5 mx-auto h-full",
            isConnected
              ? "max-w-[calc(1180px)] pt-20 md:pt-32 pb-8"
              : "max-w-[calc(1188px+64px)]"
          )}
        >
          <div className="relative lg:col-span-2 p-5 z-50 bg-black/75 text-white w-full flex flex-col md:flex-row gap-4 justify-between items-center">
            <p>Time Remaining</p>
            <div className="flex gap-4">
              <div className="flex flex-col items-center justify-center">
                <p className="text-[20px] text-primary ">{timeLeft.days}</p>
                <p className="text-[10px]">Day</p>
              </div>
              <Image src={"/hero/double-dots.svg"} width={4} height={13} alt="double dots" />
              <div className="flex flex-col items-center justify-center">
                <p className="text-[20px] text-primary ">{timeLeft.hours}</p>
                <p className="text-[10px]">Hours</p>
              </div>
              <Image src={"/hero/double-dots.svg"} width={4} height={13} alt="double dots" />
              <div className="flex flex-col items-center justify-center">
                <p className="text-[20px] text-primary ">{timeLeft.minutes}</p>
                <p className="text-[10px]">Minutes</p>
              </div>
              <Image src={"/hero/double-dots.svg"} width={4} height={13} alt="double dots" />
              <div className="flex flex-col items-center justify-center">
                <p className="text-[20px] text-primary ">{timeLeft.seconds}</p>
                <p className="text-[10px]">Seconds</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center gap-5">
            {isConnected ? <Connected /> : <Welcome />}

            <div className="w-full h-full flex justify-center flex-1">
              <div className="relative h-full bg-black lg:max-w-[550px] w-full p-5">
                <div className="relative z-10 flex flex-col justify-between h-full ">
                  <div className="flex items-center justify-between">
                    <p className="text-[18px] lg:text-[28px]">$GEAR Price Chart</p>
                    <Image
                      className="max-w-[60px] lg:max-w-[97px]"
                      src={"/top-chart/live.svg"}
                      width={97}
                      height={45}
                      alt="live"
                    />
                  </div>
                  <div className="min-h-[180px]">
                    <LineChart totalCap={Number(totalCap)} tokensSold={Number(tokensSold)} initialPrice={Number(initialPrice) * ethPrice} lastPrice={Number(formatEther(BigInt(lastPrice))) * ethPrice} />
                  </div>
                  {/* <Image
                  className="py-5"
                  src={"/top-chart/chart-img.png"}
                  width={510}
                  height={237}
                  alt="chart"
                /> */}
                  {/* bottom buttons */}
                  <div className="grid grid-cols-2 gap-[10px]">
                    <button className={chartBtnClassName}>
                      <p className="text-xs">Price</p>
                      <p className="text-primary text-[24px]">${(Number(formatEther(BigInt(lastPrice))) * ethPrice).toLocaleString()}</p>
                    </button>
                    <button className={chartBtnClassName}>
                      <p className="text-xs">FDV</p>
                      <p className="text-primary text-[24px]">
                        ${(Number(formatEther(BigInt(lastPrice))) * Number(BigInt(totalCap)) * ethPrice).toLocaleString()}
                      </p>
                    </button>
                    <button className={chartBtnClassName}>
                      <p className="text-xs">Total Raise</p>
                      <p className="text-primary text-[24px]">{parseFloat(formatEther(totalRaised ?? BigInt(0))).toFixed(3)} ETH</p>
                    </button>
                    <button className={chartBtnClassName}>
                      <p className="text-xs">Total Supply</p>
                      <p className="text-primary text-[24px]">10B</p>
                    </button>
                  </div>
                </div>
                <Image
                  className="absolute top-0 left-0 pointer-events-none"
                  width={33}
                  height={33}
                  src={"/top-chart/top-left.svg"}
                  alt="top left"
                />
                <Image
                  className="absolute bottom-0 right-0 pointer-events-none"
                  width={43}
                  height={43}
                  src={"/top-chart/bottom-right.svg"}
                  alt="top left"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 w-full mt-8">
          <Image
            src={"/hero/bottom-lines.png"}
            width={1400}
            height={57}
            alt="bottom lines"
            className="w-full h-auto"
          />
        </div>
      </div>

      {/* bg images */}
      <Image
        className="object-cover absolute top left-0 w-full h-full"
        src={"/hero/Hero.png"}
        width={1440}
        height={810}
        alt="Hero"
      />
      <Image
        className="absolute top-[40px] lg:top-[61px] left-0 w-full px-4   h-[83%]"
        src={"/hero/hero-lines.png"}
        width={1386}
        height={668}
        alt="Hero"
      />
    </div>
  );
};
