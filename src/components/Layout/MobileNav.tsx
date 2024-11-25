import React from "react";
import {
  Sheet,
  SheetContent,
  // SheetDescription,
  // SheetHeader,
  // SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { AlignJustifyIcon } from "lucide-react";
import { headerNavItem } from "@/config";
import Link from "next/link";
import { DialogTitle } from "@radix-ui/react-dialog";

export const MobileNav = () => {
  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <AlignJustifyIcon size={16} color="#0EFFE2" />
        </SheetTrigger>
        <SheetContent className="bg-black pt-16">
          <DialogTitle className="ssr-only hidden">MobileNav bar</DialogTitle>
          <div className="flex flex-col justify-around gap-3">
            {headerNavItem.map((val, index) => (
              <Link
                className={`mt-2 text-center text-sm xl:text-base relative ${
                  index === 0 ? "text-primary" : ""
                }`}
                href={val.href}
                key={val.title}
              >
                {index === 0 && (
                  <svg
                    className="absolute -top-2 left-1/2 -translate-x-1/2"
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 0.847656L4.99684 5.84437L10 0.847656H0Z" fill="#0BFFE2" />
                  </svg>
                )}

                {val.title}
              </Link>
            ))}
          </div>
          {/* <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your account and remove
              your data from our servers.
            </SheetDescription>
          </SheetHeader> */}
        </SheetContent>
      </Sheet>
    </div>
  );
};
