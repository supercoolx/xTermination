import React from "react";
import { Divider } from "../common/Divider";
import Image from "next/image";

export const WhyXtrMatters = () => {
  const listData = [
    {
      id: 1,
      imgSrc: "/why/in-game-upgrade.png",
      title: "In-Game Currency",
      desc: "Use $GEAR to buy, sell, and trade tanks, ammo, and unique customizations on Xtermination marketplace. Make strategic bets, collect valuable loot, and unlock premium assets to give you the upper hand on the battlefield."
    },
    {
      id: 2,
      imgSrc: "/why/premium-content.png",
      title: "Staking for upgrades",
      desc: "Stake $GEAR to level up your Builder Workshop, boost your tanks, and craft more powerful ammunition. The more you stake, the better your tools and capabilities for creating winning machines."
    },
    {
      id: 3,
      imgSrc: "/why/staking-rewards.png",
      title: "Power Boosts",
      desc: "When the heat is on, $GEAR lets you level up your health, stack extra lives, and boost your power—giving you an edge no one else can match. With $GEAR, you don’t just play the game; you dominate it."
    },
  ];
  return (
    <div className="py-12 my-8">
      <div className="relative mx-auto max-w-[calc(1200px+64px)] px-4 md:px-8">
        <div className="relative z-10">
          <p className="text-[25px] md:text-[50px] text-center text-primary">Why $GEAR Matters</p>
          <div className="-mt-4 max-w-[516px] mx-auto">
            <Divider />
          </div>
          <p className="text-center max-w-[944px] mx-auto">
            The GEAR token is more than just a currency; it’s the backbone of the XTERMINATION
            ecosystem, offering exclusive benefits and driving the in-game economy. Here’s what GEAR
            brings to players:
          </p>
          <div className="mt-12 flex flex-wrap gap-6 md:gap-4 justify-center">
            {listData.map((val) => (
              <div key={val.id} className="max-w-[316px] w-full mx-auto">
                <div className="flex flex-col items-center justify-center">
                  <Image src={val.imgSrc} width={100} height={86} alt={val.title} />
                  <p className="text-[24px] text-primary py-4 text-center">{val.title}</p>
                  <p className="text-center text-base">{val.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Image
          className="absolute top-0 right-0"
          src={"/why/dots-1.png"}
          width={164}
          height={164}
          alt="dots"
        />
        <Image
          className="absolute -top-[32px] left-[32.5%]"
          src={"/why/dots-2.png"}
          width={161}
          height={161}
          alt="dots"
        />
      </div>
    </div>
  );
};
