import Image from "next/image";
import React from "react";
import { Divider } from "../common/Divider";
import { socials } from "@/config";
import Link from "next/link";

export const Footer = () => {
  return (
    <div id="contact" className="min-h-[504px] relative">
      <div className="main-content px-4 relative z-10">
        <div className="py-12">
          <p className="text-[25px] md:text-[50px] text-center text-primary">Connect with Us!</p>
          <div className="-mt-4 max-w-[502px] mx-auto">
            <Divider />
          </div>
          <p className="text-center">
            Join the XTERMINATION community for the latest updates and events.
          </p>

          {/* all socials */}
          <div className="flex items-center justify-center gap-8 py-8 ">
            <Image src={"/socials/arrow-1.png"} width={39} height={32} alt="arrow-1" />
            {socials.map((val) => (
              <Link key={val.id} href={val.href} target="_blank" rel="noopener">
                <Image src={val.imgSrc} width={50} height={50} alt={val.id} />
              </Link>
            ))}
            <Image src={"/socials/arrow-2.png"} width={39} height={32} alt="arrow-1" />
          </div>
          <p className="text-[24px] text-center text-primary">IR@XTERMINATION.GG</p>
          <p className="text-[20px] text-center mt-2">Reach out for questions and partnerships.</p>
          <div className="flex justify-center">
            <Image
              className="mt-12"
              src={"/footer/divider.svg"}
              width={1200}
              height={11}
              alt="divider"
            />
          </div>
          <p className="text-white text-sm text-center mt-6">
            © 2024 XTERMINATION. All Rights Reserved.
          </p>
        </div>
      </div>
      <Image
        src={"/footer/footer-bg.png"}
        alt="footer background"
        width={1440}
        height={504}
        className="absolute top-0 left-0 w-full h-full object-cover object-top	"
      />
    </div>
  );
};
