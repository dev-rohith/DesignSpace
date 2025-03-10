const About = () => {
  return (
    <div>
      <div className="relative w-full h-1 bg-gray-100 overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-gray-500 to-transparent animate-flow"></div>
      </div>

      <div className="w-full flex justify-around  pt-17 pb-26  bg-gray-50">
        <div className=" w-full hidden md:block">
          <div className="relative h-full ml-20 ">
            <img
              src="https://res.cloudinary.com/dlbyxcswi/image/upload/f_auto,q_auto/v1/product_uploads/bowpqtmfqss3u3nuxay9"
              alt="about-image"
              className="absolute top-20 left-40 w-80 h-60 z-10 ring-4 ring-offset-4 ring-indigo-400 transition-all duration-500 ease-in-out hover:z-50 hover:scale-110"
            />

            <img
              src="https://res.cloudinary.com/dlbyxcswi/image/upload/f_auto,q_auto/v1/product_uploads/kcvzpwoi3gealroivbdc"
              alt="about-image"
              className="absolute top-10 left-30 w-80 h-60 z-20 ring-4 ring-offset-4 ring-pink-400 transition-all duration-500 ease-in-out hover:z-50 hover:scale-110"
            />
            <img
              src="https://res.cloudinary.com/dlbyxcswi/image/upload/f_auto,q_auto/v1/product_uploads/ozphiuwrybuicvsm2bge"
              alt="about-image"
              className="absolute top-0 left-20 w-80 h-60 z-30 ring-4 ring-offset-4 ring-violet-400 transition-all duration-500 ease-in-out hover:z-50 hover:scale-110"
            />
          </div>
        </div>
        <div className="container max-w-4xl w-full text-center px-6">
          <h4 className="font-sansita uppercase text-2xl md:text-4xl text-gray-800 tracking-wide">
            About Design Space
          </h4>
          <div className="w-90 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto my-3"></div>
          <p className="text-gray-600 font-raleway text-md md:text-lg leading-relaxed max-w-4xl mx-auto">
            <span className="font-semibold text-gray-800">Design Space</span> is
            an innovative platform where designers and clients collaborate
            seamlessly to create stunning interior designs. It connects top
            talent with visionary clients, ensuring smooth project management
            from concept to completion.
          </p>
          <p className="text-gray-600 font-raleway text-md md:text-lg leading-relaxed max-w-3xl mx-auto mt-4">
            With{" "}
            <span className="text-purple-500 font-medium">real-time chat</span>,
            <span className="text-blue-500 font-medium"> secure payments</span>,
            and a
            <span className="text-pink-500 font-medium">
              {" "}
              user-friendly interface
            </span>
            , the platform simplifies the design process. Associates can join
            projects, enhancing teamwork and efficiency. Whether you're a
            designer or a client,
            <span className="font-semibold text-gray-800">
              {" "}
              Design Space
            </span>{" "}
            transforms ideas into reality effortlessly.
          </p>
        </div>
      </div>
      <div className="relative w-full h-1 bg-gray-100 overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-gray-500 to-transparent animate-flow"></div>
      </div>
    </div>
  );
};
export default About;
