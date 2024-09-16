import Btn from "../common/Btn";

const Header = () => {
  return (
    <header className="relative w-full h-[370px] md:h-[500px] lg:h-screen flex flex-col justify-center items-center bg-gray-900 overflow-hidden">
      {/* Fixed height for the header */}
      <div className="absolute inset-0 flex items-center justify-center">
        <iframe
          className="absolute top-0 left-0 w-full h-full object-cover"
          src="https://www.youtube.com/embed/pDWUf_g2zsc?autoplay=1&loop=1&mute=1&playlist=pDWUf_g2zsc"
          title="Office Background"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>

      {/* Content */}
      <div className="relative z-10  text-white pt-0 md:pt-16 text-center md:text-center lg:text-start px-4 md:px-4 lg:px-0 -ml-0 lg:-ml-[490px] max-w-3xl ">
        <h1 className="text-2xl sm:text-2xl md:text-5xl lg:text-6xl xl:text-6xl font-medium mb-2 sm:mb-2 md:mb-8 lg:mb-10">
          Book Your Ideal <span className="text-yellow-500">Meeting Room</span>{" "}
          with Ease
        </h1>
        <p className="text-base sm:text-base md:text-xl lg:text-2xl xl:text-xl mb-2 sm:mb-2 md:mb-8 lg:mb-10 text-gray-300">
          Experience efficient and hassle-free room booking for all your meeting
          needs with our streamlined solution
        </p>
        <Btn title="Book Now" />
      </div>
    </header>
  );
};

export default Header;
