import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { postReview } from "../ApiFeature";
import toast from "react-hot-toast";
import Loader from "./Loader";

const Modal = ({ model, onClose, id, data }) => {
  const { register, handleSubmit, reset } = useForm();
  const { ratingsAverage } = data;
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (data) => postReview(data),
    mutationKey: ["reviews"],
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"]);
      toast.success("Review added");
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  const onSubmit = (data) => {
    mutate(data);
    console.log(data);
    reset();
    onClose();
  };
  if (!model) return null;
  if (isPending) return <Loader />;
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg relative w-96"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          &times;
        </button>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <input
            name="review"
            {...register("review", { required: true })}
            placeholder="Write your review"
            className="border p-2 rounded"
          />
          <input
            type="hidden"
            value={ratingsAverage}
            name="rating"
            {...register("rating")}
          />
          <input type="hidden" name="tour" value={id} {...register("tour")} />

          <button
            type="submit"
            className="bg-yellow-700 text-white px-4 py-2 rounded"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
