function UserReviews({ review }) {
  return (
    <div
      key={review._id}
      className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <div className="flex items-start gap-4">
        <div
          className={`w-12 h-12 rounded-full overflow-hidden shadow-md shrink-0`}
        >
          <img
            className="w-full h-full object-cover rounded-full transition-transform duration-500 hover:scale-105"
            src={`https://evergreen-home-products.onrender.com/img/user/${review.user.photo}`}
            alt="user"
          />
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-900 font-bold text-base">
              {review.user.name}
            </h3>
            <span className="text-gray-400 text-xs">{review.date}</span>
          </div>

          <div className="flex items-center my-1">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < review.rating ? "text-yellow-400" : "text-gray-200"
                } fill-current`}
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.817 2.05a1 1 0 00-.363 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.817-2.05a1 1 0 00-1.175 0l-2.817 2.05c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>

          <p className="text-gray-600 text-sm leading-relaxed mt-2">
            {review.review}
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserReviews;
