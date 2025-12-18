// src/hooks/useCart.js

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast"; // Optional: For nice alerts
import {
  getCart,
  addToCartApi,
  deleteCartItemApi,
  updateCartItemApi,
} from "../src/CartApi";

export function useCart() {
  const queryClient = useQueryClient();

  // 1. QUERY: Fetch Cart Data
  // This runs automatically when the page loads
  const {
    data: cartData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });

  // 2. MUTATION: Add Item to Cart (POST)
  const { mutate: addItem, isPending: isAdding } = useMutation({
    mutationFn: addToCartApi,
    onSuccess: () => {
      toast.success("Added to cart!");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (err) => toast.error(err.message),
  });

  // 3. MUTATION: Delete Item (DELETE)
  const { mutate: deleteItem, isPending: isDeleting } = useMutation({
    mutationFn: deleteCartItemApi,
    onSuccess: () => {
      toast.success("Item removed");
      // This tells React Query to refetch the 'cart' data immediately
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (err) => toast.error(err.message),
  });

  // 4. MUTATION: Update Quantity (PATCH)
  const { mutate: updateItem, isPending: isUpdating } = useMutation({
    mutationFn: updateCartItemApi,
    onSuccess: () => {
      // We usually don't show a toast for every +/- click, just refresh the data
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return {
    // Safely access the array inside your data structure
    cart: cartData?.data?.cartItems || [],

    isLoading,
    error,

    // The functions you call in your UI
    addItem,
    deleteItem,
    updateItem,

    // A combined "loading" state for disabling buttons
    isWorking: isAdding || isDeleting || isUpdating,
  };
}
