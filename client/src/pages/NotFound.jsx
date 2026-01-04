import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen overflow-hidden text-white bg-gradient-to-br from-black via-gray-900 to-black">
      {/* floating glow */}
      <div className="absolute rounded-full h-72 w-72 animate-pulse bg-purple-600/30 blur-3xl"></div>

      <div className="relative z-10 text-center">
        {/* 404 text */}
        <h1 className="text-[120px] font-extrabold tracking-widest animate-bounce">
          <span className="text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text">
            404
          </span>
        </h1>

        <p className="mt-4 text-xl text-gray-300 animate-fade-in">
          Oops! This page vanished like an anime protagonist 😭
        </p>

        {/* button */}
        <Link
          to="/"
          className="inline-block px-8 py-3 mt-8 font-semibold transition-all duration-300 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/40"
        >
          Go Back Home 🏠
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
