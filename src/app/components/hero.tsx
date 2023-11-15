import Link from "next/link";

export default function Hero(): JSX.Element {
    return (
        <div className="bg-white p-10 text-black">
            <h1 className="font-title font-semibold text-4xl ">
                <p className="text-mainColor" >Discover ,</p>
                Share and <br />
                monetize your APIs
            </h1>
            <p className="font-body font-semibold my-4 ">
                The one-stop hub for developers and businesses  <br />  to access cutting-edge API solutions.</p>

            <div>
                <div className="flex justify-start space-x-4">
                    <Link href="/browse" passHref>
                        <button
                            type="button"
                            className="bg-mainColor text-white font-semibold py-2 px-4 rounded hover:bg-skyBlue focus:outline-none focus:ring-2 focus:ring-mainColor focus:ring-opacity-50 shadow-lg"
                        >
                            Start Browsing
                        </button>
                    </Link>
                    <Link href="/provider" passHref>
                        <button
                            type="button"
                            className="bg-transparent text-mainColor font-semibold py-2 px-4 rounded border border-mainColor hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-mainColor focus:ring-opacity-50"
                        >
                            Become a Provider
                        </button>
                    </Link>
                </div>
            </div>
            

        </div>
    );
}