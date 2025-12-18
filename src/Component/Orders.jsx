import { useQuery } from "@tanstack/react-query";
import { getMe } from "../ApiFeature";

function Orders() {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getMe,
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="text-center mt-10 text-red-500 font-semibold">
        Error: {error.message}
      </div>
    );

  const bookings = user?.bookings || [];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Orders</h1>
        <p className="text-gray-600">Manage and track your recent purchases</p>
      </header>

      <div className="space-y-6">
        {bookings.length === 0 ? (
          <div className="bg-white p-10 text-center rounded-xl shadow-sm border">
            <p className="text-gray-500 text-lg">
              You haven't made any orders yet.
            </p>
          </div>
        ) : (
          bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            >
              {/* Order Header */}
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex flex-wrap justify-between items-center gap-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">
                    Order ID
                  </p>
                  <p className="text-sm font-mono text-gray-700">
                    {booking._id}
                  </p>
                </div>
                <div className="flex gap-6 items-center">
                  <div className="text-right">
                    <p className="text-xs text-gray-500 uppercase font-semibold">
                      Date
                    </p>
                    <p className="text-sm text-gray-700">
                      {new Date(booking.paidAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      booking.paymentStatus === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {booking.paymentStatus.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Items List */}
              <div className="p-6">
                <ul className="divide-y divide-gray-100">
                  {booking.tours.map((item) => (
                    <li
                      key={item._id}
                      className="py-4 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-16 w-16 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden border">
                          {/* Placeholder for Tour Image */}
                          <img
                            src={`https://evergreen-home-products.onrender.com/img/products/${item.image}`}
                            alt={item.tour.name}
                            className="object-cover h-full w-full"
                            onError={(e) => {
                              e.target.src = "https://via.placeholder.com/64";
                            }}
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">
                            {item.tour.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <p className="font-medium text-gray-900">${item.price}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Order Footer */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
                <span className="text-gray-600 font-medium">Order Total</span>
                <span className="text-2xl font-bold text-blue-600">
                  ${booking.totalAmount}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Orders;
