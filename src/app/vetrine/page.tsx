import Hero from "../../components/Vetrine/hero";
import Navbar from "../../components/General use/navbar";
import SellingCards from "../../components/Vetrine/selling";
import AboutUs from "../../components/Vetrine/aboutUs";
import Plans from "../../components/Vetrine/plans";
import Reviews from "../../components/Vetrine/reviews";
import Contacts from "../../components/Vetrine/contacts";
import Footer from "../../components/Vetrine/footer";
// VetrinePage.tsx

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
        <Contacts id="6" />
        <Footer />
      </div>
    </>
  );
}
