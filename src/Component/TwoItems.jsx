import React from "react";
import { Heart, Star, Plus, ShoppingCart } from "lucide-react"; // Assuming you have an icon lib, or replace with SVGs
import { useNavigate } from "react-router-dom";

function TwoItems({ menu }) {
  const data = menu.slice(0, 4);
  const navigate = useNavigate();
  return (
    // Outer Container: Removed bg-red-600, added subtle gray background
    <div className="w-full p-1  mt-3 rounded-lg grid grid-cols-[1fr_1fr] gap-4 justify-center  ">
      {data.map((item) => (
        <div
          key={item.id}
          onClick={() => navigate(`/item/${item._id}`)}
          className="w-full bg-white flex flex-col gap-1 rounded-[2rem] p-4 shadow-xl relative transition-all duration-300 hover:shadow-2xl"
        >
          {/* Top Div: Heart Icon Area (formerly bg-green-400) */}
          <div className="w-full h-8 flex justify-end items-center">
            <button className="text-gray-400 hover:text-red-500 transition-colors">
              <Heart size={20} />
            </button>
          </div>

          <div className="w-full h-40 flex flex-col items-center justify-start gap-1">
            <div className="w-28 h-28 -mt-2 mb-1">
              <img
                src={`https://evergreen-home-products.onrender.com/img/products/${item.image}`}
                alt={item.name}
                className="object-cover rounded-full w-full h-full shadow-lg transition-transform duration-500 hover:rotate-12 hover:scale-105"
              />
            </div>

            <h3 className="font-bold text-gray-800 text-lg leading-none">
              {item.name}
            </h3>
            <div className="flex items-center gap-4 text-xs font-medium text-gray-400 mt-1">
              <span>20min</span>
              <span className="flex items-center gap-1 text-gray-500">
                <Star size={12} className="text-yellow-400 fill-yellow-400" />{" "}
                4.5
              </span>
            </div>
          </div>

          {/* Bottom Div: Price & Button (formerly bg-green-500) */}
          <div className="w-full h-8 flex justify-between items-end pl-1">
            <div className="font-bold text-xl text-gray-900">${item.price}</div>

            {/* The Green Add Button */}
            {/* Added specific border radius (rounded-tl-2xl) to match the corner cut effect */}
            <button className="bg-lime-500 w-10 h-10 flex items-center justify-center text-white rounded-tl-2xl rounded-br-[1.2rem] -mr-4 -mb-4 hover:bg-lime-600 transition-colors">
              <Plus size={20} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TwoItems;
