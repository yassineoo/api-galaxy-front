import Hero from '../components/hero';
import Navbar from '../components/navbar';
// VetrinePage.tsx

export default function VetrinePage() {
    return (
        <div>
            <Navbar />
            <Hero />
            <h1 className='text-mainColor'>Vetrine</h1>
            {/* The rest of your page content */}
        </div>
    )
}
