import { useMutation, useQueryClient } from "@tanstack/react-query";
import { forgotPassWord } from "../../ApiFeature";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Loader from "../../Component/Loader";

function EnterPassword() {
  const { register, handleSubmit } = useForm();
  const queryClient = useQueryClient();
  const { mutate, isPending, reset } = useMutation({
    mutationFn: (emailObj) => forgotPassWord(emailObj),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      toast.success("please check your mail");
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  function onSubmit(data) {
    console.log(data);
    mutate(data);
  }

  if (isPending) {
    return <Loader />;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#FAFAF5]">
      <div className="w-full max-w-[400px] bg-white rounded-[25px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.1)] border-[10px] border-[rgba(69,140,74,0.15)]">
        <div className="w-full h-[140px] bg-[#458C4A]"></div>

        <div className="px-10 py-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 relative inline-block">
            Reset Password
            <span className="absolute left-0 -bottom-2 w-10 h-1 bg-[#458C4A] rounded-full"></span>
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Enter your email
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
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>

                <input
                  {...register("email")}
                  type="email"
                  placeholder="name@example.com"
                  className="w-full pl-12 pr-4 py-3 bg-[#f4f7fc] border border-gray-200 rounded-lg text-sm outline-none focus:border-[#458C4A] focus:ring-1 focus:ring-[#458C4A] transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#458C4A] text-white font-bold rounded-lg shadow-[0_5px_15px_rgba(69,140,74,0.4)] hover:bg-[#36703b] transition-colors"
            >
              Submit
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-gray-500">
            Remember it?{" "}
            <span className="text-[#458C4A] font-bold cursor-pointer">
              Sign In
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnterPassword;
