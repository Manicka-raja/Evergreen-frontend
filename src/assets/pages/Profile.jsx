import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMe, updateUser } from "../../ApiFeature";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import {
  FiEdit2,
  FiCamera,
  FiSave,
  FiX,
  FiUser,
  FiMail,
  FiShield,
} from "react-icons/fi";
import toast from "react-hot-toast";
import Loader from "../../Component/Loader";

function Profile() {
  const [edit, setIsEdit] = useState(false);
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getMe,
  });

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
        photo: user.photo,
      });
    }
  }, [user, reset]);

  const { mutate, isPending } = useMutation({
    mutationFn: (formdata) => updateUser(user._id, formdata),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("credentials changed sucessfully");
      setIsEdit(false);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  function onSubmit(data) {
    const formdata = new FormData();
    formdata.append("name", data.name);
    formdata.append("email", data.email);

    if (data.photo && data.photo.length > 0) {
      formdata.append("photo", data.photo[0]);
    }

    mutate(formdata);
  }

  if (isLoading) return <Loader />;

  return (
    <div className="h-screen w-full bg-gray-50 flex items-center justify-center overflow-y-auto p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden transition-all duration-300 border border-gray-100 my-auto">
        <div className="h-40 bg-[#36703B] relative">
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsEdit((prev) => !prev);
              if (edit) reset({ name: user.name, email: user.email });
            }}
            className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-full transition-all"
            title={edit ? "Cancel" : "Edit Profile"}
          >
            {edit ? <FiX size={24} /> : <FiEdit2 size={24} />}
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="relative px-8 pb-10">
          <div className="relative -mt-24 mb-8 flex justify-center">
            <div className="relative group">
              <img
                src={`https://evergreen-home-products.onrender.com/img/user/${user.photo}`}
                className="w-48 h-48 rounded-full object-cover border-[6px] border-white shadow-lg bg-gray-200"
                alt="User"
              />

              {edit && (
                <label className="absolute bottom-2 right-2 bg-[#36703B] text-white p-3 rounded-full shadow-lg cursor-pointer hover:opacity-90 transition-colors transform hover:scale-110">
                  <FiCamera size={20} />
                  <input
                    type="file"
                    accept="image/*"
                    {...register("photo")}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          <div className="space-y-6 max-w-lg mx-auto">
            <div className="relative">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-500 mb-1">
                <FiUser /> Full Name
              </label>
              <input
                {...register("name")}
                disabled={!edit}
                className={`w-full px-4 py-3 rounded-lg border text-gray-700 focus:outline-none focus:ring-2 transition-all ${
                  edit
                    ? "bg-white border-gray-300 focus:ring-[#36703B] focus:border-[#36703B] shadow-sm"
                    : "bg-gray-50 border-transparent text-gray-500 cursor-not-allowed"
                }`}
              />
            </div>

            <div className="relative">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-500 mb-1">
                <FiMail /> Email Address
              </label>
              <input
                {...register("email")}
                disabled={!edit}
                className={`w-full px-4 py-3 rounded-lg border text-gray-700 focus:outline-none focus:ring-2 transition-all ${
                  edit
                    ? "bg-white border-gray-300 focus:ring-[#36703B] focus:border-[#36703B] shadow-sm"
                    : "bg-gray-50 border-transparent text-gray-500 cursor-not-allowed"
                }`}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-100">
              <div className="flex items-center gap-2 text-[#36703B] font-medium">
                <FiShield /> Role
              </div>
              <span className="px-4 py-1.5 bg-green-100 text-[#36703B] text-sm font-bold uppercase rounded-full tracking-wider">
                {user.role}
              </span>
            </div>
          </div>

          {edit && (
            <div className="mt-10 max-w-lg mx-auto animate-fade-in-up">
              <button
                type="submit"
                disabled={isPending}
                className="w-full flex items-center justify-center gap-2 bg-[#36703B] hover:opacity-90 text-white font-semibold py-3.5 px-6 rounded-lg shadow-md hover:shadow-lg transform active:scale-95 transition-all disabled:opacity-70"
              >
                {isPending ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <FiSave size={20} /> Save Changes
                  </>
                )}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Profile;
