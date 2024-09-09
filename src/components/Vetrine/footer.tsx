import Link from "next/link";

export default function Footer(): JSX.Element {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-6 md:mb-0">
          <h2 className="text-xl font-bold mb-4">Get the latest updates</h2>
          <div className="flex items-center justify-center md:justify-start">
            <input
              type="email"
              placeholder="Your email here"
              className="border border-gray-400 bg-transparent rounded-l-md p-2 w-64 md:w-80 text-sm md:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-r-md px-4 py-2 text-sm md:text-base font-semibold transition-colors duration-300 ease-in-out">
              I'm In
            </button>
          </div>
          <div className="mt-6 flex justify-center md:justify-start gap-4 text-sm md:text-base text-gray-400">
            <Link
              href={""}
              className="hover:text-yellow-400 transition-colors duration-300 ease-in-out"
            >
              Blogs
            </Link>
            <Link
              href={""}
              className="hover:text-yellow-400 transition-colors duration-300 ease-in-out"
            >
              Explore
            </Link>
            <Link
              href={""}
              className="hover:text-yellow-400 transition-colors duration-300 ease-in-out"
            >
              Help Center
            </Link>
            <Link
              href={""}
              className="hover:text-yellow-400 transition-colors duration-300 ease-in-out"
            >
              FAQ
            </Link>
          </div>
        </div>

        <div className="text-center md:text-right">
          <h2 className="font-bold text-lg mb-4">Language</h2>
          <select
            name="lang"
            id="lang"
            className="bg-gray-800 border border-gray-600 text-white text-sm rounded-lg focus:border-yellow-400 p-2.5"
          >
            <option value="EN" className="text-black">
              English
            </option>
            <option value="FR" className="text-black">
              French
            </option>
            <option value="AR" className="text-black">
              Arabic
            </option>
          </select>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8"></div>

      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center text-center text-sm text-gray-400">
        <h2>© 2024 Inc. All rights reserved.</h2>
        <div className="flex gap-4 mt-4 md:mt-0">
          <Link
            href={"/terms"}
            className="hover:text-yellow-400 transition-colors duration-300 ease-in-out"
          >
            Terms
          </Link>
          <Link
            href={"/privacy"}
            className="hover:text-yellow-400 transition-colors duration-300 ease-in-out"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
