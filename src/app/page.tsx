// VetrinePage.tsx

import AboutUs from "@/components/General use/aboutUs";
import Hero from "@/components/General use/hero";
import Navbar from "@/components/General use/navbar";
import SellingCards from "@/components/General use/selling";
import Plans from "@/components/Vetrine/plans";
import Reviews from "@/components/Vetrine/reviews";

export default function VetrinePage() {
  return (
    <>
      <div>
        <Navbar services="2" about="3" pricing="4" contacts="6" />
        <Hero id="1" />
        <SellingCards id="2" />
        <AboutUs id="3" />
        <Plans id="4" />
        <Reviews id="5" />

        <footer />
      </div>
    </>
  );
}
