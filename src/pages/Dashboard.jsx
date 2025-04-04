import { useContext, useEffect, useState } from "react";
import ReusableBanner from "../components/ReusableBanner";
import {
  CartContext,
  getStoredCartList,
  getStoredWishList,
  removeFromCart,
  WishContext,
} from "../utilities/localDB";
import ReusableProduct from "../components/ReusableProduct";
import { useNavigate } from "react-router-dom";
import { PriceContext } from "../utilities/PriceContext";

const Dashboard = () => {
  const [activeState, setActiveState] = useState("cart");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [wishCards, setWishCards] = useState([]);
  const [totalCost, setTotalCost] = useState(0.0);
  const [addCartCount, setAddCartCount] = useContext(CartContext);
  const [addWishCount, setAddWishCount] = useContext(WishContext);
  const [totalPrice, setTotalPrice] = useContext(PriceContext);
  useEffect(() => {
    const storedItems = getStoredCartList();
    setCards(storedItems);
    const storedItemsPrices = storedItems.map((item) => item.price);
    const sumOfPrices = storedItemsPrices.reduce((acc, val) => acc + val, 0);
    setTotalCost(sumOfPrices.toFixed(2));

    const storedWish = getStoredWishList();
    setWishCards(storedWish);
  }, [totalPrice]);

  const handleCartItem = (product) => {
    setCards([...cards, product]);
    setTotalCost((prev) => prev + product.price);
    localStorage.setItem("cart-list", JSON.stringify([...cards, product]));
    localStorage.setItem("count", addCartCount + 1);
    localStorage.setItem("wish-count", addWishCount - 1);
    setTotalPrice((prev) => prev + parseInt(product.price));
    const remaining = wishCards.filter(
      (card) => card.product_id !== product.product_id
    );

    const newTotal = parseInt(totalPrice) + parseInt(product.price);
    setTotalPrice(newTotal);
    localStorage.setItem("total-price", newTotal);

    localStorage.setItem("wish-list", JSON.stringify(remaining));
    setAddWishCount((prev) => prev - 1);
    setAddCartCount((prev) => prev + 1);
    setWishCards(remaining);
  };

  const navigate = useNavigate();

  const handleSort = () => {
    const sortDsc = [...cards].sort((a, b) => b.price - a.price);
    setCards(sortDsc);
  };

  const handlePurChase = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    localStorage.clear();
    setAddCartCount(0);
    setAddWishCount(0);
    setTotalPrice(0);
    navigate(`/`);
  };

  const handleRemove = (card) => {
    removeFromCart(card.product_id);
    const stored = getStoredCartList();
    const remaining = stored.filter(
      (prod) => prod.product_id !== card.product_id
    );
    setCards(remaining);
    setAddCartCount((prev) => prev - 1);
    const counterReal = parseInt(addCartCount) - 1;
    localStorage.setItem("count", counterReal);

    setTotalPrice((prev) => prev - parseInt(card.price));
    const minusTotal = parseInt(totalCost) - parseInt(card.price);
    localStorage.setItem("total-price", minusTotal);
  };

  return (
    <div>
      <ReusableBanner>
        <div className="text-center bg-[#9538E2] text-white space-y-4 py-5">
          <h2 className="font-bold text-2xl md:text-3xl lg:text-3xl">
            Dashboard
          </h2>
          <p>
            Explore the latest gadgets that will take your experience to the
            <br /> next level. From smart devices to the coolest accessories, we
            have it all!
          </p>
          <div className="flex justify-center gap-2">
            <button
              onClick={() => setActiveState("cart")}
              className={`btn px-10 ${
                activeState === "cart" && "btn-success text-white"
              }`}
            >
              Cart
            </button>
            <button
              onClick={() => setActiveState("wish")}
              className={`btn px-10 ${
                activeState === "wish" && "btn-success text-white"
              }`}
            >
              WishList
            </button>
          </div>
        </div>
      </ReusableBanner>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold text-green-600">
              🎉 Congratulations! 🎉
            </h2>
            <p>Your purchase was successful.</p>
            <p>Total: $ {totalPrice}</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
      <div className="w-11/12 mx-auto my-5">
        {activeState === "cart" ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-2xl">Cart</h3>
              <div className="flex gap-3 items-center">
                <h3 className=" font-bold text-2xl">
                  Total Cost: $ {totalPrice}
                </h3>
                <button
                  onClick={handleSort}
                  className="flex items-center btn gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
                >
                  Sort by Price
                </button>

                <button
                  onClick={handlePurChase}
                  disabled={cards.length === 0 || totalCost === 0}
                  className="flex items-center btn gap-2 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition"
                >
                  Purchase
                </button>
              </div>
            </div>

            <article>
              {cards.length ? (
                cards.map((card) => (
                  <ReusableProduct key={card.product_id} product={card}>
                    {" "}
                    <div className="card-actions justify-end">
                      <button
                        onClick={() => handleRemove(card)}
                        className="btn btn-primary"
                      >
                        Remove Item
                      </button>
                    </div>
                  </ReusableProduct>
                ))
              ) : (
                <>
                  <p className="font-bold text-lg">
                    No Product is in Cart Yet!!!
                  </p>
                  <button
                    onClick={() => navigate(`/`)}
                    className="btn my-3 btn-primary"
                  >
                    Visit Our Products and Order
                  </button>
                </>
              )}
            </article>
          </>
        ) : (
          <div>
            <h3 className="font-bold text-2xl">Wish List</h3>
            <div>
              {wishCards.length ? (
                wishCards.map((product, i) => (
                  <ReusableProduct key={i} product={product}>
                    <button
                      onClick={() => handleCartItem(product)}
                      type="button"
                      className="text-white self-start btn bg-purple-700 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                    >
                      Add To Cart
                    </button>
                  </ReusableProduct>
                ))
              ) : (
                <>
                  <p className="font-bold mt-4 text-lg">
                    No Product is in WishList Yet!!!
                  </p>
                  <button
                    onClick={() => navigate(`/`)}
                    className="btn my-3 btn-primary"
                  >
                    Visit Products
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
