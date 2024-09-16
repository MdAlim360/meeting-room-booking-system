import { Link } from "react-router-dom";
import { FaSadTear } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="text-center space-y-6">
        <FaSadTear className="text-9xl text-gray-400 mx-auto" />
        <h1 className="text-5xl font-bold">404</h1>
        <p className="text-xl">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 mt-4 text-lg bg-gray-800 hover:bg-gray-700 rounded-full text-white font-medium transition-all duration-300 ease-in-out"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
