import { headerNavItem } from "@/config";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MobileNav } from "./MobileNav";
import { ConnectWallet } from "../common/ConnectWallet";
import { cn } from "@/lib/utils";

export const Header = () => {
  return (
    <div className="p-4 grid grid-cols-[auto,1fr,auto]">
      <button>
        <Image
          className="max-w-[150px] lg:max-w-[319px]"
          src={"/header/x-termination-logo.svg"}
          width={319}
          height={44}
          alt="logo"
        />
      </button>

      <div className="hidden lg:block border-b border-b-[#0BFFE2] mb-[0.5px] ">
        <div className="flex justify-around gap-3">
          {headerNavItem.map((val, index) => (
            <Link
              className={`cursor-pointer group mt-2 hover:text-primary transition-all duration-300 text-sm xl:text-base relative ${
                index === 0 ? "text-primary" : ""
              }`}
              href={val.href}
              key={val.title}
            >
              <svg
                className={cn(
                  "group-hover:opacity-100 opacity-0 absolute -top-2 left-1/2 -translate-x-1/2",
                  index === 0 && "opacity-100"
                )}
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0.847656L4.99684 5.84437L10 0.847656H0Z" fill="#0BFFE2" />
              </svg>

              {val.title}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex justify-center items-center lg:hidden border-b-[0.1px] border-b-[#0EFFE2] mb-[2.5px]">
        <MobileNav />
      </div>

      <ConnectWallet />
    </div>
  );
};
