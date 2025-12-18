const VITE_API_BASE = "https://evergreen-home-products.onrender.com";
const getAuthHeaders = () => {
  return {
    "Content-Type": "application/json",
  };
};

// src/services/apiCart.js

// src/services/apiCart.js

// src/services/apiCart.js

export const addToCartApi = async ({ productId, quantity }) => {
  // The 'productId' argument (from the OrderDetails component)
  // is now correctly mapped to the 'tour' key expected by the backend.
  console.log("✅ Sending final data to Backend -> Key: tour, ID:", productId);

  const response = await fetch(`${VITE_API_BASE}/api/v1/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",

    body: JSON.stringify({
      tour: productId,
      quantity: quantity,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to add item");
  }

  return response.json();
};
export const getCart = async () => {
  const response = await fetch(`${VITE_API_BASE}/api/v1/cart`, {
    method: "GET",
    headers: getAuthHeaders(),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch cart");
  }

  return response.json();
};

export const deleteCartItemApi = async (id) => {
  const response = await fetch(`${VITE_API_BASE}/api/v1/cart/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Could not delete item");
  }

  return true;
};

export const updateCartItemApi = async ({ id, quantity }) => {
  const response = await fetch(`${VITE_API_BASE}/api/v1/cart/${id}`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    credentials: "include",
    body: JSON.stringify({ quantity }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Could not update quantity");
  }

  return response.json();
};
