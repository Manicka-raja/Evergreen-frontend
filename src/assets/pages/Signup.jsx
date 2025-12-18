import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup } from "../../ApiFeature";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../Component/Loader";

function Signup() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const [preview, setPreview] = useState(null);

  const { mutate, isPending } = useMutation({
    mutationFn: (formData) => signup(formData),
    mutationKey: ["users"],
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      toast.success("sign up successfully");
      reset();
      navigate("/menu");
      setPreview(null);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  function onSubmit(data) {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);

    if (data.photo && data.photo[0]) {
      formData.append("photo", data.photo[0]);
    }

    mutate(formData);
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  if (isPending) return <Loader />;

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#FAFAF5] py-10">
      <div className="w-full max-w-[400px] bg-white rounded-[40px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.1)] border-[8px] border-[rgba(69,140,74,0.1)] relative">
        {/* Solid Green Header */}
        <div className="w-full h-[120px] bg-[#458C4A] absolute top-0 left-0 z-0"></div>

        <div className="relative z-10 px-8 pt-8 pb-10 flex flex-col items-center">
          <h2 className="text-3xl font-bold text-white mb-6 drop-shadow-md">
            Sign Up
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-4 bg-white p-6 rounded-[30px] shadow-lg"
          >
            {/* Image Upload Section */}
            <div className="flex justify-center -mt-16 mb-2">
              <div className="relative group">
                <div className="w-28 h-28 rounded-full border-4 border-white shadow-md overflow-hidden bg-gray-100 flex items-center justify-center">
                  {preview ? (
                    <img
                      src={preview}
                      alt="profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
                <label className="absolute bottom-1 right-1 bg-[#458C4A] text-white p-2 rounded-full cursor-pointer hover:bg-[#36703b] transition shadow-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    {...register("photo", {
                      onChange: (e) => handleImageChange(e),
                    })}
                  />
                </label>
              </div>
            </div>

            {/* Name Input */}
            <div className="relative">
              <div className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Full Name"
                {...register("name")}
                className="w-full pl-12 pr-4 py-3 bg-[#f4f7fc] border border-gray-200 rounded-xl text-sm outline-none focus:border-[#458C4A] focus:ring-1 focus:ring-[#458C4A] transition-colors"
              />
            </div>

            {/* Email Input */}
            <div className="relative">
              <div className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <input
                type="email"
                placeholder="Email Address"
                {...register("email")}
                className="w-full pl-12 pr-4 py-3 bg-[#f4f7fc] border border-gray-200 rounded-xl text-sm outline-none focus:border-[#458C4A] focus:ring-1 focus:ring-[#458C4A] transition-colors"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <div className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <input
                type="password"
                placeholder="Password"
                {...register("password")}
                className="w-full pl-12 pr-4 py-3 bg-[#f4f7fc] border border-gray-200 rounded-xl text-sm outline-none focus:border-[#458C4A] focus:ring-1 focus:ring-[#458C4A] transition-colors"
              />
            </div>

            {/* Confirm Password Input */}
            <div className="relative">
              <div className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <input
                type="password"
                placeholder="Confirm Password"
                {...register("confirmPassword")}
                className="w-full pl-12 pr-4 py-3 bg-[#f4f7fc] border border-gray-200 rounded-xl text-sm outline-none focus:border-[#458C4A] focus:ring-1 focus:ring-[#458C4A] transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-3.5 bg-[#458C4A] text-white font-bold rounded-xl shadow-[0_5px_15px_rgba(69,140,74,0.4)] hover:bg-[#36703b] transform active:scale-95 transition-all"
            >
              Sign Up
            </button>

            <div className="text-center text-xs text-gray-500 mt-2">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#458C4A] font-bold hover:underline"
              >
                Log In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
