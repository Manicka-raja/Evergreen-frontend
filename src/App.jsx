import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Menu, { menuloader } from "./assets/pages/Menu";

import Welcome from "./assets/pages/Welcome";
import AppLayout from "./assets/pages/AppLayout";
import OrderDetails, { orderdetaisLoader } from "./assets/pages/OrderDetails";
import Cart from "./assets/pages/Cart";
import ItemList from "./assets/pages/ItemList";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Login from "./assets/pages/Login";
import Signup from "./assets/pages/Signup";
import Settings from "./assets/pages/Settings";
import Profile from "./assets/pages/Profile";
import ResetPassword from "./assets/pages/ResetPassword";
import EnterPassword from "./assets/pages/EnterPassword";
import { Toaster } from "react-hot-toast";
import Orders from "./Component/Orders";
import OrderDetailsError from "./Component/OrderDetailsError";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",

        element: <Welcome />,
      },
      {
        path: "menu",
        element: <Menu />,
        loader: menuloader,
      },

      {
        path: "list/:category",
        element: <ItemList />,
        // loader: ItemLoader,
      },
      {
        path: "item/:id",
        element: <OrderDetails />,
        loader: orderdetaisLoader,
        errorElement: <OrderDetailsError />,
      },
      {
        path: "cart",
        element: <Cart />,
      },

      {
        path: "list",
        element: <ItemList />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "getdetails",
        element: <Profile />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
    ],
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/reset-password/:token",
    element: <ResetPassword />,
  },
  {
    path: "/reset-password",
    element: <EnterPassword />,
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />;
      <Toaster position="top-center" />
    </QueryClientProvider>
  );
}

export default App;
