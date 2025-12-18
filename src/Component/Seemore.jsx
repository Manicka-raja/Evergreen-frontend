import React from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
function Seemore() {
  return (
    <div className="text-center py-4 flex items-center justify-center">
      <button className="flex items-center justify-center gap-2 px-6 py-2 text-sm font-semibold text-lime-600 border border-lime-600 rounded-full bg-white hover:bg-lime-50 transition-colors duration-300 shadow-sm hover:shadow-md">
        <Link to="/list">See more</Link>
        <ChevronRight
          size={18}
          className="transition-transform duration-300 group-hover:translate-y-0.5"
        />
      </button>
    </div>
  );
}

export default Seemore;
