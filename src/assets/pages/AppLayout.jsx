import { Outlet, useLocation, useNavigation } from "react-router-dom";
import Footer from "../../Component/Footer";
import Loader from "../../Component/Loader";

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  const location = useLocation();
  const hideFooter =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/" ||
    location.pathname.startsWith("/reset-password");

  return (
    <div className=" min-h-screen">
      {isLoading && <Loader />}

      <main className="overflow-scroll">
        <Outlet />
      </main>

      {!hideFooter && <Footer />}
    </div>
  );
}

export default AppLayout;
