import Image from "next/image";
import React from "react";

export const About = () => {
  return (
    <div id="token" className="py-12 my-8">
      <div className="relative mx-auto w-full max-w-[calc(930px+64px)] md:px-8 ">
        <div className="grid grid-cols-[auto,1fr,auto] gap-[30px] md:gap-[60px]">
          <div>
            <Image width={32} height={294} src={"/about/left.png"} alt="left" />
          </div>
          <div>
            <div className="flex flex-col items-center justify-center">
              <Image
                width={100}
                height={86}
                src={"/about/about-logo.png"}
                alt="about logo"
                className="max-w-[70px] md:max-w-[100px]"
              />
              <p className="text-[25px] md:text-[50px] text-center text-primary">
                What is $GEAR Token?
              </p>
              <p className="text-center text-xs md:text-base mt-4">
                $GEAR is the official in-game currency for Xtermination, bringing players ultimate control over their gameplay and upgrades.
                With $GEAR, players can customize, upgrade, and enhance their gameplay like never before. Become part of a dynamic economy where skill, strategy, and creativity are rewarded—on and off the battlefield.
              </p>
            </div>
          </div>
          <div>
            <Image width={32} height={294} src={"/about/right.png"} alt="left" />
          </div>
        </div>

        <Image
          className="absolute top-[30%] right-[15%]"
          src={"/about/bg-dots.png"}
          alt="Bg Dots"
          width={109}
          height={109}
        />
      </div>
    </div>
  );
};
