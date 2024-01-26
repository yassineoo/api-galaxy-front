import HeroHub from "../components/Hub/hero";
import ProductsHub from "../components/Hub/products";
import TopCollection from "../components/Hub/top";
import Navbar from "../components/HubXs/navbar";
import Footer from "../components/Vetrine/footer";

export default function HubPage() {
    return (
        <>
            <div className="bg-white">
                <Navbar/>
                <HeroHub/>
                <ProductsHub/>
                <TopCollection/>
                <Footer/>
            </div>

        </>
    );

}