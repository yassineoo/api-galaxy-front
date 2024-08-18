import Link from "next/link";

export default function Footer(): JSX.Element {
  return (
    <footer className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-6 md:mb-0">
          <h2 className="text-xl font-bold font-title mb-4">
            Get the latest updates
          </h2>
          <div className="flex items-center justify-center md:justify-start">
            <input
              type="email"
              placeholder="Your email here"
              className="border border-white bg-transparent rounded-l-md p-2 w-64 md:w-80 text-sm md:text-base placeholder-white focus:outline-none focus:ring-2 focus:ring-goldColor"
            />
            <button className="bg-goldColor hover:bg-yellow-500 text-white rounded-r-md px-4 py-2 text-sm md:text-base font-semibold transition-colors duration-300 ease-in-out">
              I'm In
            </button>
          </div>
          <div className="mt-6 flex justify-center md:justify-start gap-4 font-medium font-title text-sm md:text-base text-gray-300">
            <Link
              href={""}
              className="hover:text-goldColor transition-colors duration-300 ease-in-out"
            >
              Blogs
            </Link>
            <Link
              href={""}
              className="hover:text-goldColor transition-colors duration-300 ease-in-out"
            >
              Explore
            </Link>
            <Link
              href={""}
              className="hover:text-goldColor transition-colors duration-300 ease-in-out"
            >
              Help Center
            </Link>
            <Link
              href={""}
              className="hover:text-goldColor transition-colors duration-300 ease-in-out"
            >
              FAQ
            </Link>
          </div>
        </div>

        <div className="text-center md:text-right">
          <h2 className="font-title font-bold text-lg mb-4">Language</h2>
          <select
            name="lang"
            id="lang"
            className="bg-blue-800 border border-gray-300 text-white text-sm rounded-lg focus:border-goldColor p-2.5"
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

      <div className="border-t border-gray-600 mt-8"></div>

      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center text-center text-sm font-body font-medium text-gray-300">
        <h2>© Inc. All rights reserved.</h2>
        <div className="flex gap-4 mt-4 md:mt-0">
          <Link
            href={""}
            className="hover:text-goldColor transition-colors duration-300 ease-in-out"
          >
            Terms
          </Link>
          <Link
            href={""}
            className="hover:text-goldColor transition-colors duration-300 ease-in-out"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
