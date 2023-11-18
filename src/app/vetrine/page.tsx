import Hero from '../components/hero';
import Navbar from '../components/navbar';
import SellingCards from '../components/selling'
import AboutUs from '../components/aboutUs';
import Plans from '../components/plans';
import Reviews from '../components/reviews';
import Contacts from '../components/contacts';
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
                <Plans/>    
                <Reviews/>
                <Contacts/>
            </div>
        </>
    )
}
