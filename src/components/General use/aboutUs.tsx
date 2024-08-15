import Image from "next/image";
import backgroundImage from "../../../public/images/about-us.webp"; // Adjust the path accordingly

const whyChooseUs = [
  {
    title: "Curated Collection",
    description:
      "Our team of experts handpick every API to ensure you access only the best and most reliable solutions.",
  },
  {
    title: "Secure Transactions",
    description:
      "We prioritize your security. All transactions on our platform are encrypted, ensuring utmost confidentiality and safety.",
  },
  {
    title: "24/7 Support",
    description:
      "Our dedicated customer support team is always ready to assist you, ensuring a seamless experience as you navigate our marketplace.",
  },
  {
    title: "Community-Driven",
    description:
      "We believe in the power of community. Engage with fellow developers, share insights, and learn from the collective wisdom.",
  },
];

export default function AboutUs(): JSX.Element {
  return (
    <>
      <div className="bg-gradient-to-r   from-white  to-blue-300 text-black  relative p-4 px-6 flex flex-col items-center">
        <div className="z-20 text-center max-w-3xl">
          <h1 className="mb-6 text-4xl md:text-5xl font-bold font-title">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
              About Us
            </span>
          </h1>
          <div className="flex flex-col items-center md:flex-row md:items-start justify-center">
            <div className="max-w-xl">
              <h2 className="mb-4 font-title font-medium text-2xl md:text-3xl text-mainColor">
                Welcome to{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-blue-500">
                  API Galaxy
                </span>
              </h2>
              <p className="font-body font-normal text-lg md:text-xl">
                Founded in 2023, API Galaxy is the go-to destination for
                developers, businesses, and innovators seeking cutting-edge API
                solutions. Our marketplace boasts a diverse range of APIs
                spanning categories like finance, health, entertainment, and
                more, catering to the unique needs of various industries.
              </p>
            </div>
            <Image
              className="md:w-60 md:h-60 mt-6 md:mt-0  "
              src="/logos/logo.svg"
              alt="API Galaxy Logo"
              width={160}
              height={160}
            />
          </div>
        </div>
        <div className="z-20 py-8 md:py-12 lg:py-16">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orangePure to-orange-300">
                Why Choose Us
              </span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyChooseUs.map((item, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-orange-50 to-orange-300  text-black p-6 rounded-lg shadow-lg transform hover:-translate-y-2 transition-transform duration-300"
                >
                  <h3 className="text-xl font-bold mb-2">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400  to-blue-700">
                      {item.title}
                    </span>
                  </h3>
                  <p className="text-gray-700">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
