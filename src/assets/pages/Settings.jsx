import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMe, logoutUser } from "../../ApiFeature";
import { Link, useNavigate } from "react-router-dom";
import {
  FiChevronLeft,
  FiMoreVertical,
  FiChevronRight,
  FiUser,
  FiBell,
  FiLock,
} from "react-icons/fi";
import Loader from "../../Component/Loader";
import toast from "react-hot-toast";

function Settings() {
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getMe,
  });
  async function handleLogut() {
    await logoutUser();
    navigate("/login");
    toast.success("successfully loged out");
  }
  if (isLoading) return <Loader />;

  return (
    <div className="min-h-screen w-full bg-white p-8 flex flex-col font-sans">
      <div className="flex justify-between items-center text-gray-800 mb-6">
        <button className="p-2 rounded-full hover:bg-gray-100 transition">
          <FiChevronLeft size={24} />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100 transition">
          <FiMoreVertical size={24} />
        </button>
      </div>

      <div className="flex justify-center mb-4">
        <div className="relative">
          <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg border-4 border-white ring-1 ring-gray-100">
            <img
              src={`https://evergreen-home-products.onrender.com/img/user/${data?.photo}`}
              alt="User Profile"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              onError={(e) =>
                (e.target.src = "https://via.placeholder.com/150")
              }
            />
          </div>
        </div>
      </div>

      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-gray-900 leading-tight">
          {data?.name?.split(" ")[0] || "User"} <br />
          <span className="font-light text-gray-500">
            {data?.name?.split(" ").slice(1).join(" ") || "Name"}
          </span>
        </h1>
      </div>

      <h2 className="text-lg font-bold text-gray-900 mb-4">Profile</h2>

      <div className="flex flex-col gap-6 mb-8">
        <Link
          to="/getdetails"
          className="flex items-center justify-between group cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 group-hover:bg-orange-200 transition">
              <FiUser size={20} />
            </div>
            <span className="font-semibold text-gray-700 text-lg">
              Manage user
            </span>
          </div>
          <FiChevronRight className="text-gray-400" size={20} />
        </Link>
      </div>

      <h2 className="text-lg font-bold text-gray-900 mb-4">Settings</h2>

      <div className="flex flex-col gap-6">
        <Link
          to="/orders"
          className="flex items-center justify-between group cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-500 group-hover:bg-purple-200 transition">
              <FiBell size={20} />
            </div>
            <span className="font-semibold text-gray-700 text-lg">
              <Link to="/orders">Orders</Link>
            </span>
          </div>
          <FiChevronRight className="text-gray-400" size={20} />
        </Link>

        <Link
          to="/change-password"
          className="flex items-center justify-between group cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 group-hover:bg-blue-200 transition">
              <FiLock size={20} />
            </div>
            <span className="font-semibold text-gray-700 text-lg">
              Change Password
            </span>
          </div>
          <FiChevronRight className="text-gray-400" size={20} />
        </Link>
      </div>

      <div className="mt-auto mb-10 pt-8">
        <button
          className="inline-block bg-gray-100 px-8 py-4 rounded-2xl text-blue-700 font-bold hover:bg-gray-200 transition"
          onClick={handleLogut}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default Settings;
