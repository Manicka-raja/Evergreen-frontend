// api/paymentApi.js
const VITE_API_BASE = "https://evergreen-home-products.onrender.com";
export const getCheckoutSession = async (id) => {
  const response = await fetch(
    `${VITE_API_BASE}/api/v1/orders/checkout-session/${id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create order");
  }

  return response.json();
};

export const getRazorpayKey = async () => {
  const res = await fetch(`${VITE_API_BASE}/api/v1/orders/razorpay-key`, {
    credentials: "include",
  });

  const data = await res.json();
  return data;
};

export const createOrder = async (amountInPaisa) => {
  // Get the token (Assume you store it in localStorage)

  const response = await fetch(`${VITE_API_BASE}/api/v1/orders/checkout-cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      amount: amountInPaisa,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create order");
  }

  return await response.json();
};
export const saveOrder = async (orderDetails) => {
  const res = await fetch(`${VITE_API_BASE}api/v1/bookings/create-booking`, {
    // You will create this route later
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(orderDetails),
  });

  if (!res.ok) throw new Error("Failed to save booking");
  return await res.json();
};
