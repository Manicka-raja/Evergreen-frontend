import { Link } from "react-router-dom";

function SelectVN() {
  return (
    <div className="w-full mt-3 h-40  flex gap-2 items-center justify-between pl-2 shadow-md">
      <div className=" w-1/3 h-36 rounded-lg overflow-hidden">
        <img
          src="/veg.png"
          className="object-cover rounded-lg h-28 w-full transition-transform duration-500 hover:scale-110"
        />
        <Link
          to="/list/veg"
          className="block w-full text-center bg-green-600 text-white font-bold text-sm py-1 rounded-b-lg hover:bg-green-700 transition-colors"
        >
          Explore
        </Link>
      </div>
      <div className=" w-1/3 h-36 overflow-hidden">
        <img
          src="/fruits.png"
          className="object-cover rounded-lg h-28 w-full transition-transform duration-500 hover:scale-110"
        />
        <Link
          to="/list/fruits"
          className="block w-full text-center bg-red-600 text-white font-bold text-sm py-1 rounded-b-lg hover:bg-green-700 transition-colors"
        >
          Explore
        </Link>
      </div>
      <div className=" w-1/3 h-36 overflow-hidden">
        <img
          src="/nuts.png"
          className="object-cover rounded-lg h-28 w-full transition-transform duration-500 hover:scale-110"
        />
        <Link
          to="/list/nuts"
          className="block w-full text-center bg-yellow-400 text-white font-bold text-sm py-1 rounded-b-lg hover:bg-green-700 transition-colors"
        >
          Explore
        </Link>
      </div>
    </div>
  );
}

export default SelectVN;
