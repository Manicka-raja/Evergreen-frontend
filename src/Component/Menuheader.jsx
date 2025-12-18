import React from "react";

// NOTE: Ensure image_3.png is in your public folder or imported correctly.
// If importing: import logo from './path/to/image_3.png'; and use src={logo}

function Menuheader() {
  return (
    // Header Container: Using a modern green gradient and rounded corners to "blend" the logo
    <header className="w-full bg-gradient-to-r from-green-900 via-green-800 to-green-700 p-4 md:p-6 flex items-center rounded-2xl shadow-lg overflow-hidden relative">
      {/* Subtle background pattern overlay (optional, for style) */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-green-300 via-transparent to-transparent"></div>

      {/* Logo Image Container */}
      <div className="flex-shrink-0 mr-5 relative z-10"></div>

      {/* Text Content */}
      <div className="flex flex-col z-10">
        <h1 className="font-sans text-green-100 text-base md:text-lg font-medium tracking-wider uppercase">
          Order your favorite in
        </h1>
        <span className="font-sans text-white text-2xl md:text-4xl font-extrabold tracking-tight leading-none mt-0.5">
          Evergreen
        </span>
      </div>
    </header>
  );
}

export default Menuheader;
