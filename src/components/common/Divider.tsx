import Image from "next/image";
import React from "react";

export const Divider = () => {
  return (
    <div className="flex items-center justify-center">
      <Image
        width={600}
        height={8}
        className="my-6 w-full"
        src={"/hero/divider-1.png"}
        alt="Divider One"
      />
    </div>
  );
};
