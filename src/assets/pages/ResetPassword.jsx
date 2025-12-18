import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { resetPassword } from "../../ApiFeature";
import { toast } from "react-hot-toast";
import Loader from "../../Component/Loader";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => resetPassword(token, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      toast.success("Password reset successful! Please login.");
      navigate("/login");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  function onSubmit(data) {
    mutate(data);
  }

  if (isPending) return <Loader />;
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#FAFAF5]">
      <div className="w-full max-w-[400px] bg-white rounded-[25px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.1)] border-[10px] border-[rgba(69,140,74,0.15)]">
        {/* Header Section: Solid Green, No SVG */}
        <div className="w-full h-[140px] bg-[#458C4A]"></div>

        <div className="px-10 py-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 relative inline-block">
            Reset Password
            <span className="absolute left-0 -bottom-2 w-10 h-1 bg-[#458C4A] rounded-full"></span>
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                New Password
              </label>
              <div className="relative">
                <div className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>

                <input
                  type="password"
                  placeholder="Create new password"
                  {...register("password", { required: true, minLength: 8 })}
                  className="w-full pl-12 pr-4 py-3 bg-[#f4f7fc] border border-gray-200 rounded-lg text-sm outline-none focus:border-[#458C4A] focus:ring-1 focus:ring-[#458C4A] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>

                <input
                  type="password"
                  placeholder="Confirm new password"
                  {...register("confirmPassword", { required: true })}
                  className="w-full pl-12 pr-4 py-3 bg-[#f4f7fc] border border-gray-200 rounded-lg text-sm outline-none focus:border-[#458C4A] focus:ring-1 focus:ring-[#458C4A] transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full mt-4 py-3.5 bg-[#458C4A] text-white font-bold rounded-lg shadow-[0_5px_15px_rgba(69,140,74,0.4)] hover:bg-[#36703b] disabled:opacity-70 disabled:cursor-not-allowed transition-all"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
