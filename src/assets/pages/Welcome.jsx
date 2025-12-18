import React from "react";
import { Link } from "react-router-dom";
function Welcome() {
  return (
    // MAIN CONTAINER: Cream background for organic feel, full height
    <div className="w-full h-screen bg-[#FAFAF5] flex flex-col relative overflow-hidden font-sans">
      {/* SECTION 1: HERO IMAGE */}
      {/* Takes up 55% of screen, rounded bottom for modern aesthetic */}
      <div className="w-full h-[55%] relative shadow-md rounded-b-[40px] overflow-hidden z-10">
        <img
          src="public/fruits.png"
          alt="Evergreen Nature"
          className="w-full h-full object-cover"
        />
        {/* Subtle overlay gradient to ensure image blends well */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>

      {/* SECTION 2: CONTENT AREA */}
      <div className="flex-1 flex flex-col items-center justify-between pt-8 pb-10 px-8">
        {/* TEXT CONTENT */}
        <div className="flex flex-col items-center gap-4 text-center">
          {/* Logo Title - Serif font for premium look */}
          <h1 className="text-4xl font-serif font-bold text-[#2E5C31] tracking-tight drop-shadow-sm">
            Evergreen
          </h1>

          {/* Subtitle/Description */}
          <p className="text-[#6B7C65] text-base leading-relaxed max-w-xs font-medium">
            Discover fresh ideas, clean UI, and a smooth experience — crafted
            naturally just for you.
          </p>
        </div>

        {/* ACTION BUTTONS */}
        <div className="w-full flex flex-col gap-3">
          {/* Primary Action: Get Started */}
          <button className="w-full py-4 bg-[#458C4A] hover:bg-[#36703b] text-white rounded-full text-lg font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-300">
            <Link to="/Signup">Get Started</Link>
          </button>

          {/* Secondary Action: Sign In */}
          <button className="w-full py-3 text-[#458C4A] hover:bg-[#E8F5E9] rounded-full text-lg font-semibold transition-all duration-200">
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
