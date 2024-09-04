import Navbar from "@/components/HubXs/navbar";
import HeroHub from "../../components/Hub/hero";
import ProductsHub from "../../components/Hub/products";
import TopCollection from "../../components/Hub/top";
import Footer from "@/components/Vetrine/footer";

type Props = {
  searchParams: { keyword: string };
};

// this is server component don't change it please
export default function SearchPage({ searchParams }: Props) {
  console.log({ searchParams });
  return (
    <>
      <div className="bg-white">
        <Navbar />
        <HeroHub />
        <ProductsHub
          title={`Search results for "${searchParams?.keyword}"`}
          keyword={searchParams?.keyword}
        />
        <TopCollection />
        <Footer />
      </div>
    </>
  );
}
