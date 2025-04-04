import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CartContext, WishContext } from "../utilities/localDB";
import { useEffect, useState } from "react";
import { PriceContext } from "../utilities/PriceContext";

const MainLayout = () => {
  const [addCartCount, setAddCartCount] = useState(
    (localStorage.getItem("count") &&
      JSON.parse(localStorage.getItem("count"))) ||
      0
  );

  const [addWishCount, setAddWishCount] = useState(
    localStorage.getItem("wish-count") || 0
  );

  const [totalPrice, setTotalPrice] = useState(
    localStorage.getItem("total-price") || 0
  );

  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/") {
      document.title = `Gadgets | Tech Square`;
    }
    if (location.pathname === "/dashboard") {
      document.title = `${location.pathname.slice(1)} | Tech Square`;
    }
    if (location.pathname === "/statistics" || location.pathname === "/about") {
      document.title = `${location.pathname.slice(1)} | Tech Square`;
    }
  }, [location]);

  return (
    <>
      <PriceContext.Provider value={[totalPrice, setTotalPrice]}>
        <WishContext.Provider value={[addWishCount, setAddWishCount]}>
          <CartContext.Provider value={[addCartCount, setAddCartCount]}>
            <header className="mt-4 border-black/20 mx-4">
              <Navbar></Navbar>
            </header>

            <main className="">
              <Outlet></Outlet>
            </main>

            <Footer></Footer>
          </CartContext.Provider>
        </WishContext.Provider>
      </PriceContext.Provider>
    </>
  );
};

export default MainLayout;
