import { useRouteError } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";

function OrderDetailsError() {
  const error = useRouteError();

  useEffect(() => {
    toast.error(error.statusText || "Unable to load product");
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center text-lg font-semibold text-gray-600">
      Product not available
    </div>
  );
}

export default OrderDetailsError;
