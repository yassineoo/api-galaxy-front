import Image from "next/image"
import IdpropType from "./idProp"


const whyChooseUs = [
    {
        title: 'Curated Collection: ',
        description: 'Our team of experts handpick every API to ensure you access only the best and most reliable solutions.',
    },
    {
        title: 'Secure Transactions:',
        description: ' We prioritize your security. All transactions on our platform are encrypted, ensuring utmost confidentiality and safety.',
    },
    {
        title: '24/7 Support:',
        description: ' Our dedicated customer support team is always ready to assist you, ensuring a seamless experience as you navigate our marketplace.',
    },
    {
        title: 'Community-Driven:',
        description: ' We believe in the power of community. Engage with fellow developers, share insights, and learn from the collective wisdom.',
    }
]


export default function AboutUs(id:IdpropType ): JSX.Element {
    return (
        <>
            <div id={id.id} className="bg-mainColor p-4 px-6 text-white flex flex-col items-center">
                <div>
                    <h1 className="mb-6 text-3xl text-center font-semibold font-title">
                        About Us
                    </h1>
                    <div className="flex flex-col items-end  md:flex-row md:items-start justify-center">
                        <div className="max-w-xl">
                            <h2 className="mb-2 font-title font-medium text-xl">
                                Welcome to API Galaxy
                            </h2>
                            <p className="font-body font-normal text-base">
                                Founded in 2023, API Galaxy is the go-to destination for developers, businesses, and innovators seeking cutting-edge API solutions. Our marketplace boasts a diverse range of APIs spanning categories like finance, health, entertainment, and more, catering to the unique needs of various industries.
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

                <div className="bg-white text-black rounded-md my-6  p-4 lg:w-8/12 md:w-10/12 ">
                    <h2 className="mb-4 font-title font-medium text-xl">
                        Why Choose Us
                    </h2>
                    <div className="flex flex-col sm:flex-row gap-4 px-12">
                        {whyChooseUs.map((item, index) => (
                            <div key={index} className="items-start justify-center text-center">
                                <div className="">
                                    <h2 className="mb-2 font-title font-medium text-lg">
                                        {item.title}
                                    </h2>
                                    <p className="font-body font-light text-base">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </>
    )
}