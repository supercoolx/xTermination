import Image from "next/image";
import React from "react";
import { Divider } from "../common/Divider";

export const Roadmap = () => {
  const data = [
    {
      id: 1,
      title: "Initial Development & Fairlaunch (Q4 2024)",
      desc: "Finalize game mechanics, launch the $GEAR token, and prepare for the fair launch while building the community."
    },
    {
      id: 2,
      title: "Beta Testing & Feedback (Q1 2025)",
      desc: "Conduct closed beta testing, optimize the game based on feedback, and launch the initial marketplace and community events."
    },
    {
      id: 3,
      title: "Public Launch & Core Features (Q2 2025)",
      desc: "Open the game to the public, expand the marketplace, introduce staking, and form strategic partnerships."
    },
    {
      id: 4,
      title: "Content Expansion (Q3-Q4 2025)",
      desc: "Release new arenas and events, integrate ranked play, launch official tournaments, and collaborate with gaming partners."
    }
  ];
  return (
    <div id="fairlaunch" className="py-12 my-8">
      <div className="relative mx-auto max-w-[calc(1200px+64px)] px-4 md:px-8">
        <div className="relative z-10">
          <p className="text-[25px] md:text-[50px] text-center text-primary">ROADMAP</p>
          <div className="-mt-4 max-w-[280px] mx-auto">
            <Divider />
          </div>

          <Image
            className="my-8"
            src={"/roadmap/progress.svg"}
            width={1200}
            height={24}
            alt="progress"
          />

          <div className="mt-12 flex justify-center flex-wrap md:gap-4 ">
            {data.map((val) => (
              <div key={val.id} className="  max-w-[270px] w-full mx-auto">
                <div className="flex flex-col items-center justify-center">
                  <div className="w-full flex items-center gap-2 pt-6 mb-[10px]">
                    <Image src={"/roadmap/arrow.svg"} width={16} height={16} alt="arrow" />
                    <p className="leading-[1] w-full  text-[24px] text-primary ">Phase {val.id}</p>
                  </div>
                  <p className="leading-[1] text-[20px] text-primary  pb-4 text-left">
                    {val.title}
                  </p>
                  <p className="text-left mt-1 text-base">{val.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Image
          className="hidden md:block absolute -top-4 left-[55%]"
          src={"/roadmap/dots-1.png"}
          width={120}
          height={120}
          alt="dots"
        />
      </div>
    </div>
  );
};
