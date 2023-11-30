import HeroHub from "../components/Hub/hero";
import Navbar from "../components/HubXs/navbar";

export default function HubPage() {
    return (
        <>
            <div className="bg-white">
                <Navbar/>
                <HeroHub/>
            </div>

        </>
    );

}