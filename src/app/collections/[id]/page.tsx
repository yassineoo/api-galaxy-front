import Navbar from "@/components/HubXs/navbar";
import HeroHub from "@/components/Hub/hero";
import Footer from "@/components/Vetrine/footer";
import ProductsHub from "@/components/Hub/products";
import ProductCard from "@/components/HubXs/productCard";
import { getCurrentUser } from "@/lib/session";
import PaginationManual from "@/components/dashboard/billing/paginationManual";
import ApiList from "./list";
import axios, { AxiosError } from "axios";
import { ApiUsersUrl } from "@/utils/constants";

export default function CollectionPage({
  params,
  // searchParkams,
}: {
  params: { id: string };
  // searchParams: { page: string };
}) {
  return (
    <div className="bg-white">
      <Navbar apiHub="/hub" docs="https://api-galaxy-docs.vercel.app/" />
      <HeroHub />
      {/* <ProductsHub title="" /> */}
      <ApisList id={params.id} />
      {/* <TopCollection /> */}
      <Footer />
    </div>
  );
}

async function getApisByCollection(
  id: string
): Promise<{ data: any[]; pages: number; collectionName: string }> {
  try {
    const res = await axios.get(`http://localhost:7002/collections/${id}`);
    console.log({ res, data: res.data });
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError)
      console.log({ response: error.response, data: error.response?.data });
    else console.log({ error });
    return { collectionName: "", data: [], pages: 0 };
  }
}

async function ApisList({ id }: { id: string }) {
  const apiList: { data: any[]; pages: number; collectionName: string } =
    await getApisByCollection(id);
  console.log({ apiList });
  const session = await getCurrentUser();
  return (
    <ApiList
      userId={session?.userId as number}
      name={apiList.collectionName}
      apiList={apiList}
    />
  );
}
