import { Home, ShoppingCart, User } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-gradient-to-r from-green-900 via-green-800 to-green-700 backdrop-blur-md border-t border-green-700/50 shadow-[0_-5px_15px_rgba(0,0,0,0.3)] h-20 z-50">
      <div className="flex items-center justify-around h-full max-w-lg mx-auto px-6 pb-2">
        <Link
          to="menu"
          className="group flex flex-col items-center justify-center w-16 h-16 rounded-2xl transition-all duration-300 hover:bg-white/10 active:scale-95"
        >
          <Home
            className="text-green-100 transition-colors duration-300 group-hover:text-white drop-shadow-md"
            size={24}
            strokeWidth={2}
          />

          <span className="mt-1 w-1 h-1 rounded-full bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
        </Link>

        <Link
          to="cart"
          className="group flex flex-col items-center justify-center w-16 h-16 rounded-2xl transition-all duration-300 hover:bg-white/10 active:scale-95"
        >
          <div className="relative">
            <ShoppingCart
              className="text-green-100 transition-colors duration-300 group-hover:text-white drop-shadow-md"
              size={24}
              strokeWidth={2}
            />

            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75 hidden group-hover:block"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </span>
          </div>
          <span className="mt-1 w-1 h-1 rounded-full bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
        </Link>

        <Link
          to="/settings"
          className="group flex flex-col items-center justify-center w-16 h-16 rounded-2xl transition-all duration-300 hover:bg-white/10 active:scale-95"
        >
          <User
            className="text-green-100 transition-colors duration-300 group-hover:text-white drop-shadow-md"
            size={24}
            strokeWidth={2}
          />
          <span className="mt-1 w-1 h-1 rounded-full bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
        </Link>
      </div>
    </div>
  );
}

export default Footer;
