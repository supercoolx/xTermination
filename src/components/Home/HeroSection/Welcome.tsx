import Image from "next/image";
import React from "react";
import DividerOne from "../../../../public/hero/divider-1.png";
import { useConnectModal } from "@rainbow-me/rainbowkit";

export const Welcome = () => {
  const { openConnectModal } = useConnectModal();

  const onBuyNowClick = () => {
    if (openConnectModal) openConnectModal();
  };
  return (
    <div className="flex-1">
      <p className="text-primary text-[40px] sm:text-[50px] text-center lg:text-left lg:text-[64px] leading-[1] lg:leading-[84px]">
        Introducing <span className="text-[40px] lg:text-[72px]">$GEAR</span> Token
      </p>
      <Image className="my-6" src={DividerOne} alt="Divider One" />
      <p className="text-center lg:text-left text-base lg:text-[18px]">
        Power up your Xtermination experience
      </p>
      <div className="flex justify-center lg:justify-start">
        <button onClick={onBuyNowClick} className="mt-6">
          <Image src={"/buttons/buy-token.svg"} width={183} height={38} alt="Buy Token" />
        </button>
      </div>
    </div>
  );
};
