{
  /* Left side with background and testimonial */
}

const AuthSide = () => {
  return (
    <div className="-z-10 h-screen slide-in-left relative w-1/2 bg-gradient-to-r from-[#3980FF] to-[#39BEF9] text-white p-12 hidden md:flex flex-col justify-between">
      <div className="flex justify-between h-full z-20 flex-col">
        <div className="flex w-full  justify-start items-start">
          <img
            src="/logos/logo-white-infsec.svg"
            alt="Modulux Logo"
            className="h-10"
          />
          <h2 className="ml-4 mt-2 flex justify-center items-center font-bold text-white text-lg">
            Api Galaxy
          </h2>
        </div>
        <div className="">
          <p className="text-[16px] italic font-[400]">
            "API Galaxy made building our new application a breeze. The vast
            array of APIs and their customizable options allowed us to create a
            truly unique product. The developer-friendly documentation and
            support were invaluable."
          </p>
          <p className="mt-4 text-[20px]  font-[600]">Amir B, Oum El Bouaghi</p>
        </div>
      </div>
      <div
        className="absolute inset-0 w-ful overflow-visible z-10"
        style={{
          // top: "3.4rem",
          left: "0px",
          top: "100px",
          height: "calc(100% )",
          width: "200%",
          transform: "rotate(0deg)",
        }}
      >
        <img
          src="/images/wave2.svg"
          alt="wave background"
          className="w-full h-full object-cover "
        />
      </div>
    </div>
  );
};

export default AuthSide;
