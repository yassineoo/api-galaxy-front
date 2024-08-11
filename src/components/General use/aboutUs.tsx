import Image from "next/image";

const whyChooseUs = [
  {
    title: "Curated Collection: ",
    description:
      "Our team of experts handpick every API to ensure you access only the best and most reliable solutions.",
  },
  {
    title: "Secure Transactions:",
    description:
      " We prioritize your security. All transactions on our platform are encrypted, ensuring utmost confidentiality and safety.",
  },
  {
    title: "24/7 Support:",
    description:
      " Our dedicated customer support team is always ready to assist you, ensuring a seamless experience as you navigate our marketplace.",
  },
  {
    title: "Community-Driven:",
    description:
      " We believe in the power of community. Engage with fellow developers, share insights, and learn from the collective wisdom.",
  },
];

export default function AboutUs(): JSX.Element {
  return (
    <>
      <div className="bg-black relative p-4 px-6 text-white flex flex-col items-center">
        <img
          src="./images/about-us.webp"
          className="absolute z-10  top-0 left-0 w-full h-full opacity-50 object-cover"
        />
        <div className="z-20">
          <h1 className="mb-6 text-3xl text-center font-semibold font-title">
            About Us
          </h1>
          <div className="flex flex-col items-end  md:flex-row md:items-start justify-center">
            <div className="max-w-xl">
              <h2 className="mb-2 font-title font-medium text-xl">
                Welcome to API Galaxy
              </h2>
              <p className="font-body font-normal text-base">
                Founded in 2023, API Galaxy is the go-to destination for
                developers, businesses, and innovators seeking cutting-edge API
                solutions. Our marketplace boasts a diverse range of APIs
                spanning categories like finance, health, entertainment, and
                more, catering to the unique needs of various industries.
              </p>
            </div>
            <Image
              className="md:w-60 md:h-60"
              src="/logos/logo-white-infsec.svg"
              alt="Card Image"
              width={160}
              height={160}
            />
          </div>
        </div>
        <div className="z-20 py-8 md:py-2 lg:py-4">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Why Choose Us
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-card p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2 text-black ">
                  Curated Collection
                </h3>
                <p className="text-muted-foreground">
                  Our team of experts handpick every API to ensure you access
                  only the best and most reliable solutions.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2 text-black">
                  Secure Transactions
                </h3>
                <p className="text-muted-foreground">
                  We prioritize your security. All transactions on our platform
                  are encrypted, ensuring utmost confidentiality and safety.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2 text-black">
                  24/7 Support
                </h3>
                <p className="text-muted-foreground">
                  Our dedicated customer support team is always ready to assist
                  you, ensuring a seamless experience as you na.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2 text-black">
                  Diverse Ecosystem
                </h3>
                <p className="text-muted-foreground">
                  Explore a wide range of APIs across various industries,
                  catering to the unique needs of your business or project.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
