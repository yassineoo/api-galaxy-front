import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"; // shadcn components

const whyChooseUs = [
  {
    title: "Curated Collection:",
    description:
      "Our team of experts handpick every API to ensure you access only the best and most reliable solutions.",
  },
  {
    title: "Secure Transactions:",
    description:
      "We prioritize your security. All transactions on our platform are encrypted, ensuring utmost confidentiality and safety.",
  },
  {
    title: "24/7 Support:",
    description:
      "Our dedicated customer support team is always ready to assist you, ensuring a seamless experience as you navigate our marketplace.",
  },
  {
    title: "Community-Driven:",
    description:
      "We believe in the power of community. Engage with fellow developers, share insights, and learn from the collective wisdom.",
  },
];

export default function AboutUs(): JSX.Element {
  return (
    <>
      <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 p-8 text-white flex flex-col items-center">
        <div className="w-full lg:w-10/12">
          <h1 className="mb-8 text-4xl text-center font-semibold font-title">
            About Us
          </h1>
          <div className="flex flex-col md:flex-row items-center md:justify-between space-y-8 md:space-y-0">
            <div className="max-w-xl">
              <h2 className="mb-4 text-2xl font-medium font-title">
                Welcome to API Galaxy
              </h2>
              <p className="text-base font-light">
                Founded in 2023, API Galaxy is the go-to destination for
                developers, businesses, and innovators seeking cutting-edge API
                solutions. Our marketplace boasts a diverse range of APIs,
                spanning categories like finance, health, entertainment, and
                more, catering to the unique needs of various industries.
              </p>
            </div>
            <Image
              className="rounded-md shadow-md"
              src="/logos/logo-white-infsec.svg"
              alt="API Galaxy Logo"
              width={160}
              height={160}
            />
          </div>
        </div>

        <div className="my-10 w-full lg:w-10/12">
          <h2 className="mb-6 text-3xl font-medium font-title text-center text-white">
            Why Choose Us
          </h2>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            {whyChooseUs.map((item, index) => (
              <Card
                key={index}
                className="w-full md:w-1/4 bg-white text-black rounded-lg shadow-lg"
              >
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="text-sm font-light">
                    {item.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
