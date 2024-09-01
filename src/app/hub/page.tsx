"use client";
import Navbar from "@/components/HubXs/navbar";
import HeroHub from "../../components/Hub/hero";
import ProductsHub from "../../components/Hub/products";
import TopCollection from "../../components/Hub/top";
import Footer from "@/components/Vetrine/footer";
import { useSession } from "next-auth/react";
import { useAuthSession } from "@/components/auth-provider";

export default function HubPage() {
  const { session } = useAuthSession();
  console.log({ session });
  return (
    <>
      <div>
        <div className="bg-white">
          <Navbar />
          <HeroHub />
          <ProductsHub />
          <TopCollection />
          <Footer />
        </div>
      </div>
    </>
  );
}
