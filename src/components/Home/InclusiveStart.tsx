import Image from "next/image";
import React from "react";
import { Divider } from "../common/Divider";

export const InclusiveStart = () => {
  const data = [
    {
      id: 1,
      title: "Fair Auction",
      desc: "The auction is held in ETH and starts with a fully diluted valuation (FDV) of $5M, fixing a $0.0005 price for $GEAR. The price will increase after the first $500k raised in ETH equivalent. The public sale offers 10% of the $GEAR supply."
    },
    {
      id: 2,
      title: "Open Participation",
      desc: "There is no hard cap on the public sale and no limit on how much ETH could be allocated per wallet."
    },
    {
      id: 3,
      title: "Fair Distribution",
      desc: "There was no pre-sale or VC investment. All purchases will be settled at the same price based on the total amount deposited. Tokens will be 100% unlocked at TGE."
    },
    {
      id: 4,
      title: "Referral Bonus",
      desc: "Users can share a referral link and claim 3% of all referred investments made through it after the launch."
    }
  ];
  return (
    <div id="fairlaunch" className="py-12 my-8">
      <div className="relative mx-auto max-w-[calc(1200px+64px)] px-4 md:px-8">
        <div className="relative z-10">
          <p className="text-[25px] md:text-[50px] text-center text-primary">
            A Transparent and Inclusive Start
          </p>
          <div className="-mt-4 max-w-[1060px] mx-auto">
            <Divider />
          </div>
          <p className="text-center max-w-[944px] mx-auto">
            The GEAR token fair launch is designed to create equal opportunities for all participants
            and ensure the community benefits from the very beginning. Here’s how it works:
          </p>
          <div className="mt-12 flex justify-center flex-wrap md:gap-4 ">
            {data.map((val) => (
              <div
                key={val.id}
                className=" bg-gradient-to-b from-[#002B2600] to-[#004F45] max-w-[285px] w-full mx-auto border-b border-primary border-b-2 p-4"
              >
                <div className="flex flex-col items-center justify-center">
                  <p className="leading-[1] text-[24px] text-primary pt-6 pb-4 text-center">
                    {val.title}
                  </p>
                  <p className="text-center mt-3 text-base">{val.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Image
          className="hidden md:block absolute -top-8 -left-8"
          src={"/why/dots-1.png"}
          width={164}
          height={164}
          alt="dots"
        />
        <Image
          className="absolute -top-[35px] right-[32%]"
          src={"/why/dots-2.png"}
          width={161}
          height={161}
          alt="dots"
        />
      </div>
    </div>
  );
};
