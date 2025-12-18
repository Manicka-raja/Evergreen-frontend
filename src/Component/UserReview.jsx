import React, { useState } from "react";
import Modal from "./Model";
import UserReviews from "./UserReviews";
function UserReview({ data, id }) {
  const [open, setIsOpen] = useState(false);
  const [model, OpenModel] = useState(false);
  console.log(data);
  return (
    <>
      <div className="w-full space-y-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            User Reviews
          </h2>
          <button
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
            onClick={() => setIsOpen((open) => !open)}
          >
            View all reviews &rarr;
          </button>
          <button
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
            onClick={() => OpenModel((open) => !open)}
          >
            Post a review &rarr;
          </button>
        </div>
        {open && (
          <div className="grid gap-4">
            {data?.reviews?.length > 0 ? (
              data.reviews.map((review) => <UserReviews review={review} />)
            ) : (
              <p>no reviews</p>
            )}
          </div>
        )}
      </div>
      {model && (
        <Modal
          data={data}
          model={model}
          id={id}
          onClose={() => OpenModel((open) => !open)}
        />
      )}
    </>
  );
}

export default UserReview;
