import { getUserSession } from "@/actions/auth";
import { useAuthSession } from "@/components/auth-provider";
import AboutUs from "@/components/General use/aboutUs";
import Hero from "@/components/General use/hero";
import Navbar from "@/components/General use/navbar";
import SellingCards from "@/components/General use/selling";
import Footer from "@/components/Vetrine/footer";
import Plans from "@/components/Vetrine/plans";
import Reviews from "@/components/Vetrine/reviews";
import { getCurrentUser } from "@/lib/session";

export default function VetrinePage() {
  return (

    <div>
      <Navbar services="2" about="3" pricing="4" contacts="6" />
      <Hero />
      <SellingCards />
=

      <AboutUs />
      <Plans />
      <Reviews />
      <Footer />
    </div>
  );
}
