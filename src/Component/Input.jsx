import React from "react";
import { Search } from "lucide-react";

function Input() {
  return (
    <div className="mt-1 p-2 flex items-center justify-center bg-gray-50">
      <div className="relative flex items-center w-80 h-10">
        <Search className="absolute left-3 text-gray-400" size={20} />

        <input
          type="text"
          placeholder="Search for dishes, restaurants..."
          className="
            w-full 
            h-full 
            pl-12           
            pr-4             
            text-gray-700
            bg-white 
            border 
            border-gray-200
            rounded-full     
            shadow-md       
            transition-all 
            duration-300
            outline-none
            focus:border-blue-400
            focus:shadow-lg
          "
        />
      </div>
    </div>
  );
}

export default Input;
