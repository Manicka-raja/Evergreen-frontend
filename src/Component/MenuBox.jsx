import React from "react";

function MenuBox({ menu }) {

  const data = menu.slice(0, 1);

  if (!data.length) return null;

  return (
    <div className="w-full mt-4 px-2">
      {data.map((item) => (
        <div
          key={item._id}
          className="group relative w-full h-52 bg-gradient-to-r from-red-600 to-rose-700 rounded-2xl shadow-xl overflow-hidden flex items-center p-4 hover:shadow-2xl transition-all duration-300 ease-in-out border border-red-500/30"
        >
      
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>

      
          <div className="relative w-2/5 h-full flex-shrink-0">
            <img
              src={`http://localhost:3000/img/products/${item.image}`}
              alt={item.name}
              className="w-full h-full object-cover rounded-xl shadow-md transform group-hover:scale-105 transition-transform duration-500"
            />
            
            <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>

          
          <div className="w-3/5 pl-5 flex flex-col justify-center h-full z-10">
          
            <div className="mb-2">
              <span className="bg-yellow-400 text-red-900 text-xs font-black px-2 py-1 rounded-full uppercase tracking-wider shadow-sm">
                Limited Time Offer
              </span>
            </div>

            
            <h2 className="text-2xl font-black text-white uppercase leading-none tracking-tight drop-shadow-md truncate">
              {item.name}
            </h2>

          
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-red-200 text-sm font-medium uppercase tracking-widest">
                Up To
              </span>
              <span className="text-4xl font-extrabold text-white drop-shadow-lg tracking-tighter">
                45% OFF
              </span>
            </div>

          
            <div className="w-8 h-1 bg-white/50 rounded-full mt-3"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MenuBox;
