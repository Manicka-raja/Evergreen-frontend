//const API_BASE = "http://localhost:3000/api/v1/products";
//const USER_BASE = "http://localhost:3000/api/v1/Users/login";
const VITE_API_BASE = "https://evergreen-home-products.onrender.com";

export const getmenu = async ({ price, sort, page, limit } = {}) => {
  const params = new URLSearchParams();
  if (price) params.set("price[gte]", price);
  if (sort) params.set("sort", sort);
  if (page) params.set("page", page);
  if (limit) params.set("limit", limit);
  const StringParams = params.toString();
  const QueryString = `${VITE_API_BASE}/api/v1/products?${StringParams}`;
  const url = StringParams ? QueryString : `${VITE_API_BASE}/api/v1/products`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
  return data.data.tours;
};

export const getProductDetails = async (id) => {
  const url = `${VITE_API_BASE}/api/v1/products/${id}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
  return data.data.tour;
};

export async function postReview(objectData) {
  const res = await fetch(`${VITE_API_BASE}/api/v1/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(objectData),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
}

export async function login(obj) {
  const res = await fetch(`${VITE_API_BASE}/api/v1/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(obj),
  });

  const data = await res.json();
  if (!res.ok) throw Error(data.message);
  return data.data.user;
}

export async function signup(formData) {
  const res = await fetch(`${VITE_API_BASE}/api/v1/users/signup`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) throw Error(data.message);
  return data.data.user;
}

export async function getMe() {
  const res = await fetch(`${VITE_API_BASE}/api/v1/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data = await res.json();
  if (!res.ok) throw Error(data.message);
  return data.data.user;
}

export const updateUser = async (id, formData) => {
  const res = await fetch(`${VITE_API_BASE}/api/v1/users/updateMe`, {
    method: "PATCH",

    credentials: "include",
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data.data.Updateuser;
};

export const resetPassword = async (token, data) => {
  const res = await fetch(`${VITE_API_BASE}/api/v1/users/newPass/${token}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const errorData = await res.json();
  if (!res.ok) throw new Error(errorData.message);
  return errorData;
};

export async function forgotPassWord(emailObj) {
  const res = await fetch(`${VITE_API_BASE}/api/v1/users/forgot`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(emailObj),
  });

  const data = await res.json();
  if (!res.ok) throw Error(data.message);
  return data;
}
export const logoutUser = async () => {
  const res = await fetch(`${VITE_API_BASE}/api/v1/users/logout`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Logout failed");
  }

  return res.json();
};
