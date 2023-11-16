import Hero from '../components/hero';
import Navbar from '../components/navbar';
import SellingCards from '../components/selling'
import AboutUs from '../components/aboutUs';
// VetrinePage.tsx

export default function VetrinePage() {
    return (
        <>
            <div>
                <Navbar />
                <Hero />
                {/* The rest of your page content */}

                <SellingCards />
                <AboutUs/>
            </div>
        </>
    )
}
