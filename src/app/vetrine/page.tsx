import Hero from '../components/hero';
import Navbar from '../components/navbar';
import SellingCards from '../components/selling';
// VetrinePage.tsx

export default function VetrinePage() {
    return (
        <>
            <div>
                <Navbar />
                <Hero />
                {/* The rest of your page content */}

                <SellingCards />
            </div>
        </>
    )
}
