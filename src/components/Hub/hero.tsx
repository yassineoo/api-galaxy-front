export default function HeroHub() {
  return (
    <>
      <div className="bg-mainColor text-white  flex justify-between">
        <div className="flex flex-col items-start gap-2 p-6 md:px-16">
          <h1 className="font-title font-semibold text-xl md:text-4xl sm:text-5xl text-center">
            Explore, Create, <br />
            API's in the Api Galaxy
          </h1>
          <p className="font-body">
            On the world's Best & largest Api marketplace
          </p>
        </div>

        <img
          src="/images/hero.svg"
          alt="Hero Image"
          width={300}
          height={270}
          className=" object-cover z-50"
        />
      </div>
    </>
  );
}
