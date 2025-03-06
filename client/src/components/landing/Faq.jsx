import { ChevronUp } from "lucide-react";

const Faq = () => {
  return (
    <div className="relative py-14">
       <video
        autoPlay
        loop
        muted
        className="absolute inset-0 -z-10 w-full h-full object-cover grayscale-50"
      >
        <source
          src="https://res.cloudinary.com/dlbyxcswi/video/upload/f_auto:video,q_auto/v1/product_uploads/wcmlzlarzctp8wknfmu6"
          type="video/mp4"
        />
      </video>

      <div className="absolute inset-0 -z-10 bg-white opacity-70 backdrop-blur-md"></div>
      <h2 className="md-6 font-montserrat  text-2xl mt-14 font-semibold text-center md:text-3xl">
        Frequently Asked Questions
      </h2>
      <section >
        <div className="container mx-auto px-6">
          <div className="max-w-6xl m-8 mx-auto overflow-hidden">
            <div className="py-1 border-b outline-none group" tabIndex={1}>
              <div className="flex items-center justify-between py-3 text-gray-700 transition duration-500 cursor-pointer group ease">
                <div className=" font-sansita transition duration-500 ease group-hover:text-violet-500">
                  How does the Design Space work?
                </div>
                <div className="transition duration-500 ease group-focus:-rotate-180 group-focus:text-violet-500">
                  <ChevronUp />
                </div>
              </div>
              <div className="overflow-hidden transition duration-500 group-focus:max-h-screen max-h-0 ease">
                <p className="py-2 text-justify font-raleway text-gray-600">
                  The Design Space is a collaborative platform where clients can connect with top designers to bring their creative ideas to life. Designers create projects, and clients must accept and pay before work begins. Premium users get full access to the chat feature, while free users have limited interactions.
                </p>
              </div>
            </div>

            <div className="py-1 border-b outline-none group" tabIndex={2}>
              <div className="flex items-center justify-between py-3 text-gray-500 transition duration-500 cursor-pointer group ease">
                <div className="font-sansita transition duration-500 ease group-hover:text-violet-500">
                  What is the free user message limit?
                </div>
                <div className="transition duration-500 ease group-focus:-rotate-180 group-focus:text-violet-500">
                  <ChevronUp />
                </div>
              </div>
              <div className="overflow-hidden transition duration-500 group-focus:max-h-screen max-h-0 ease">
                <p className="py-2 text-justify font-raleway text-gray-600">
                  Free users can send up to 20 messages in total as a trial. After reaching the limit, upgrading to a premium subscription is required to continue chatting with designers.
                </p>
              </div>
            </div>

            <div className="py-1 border-b outline-none group" tabIndex={3}>
              <div className="flex items-center justify-between py-3 text-gray-500 transition duration-500 cursor-pointer group ease">
                <div className="font-sansita transition duration-500 ease group-hover:text-violet-500">
                  What are the benefits of a premium subscription?
                </div>
                <div className="transition duration-500 ease group-focus:-rotate-180 group-focus:text-violet-500">
                  <ChevronUp />
                </div>
              </div>
              <div className="overflow-hidden transition duration-500 group-focus:max-h-screen max-h-0 ease">
                <p className="py-2 text-justify font-raleway text-gray-600">
                  A premium subscription unlocks unlimited messaging with designers, priority access to top-rated professionals, and additional tools to streamline the design process.
                </p>
              </div>
            </div>

            <div className="py-1 border-b outline-none group" tabIndex={4}>
              <div className="flex items-center justify-between py-3 text-gray-500 transition duration-500 cursor-pointer group ease">
                <div className="font-sansita transition duration-500 ease group-hover:text-violet-500">
                  How do designers receive tasks?
                </div>
                <div className="transition duration-500 ease group-focus:-rotate-180 group-focus:text-violet-500">
                  <ChevronUp />
                </div>
              </div>
              <div className="overflow-hidden transition duration-500 group-focus:max-h-screen max-h-0 ease">
                <p className="py-2 text-justify font-raleway text-gray-600">
                  Designers create projects, and clients must approve and pay before the work begins. Associates can view and accept tasks assigned by designers to collaborate effectively.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Faq;
