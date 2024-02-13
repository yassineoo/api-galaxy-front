import Link from "next/link";

export default function Footer(): JSX.Element {
  return (
    <>
      <div className="bg-white text-black">
        <div className=" p-4 flex justify-around md:justify-around ">
          <div className="py-2">
            <div>
              <h2 className="md:text-lg font-semibold font-title mb-4">
                {" "}
                Get the latest updates
              </h2>
              <input
                type="email"
                placeholder="your email here"
                className="border border-black rounded-md p-2 md:w-80 text-sm md:text-base"
              />
              <button className="bg-goldColor text-white rounded px-2 py-1 relative right-16 text-sm md:text-base">
                I'm In{" "}
              </button>
            </div>

            <div className="my-4 flex gap-2 font-semibold font-title text-sm md:text-base">
              <Link href={""}>Blogs </Link>
              <Link href={""}>Explore </Link>
              <Link href={""}>Help centre </Link>
              <Link href={""}>FAQ </Link>
            </div>
          </div>

          <div className="py-2">
            <h2 className="font-title font-semibold md:text-lg mb-4">
              {" "}
              Language{" "}
            </h2>
            <select
              name="lang"
              id="lang"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-mainColor p-2.5 "
            >
              <option value="EN">English</option>
              <option value="FR">French</option>
              <option value="AR">Arabic</option>
            </select>
          </div>
        </div>
        <center>
          <div className="border border-gray-600 w-10/12 md:11/12"></div>
        </center>

        <div className="flex justify-center gap-4 text-sm font-body font-medium">
          <h2>© Inc. All rights reserved.</h2>
          <h2>Terms</h2>
          <h2>Privacy Policy</h2>
        </div>
      </div>
    </>
  );
}
