"use client";
// components/CustomConnectButton.tsx or components/CustomConnectButton.jsx

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";

export const ConnectWallet = () => {
  return (
    <div id="connect-wallet-btn">
      <ConnectButton.Custom>
        {({
          account,
          chain,
          mounted,
          openAccountModal,
          openChainModal,
          openConnectModal,
          authenticationStatus
        }) => {
          // If your app doesn't use authentication, you can remove
          // the `authenticationStatus` checks
          const ready = mounted && authenticationStatus !== "loading";
          const connected =
            ready &&
            account &&
            chain &&
            (!authenticationStatus || authenticationStatus === "authenticated");

          return (
            <div
              {...(!ready && {
                "aria-hidden": true,
                style: {
                  opacity: 0,
                  pointerEvents: "none",
                  userSelect: "none"
                }
              })}
              className="flex items-center"
            >
              {!connected ? (
                <div className="flex">
                  <button
                    onClick={openConnectModal}
                    className="relative w-[150px] lg:w-[319px] h-[21.56px] lg:h-[44px] bg-cover bg-center text-[#02010B]  font-bold rounded-lg focus:outline-none"
                    // style={{ backgroundImage: `url('/header/connect-wallet_.svg')` }}
                  >
                    <Image
                      className="absolute pointer-events-none top-0 lg:top-[-1px] left-0 w-full h-auto"
                      src={"/header/connect-wallet_.svg"}
                      width={319}
                      height={46}
                      alt="bg iamge"
                    />
                    <span className="absolute inset-0 flex items-center justify-center text-[9px] lg:text-base bg-black bg-opacity-0 rounded-lg pt-1.5">
                      CONNECT WALLET
                    </span>
                  </button>
                </div>
              ) : chain.unsupported ? (
                <button onClick={openChainModal} type="button">
                  Wrong network
                </button>
              ) : (
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <button
                    onClick={openAccountModal}
                    className="relative w-[150px] lg:w-[319px] h-[21.56px] lg:h-[44px] bg-cover bg-center text-[#02010B]  font-bold rounded-lg focus:outline-none"
                    // style={{ backgroundImage: `url('/header/connect-wallet_.svg')` }}
                  >
                    <Image
                      className="absolute pointer-events-none top-0 lg:top-[-1px] left-0 w-full h-auto"
                      src={"/header/connect-wallet_.svg"}
                      width={319}
                      height={46}
                      alt="bg iamge"
                    />
                    <span className="absolute inset-0 flex items-center justify-center text-[8px] lg:text-base bg-black bg-opacity-0 rounded-lg pt-[5px]">
                      {account.displayName}
                      {/* {account.displayBalance ? ` (${account.displayBalance})` : ""} */}
                    </span>
                  </button>
                </div>
              )}
            </div>
          );
        }}
      </ConnectButton.Custom>
    </div>
  );
};
