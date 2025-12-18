import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { login } from "../../ApiFeature";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending, reset } = useMutation({
    mutationFn: (data) => login(data),
    mutationKey: ["users"],
    onSuccess: () => {
      toast.success("Login sucessfully");
      queryClient.invalidateQueries(["users"]);
      reset();
      navigate("/menu");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const { register, handleSubmit } = useForm();

  function onSubmit(data) {
    mutate(data);
  }

  if (isPending)
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#FAFAF5]">
        <p className="text-xl font-bold text-[#458C4A] animate-pulse">
          ...Loading
        </p>
      </div>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAF5] font-sans p-4">
      <div className="w-full max-w-sm bg-white rounded-[40px] overflow-hidden shadow-2xl relative min-h-[800px] flex flex-col">
        <div className="relative h-64 bg-[#458C4A] overflow-hidden">
          <div className="absolute -top-10 -left-10 w-64 h-64 bg-[#5da162] rounded-full mix-blend-overlay opacity-50 blur-xl"></div>
          <div className="absolute top-10 right-0 w-48 h-48 bg-[#81c784] rounded-full mix-blend-overlay opacity-50 blur-2xl"></div>

          <div className="absolute bottom-0 left-0 w-full">
            <svg
              viewBox="0 0 1440 320"
              className="w-full h-auto block align-bottom"
            >
              <path
                fill="#ffffff"
                fillOpacity="1"
                d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ></path>
            </svg>
          </div>
        </div>

        <div className="px-8 pb-12 pt-2 flex-1 flex flex-col justify-center">
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Login in</h1>
            <div className="h-1 w-16 bg-[#458C4A] rounded-full"></div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-500">Email</label>
              <div className="flex items-center border-b-2 border-gray-200 py-2 focus-within:border-[#458C4A] transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400 mr-3"
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
                <input
                  type="email"
                  placeholder="demo@email.com"
                  className="w-full outline-none text-gray-700 placeholder-gray-400 bg-transparent"
                  {...register("email")}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-500">
                Password
              </label>
              <div className="flex items-center border-b-2 border-gray-200 py-2 focus-within:border-[#458C4A] transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400 mr-3"
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
                <input
                  type="password"
                  placeholder="enter your password"
                  className="w-full outline-none text-gray-700 placeholder-gray-400 bg-transparent"
                  {...register("password")}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-300 cursor-pointer hover:text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
            </div>

            <div className="flex justify-between items-center text-sm mt-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded text-[#458C4A] border-gray-300 focus:ring-[#458C4A] accent-[#458C4A]"
                />
                <span className="font-bold text-gray-600">Remember Me</span>
              </label>
              <Link
                to="/reset-password"
                className="font-bold text-[#458C4A] hover:text-[#36703b]"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-[#458C4A] text-white font-bold py-4 rounded-2xl shadow-lg shadow-green-100 hover:bg-[#36703b] transition transform hover:scale-[1.02] active:scale-95 mt-8"
            >
              Login
            </button>
          </form>

          <div className="mt-8 text-center text-sm font-medium text-gray-500">
            Don't have an Account ?{" "}
            <a href="#" className="text-[#458C4A] font-bold hover:underline">
              Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
