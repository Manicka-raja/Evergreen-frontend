import { useLoaderData, useParams } from "react-router-dom";
import UserReview from "../../Component/UserReview";
import { getProductDetails } from "../../ApiFeature";
import { useCart } from "../../../Hooks/useCart";

function OrderDetails() {
  const { id } = useParams();
  const data = useLoaderData();

  const { addItem, isWorking } = useCart();

  const handleAddToCart = () => {
    console.log("Button Clicked! Adding Product ID:", id);

    if (!id) {
      alert("Error: Product ID is missing!");
      return;
    }

    addItem({ productId: id, quantity: 1 });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-xl overflow-hidden mb-6">
        <img
          src={`http://localhost:3000/img/products/${data.image}`}
          className="w-full h-96 object-cover transition-transform duration-500 hover:scale-105"
          alt={data.name}
        />
      </div>

      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-xl p-6 sm:p-8 space-y-6">
        <div className="flex justify-between items-start border-b pb-4">
          <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">
            {data.name}
          </h1>

          <button
            onClick={handleAddToCart}
            disabled={isWorking}
            className={`flex items-center justify-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-700 transition-colors duration-300 transform hover:scale-105 ${
              isWorking ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {isWorking ? "Adding..." : "Add to Cart"}
          </button>
        </div>

        <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg">
          <div className="flex items-center space-x-2 text-lg text-gray-700 font-medium">
            <svg
              className="w-5 h-5 text-yellow-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.817 2.05a1 1 0 00-.363 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.817-2.05a1 1 0 00-1.175 0l-2.817 2.05c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>{(data?.ratingsAverage ?? 0).toFixed(1)}</span>
          </div>
          <div className="text-lg text-gray-700 font-medium border-l pl-4">
            Category: <span className="text-indigo-600">{data.category}</span>
          </div>
          <div className="text-3xl font-bold text-green-600">${data.price}</div>
        </div>

        <div className="mt-4">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Description
          </h2>
          <p className="text-gray-600 leading-relaxed">{data.description}</p>
        </div>

        <div className="pt-6 border-t mt-6">
          <UserReview data={data} id={id} />
        </div>
      </div>
    </div>
  );
}

export async function orderdetaisLoader({ params }) {
  const fetchDetails = await getProductDetails(params.id);
  return fetchDetails;
}

export default OrderDetails;
