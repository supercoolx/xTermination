import { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { Providers } from './providers';

const furore = localFont({
  src: "./fonts/Furore.otf",
  variable: "--font-furore"
});

export const metadata: Metadata = {
  title: "XTERMINATION",
  description: "XTERMINATION FAIRLAUNCH"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${furore.variable} scroll-smooth font-furore bg-black text-white antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
