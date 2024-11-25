import React from "react";
import { Divider } from "../common/Divider";
import Image from "next/image";

export const Features = () => {
  const data = [
    {
      id: 1,
      title: "Custom Build",
      desc: "Create armored vehicles from scratch using various unique parts.",
      imgSrc: "/features/1.png"
    },
    {
      id: 2,
      title: "Strategic Upgrades",
      desc: "Earn resources to enhance your vehicle's offensive and defensive capabilities.",
      imgSrc: "/features/2.png"
    },
    {
      id: 3,
      title: "Unique Elements:",
      desc: "Combine weapons, armor, and enhancements for a distinct combat advantage.",
      imgSrc: "/features/3.png"
    }
  ];
  return (
    <div id="features" className="py-12 my-8">
      <div className="relative mx-auto max-w-[calc(1200px+64px)] px-4 md:px-8">
        <div className="relative z-10">
          <p className="text-[25px] md:text-[50px] text-center text-primary">Features</p>
          <div className="-mt-4 max-w-[280px] mx-auto">
            <Divider />
          </div>
          <p className="text-center max-w-[944px] mx-auto">
            Each armored vehicle can be built from the ground up by combining different unique
            elements.
          </p>
          <div className="mt-12 flex flex-wrap gap-6 md:gap-4 justify-center">
            {data.map((val) => (
              <div key={val.id} className="max-w-[346px] w-full mx-auto">
                <div className="flex flex-col items-center justify-center">
                  <Image src={val.imgSrc} width={223} height={152} alt={val.title} />
                  <p className="text-[24px] text-primary pt-6 pb-4 text-center">{val.title}</p>
                  <p className="text-center text-base">{val.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Image
          className="absolute -top-4 left-0"
          src={"/features/dots-1.png"}
          width={120}
          height={120}
          alt="dots"
        />
        <Image
          className="absolute -top-[0px] left-[37.5%]"
          src={"/features/dots-2.png"}
          width={68}
          height={69}
          alt="dots"
        />
      </div>
    </div>
  );
};
