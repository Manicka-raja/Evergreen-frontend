import React, { useState } from "react";
import {
  Trash2,
  Heart,
  Minus,
  Plus,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { useCart } from "../../../Hooks/useCart";
import { createOrder, getRazorpayKey, saveOrder } from "../../PaymentApi";
import Loader from "../../Component/Loader";

const Cart = () => {
  const { cart, isLoading, error, deleteItem, updateItem } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  const cartTotal = cart.reduce((acc, item) => {
    const price = item.tour ? item.tour.price : 0;
    const qty = item.quantity || 0;
    return acc + price * qty;
  }, 0);
  const handleQuantityChange = (cartItemId, currentQuantity, type) => {
    let newQuantity = currentQuantity;
    if (type === "inc") newQuantity += 1;
    if (type === "dec" && currentQuantity > 1) newQuantity -= 1;
    updateItem({ id: cartItemId, quantity: newQuantity });
  };

  const handleCheckout = async () => {
    setIsProcessing(true);
    try {
      if (!window.Razorpay) {
        alert(
          "Razorpay SDK not loaded. Please check your internet connection."
        );
        setIsProcessing(false);
        return;
      }

      // 2️⃣ Get Key & Create Order
      const keyData = await getRazorpayKey();
      const key = keyData.key;
      console.log("Key API Response:", key); // Check your browser console for this!
      // We multiply by 100 to convert Rupee to Paisa
      const orderData = await createOrder(cartTotal * 100);
      const order = orderData.order; // Access the inner order object

      // 3️⃣ Razorpay Options
      const options = {
        key: key,
        amount: order.amount,
        currency: "INR",
        name: "My Travel App",
        description: "Cart Checkout",
        order_id: order.id,

        handler: async function (response) {
          try {
            //alert("1. Payment Success! Handler is running.");
            const bookingDetails = {
              items: cart.map((item) => ({
                tour: item.tour._id,
                quantity: item.quantity,
                price: item.tour.price,
              })),
              totalAmount: cartTotal,
              paymentResult: {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              },
            };

            // alert("2. About to send data to Backend...");
            await saveOrder(bookingDetails);

            alert("Payment Successful! Booking Confirmed.");
          } catch (err) {
            alert("CRASH: " + err.message);
            console.error("Save Order Error:", err);
            alert(
              "Payment succeeded, but we couldn't save the booking. Please contact support."
            );
          }
        },

        prefill: {
          name: "User Name",
          email: "user@example.com",
          contact: "9999999999",
        },
        theme: { color: "#4f46e5" },
      };

      const razor = new window.Razorpay(options);

      razor.on("payment.failed", function (response) {
        alert(`Payment Failed: ${response.error.description}`);
      });

      razor.open();
    } catch (err) {
      console.error("Checkout Error:", err);
      alert("Something went wrong initializing payment. Check console.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Error loading cart data.
      </div>
    );
  if (isLoading) return <Loader />;
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Your Cart{" "}
          <span className="text-gray-400 font-medium text-xl ml-2">
            ({cart.length} items)
          </span>
        </h1>

        {cart.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm">
            <h2 className="text-2xl font-bold text-gray-400">
              Your cart is empty
            </h2>
          </div>
        ) : (
          <div className="lg:grid lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-8 space-y-4">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="bg-white p-6 rounded-2xl border shadow-sm flex gap-6"
                >
                  <img
                    src={`https://evergreen-home-products.onrender.com/img/products/${item.tour.image}`}
                    alt={item.tour?.name}
                    className="w-32 h-32 object-cover rounded-xl"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="text-lg font-bold">{item.tour?.name}</h3>
                      <p className="font-bold">
                        ₹{item.tour?.price * item.quantity}
                      </p>
                    </div>

                    <div className="flex justify-between mt-4">
                      <div className="flex items-center border rounded-lg">
                        <button
                          onClick={() =>
                            handleQuantityChange(item._id, item.quantity, "dec")
                          }
                          className="p-2"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-4">{item.quantity}</span>
                        <button
                          onClick={() =>
                            handleQuantityChange(item._id, item.quantity, "inc")
                          }
                          className="p-2"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <div className="flex gap-2">
                        <button>
                          <Heart size={18} />
                        </button>
                        <button onClick={() => deleteItem(item._id)}>
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-4">
              <div className="bg-white p-6 rounded-3xl shadow-xl">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                <div className="flex justify-between mb-4">
                  <span>Total</span>
                  <span className="font-bold">₹{cartTotal}</span>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className={`w-full mt-6 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 ${
                    isProcessing
                      ? "bg-indigo-400 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  }`}
                >
                  {isProcessing ? "Processing..." : "Checkout Now"}
                  {!isProcessing && <ArrowRight size={20} />}
                </button>

                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
                  <ShieldCheck size={14} />
                  <span>Secure payment</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
