// import Image from "next/image";

import { RevealOnScroll } from "@/components/common/RevealOnScroll";
import { About } from "@/components/Home/About";
import { Features } from "@/components/Home/Features";
import { HeroSection } from "@/components/Home/HeroSection/HeroSection";
import { InclusiveStart } from "@/components/Home/InclusiveStart";
import { Roadmap } from "@/components/Home/Roadmap";
import { WhyXtrMatters } from "@/components/Home/WhyXtrMatters";
import { Footer } from "@/components/Layout/Footer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {

  return (
    <div className="">
      <ToastContainer />
      <RevealOnScroll>
        <HeroSection />
      </RevealOnScroll>
      <RevealOnScroll>
        <About />
      </RevealOnScroll>
      <RevealOnScroll>
        <WhyXtrMatters />
      </RevealOnScroll>
      {/* <RevealOnScroll>
        <Features />
      </RevealOnScroll> */}
      <RevealOnScroll>
        <InclusiveStart />
      </RevealOnScroll>
      {/* <RevealOnScroll>
        <Roadmap />
      </RevealOnScroll> */}
      <RevealOnScroll>
        <Footer />
      </RevealOnScroll>
    </div>
  );
}
