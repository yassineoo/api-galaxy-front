// VetrinePage.tsx
"use client";
import AboutUs from "@/components/General use/aboutUs";
import Hero from "@/components/General use/hero";
import Navbar from "@/components/General use/navbar";
import SellingCards from "@/components/General use/selling";
import Footer from "@/components/Vetrine/footer";
import Plans from "@/components/Vetrine/plans";
import Reviews from "@/components/Vetrine/reviews";
import { useSession } from "next-auth/react";
export default function VetrinePage() {
  const { data: session, status } = useSession();
  return (
    <>
      <div className="overflow-y-scroll ">
        <Navbar services="2" about="3" pricing="4" contacts="6" />
        <Hero />
        <SellingCards />

        <AboutUs />
        <Plans />
        <Reviews />
        <Footer />
      </div>
    </>
  );
}
