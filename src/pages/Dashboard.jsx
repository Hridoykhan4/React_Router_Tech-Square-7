import { useEffect, useState } from "react";
import ReusableBanner from "../components/ReusableBanner";
import { getStoredCartList, getStoredWishList } from "../utilities/localDB";
import Product from "../components/Product";
import ReusableProduct from "../components/ReusableProduct";

const Dashboard = () => {
  const [activeState, setActiveState] = useState("cart");
  const [cards, setCards] = useState([]);
  const [wishCards, setWishCards] = useState([]);
  const [totalCost, setTotalCost] = useState(0.0);
  useEffect(() => {
    const storedItems = getStoredCartList();
    setCards(storedItems);
    const storedItemsPrices = storedItems.map((item) => item.price);
    const sumOfPrices = storedItemsPrices.reduce((acc, val) => acc + val, 0);
    setTotalCost(sumOfPrices);

    const storedWish = getStoredWishList();
    setWishCards(storedWish);
  }, []);

  const handleCartItem = (product) => {
    setCards([...cards, product]);
  };


  const handleSort = () => {
    const sortDsc = [...cards].sort((a, b) => b.price - a.price);
    setCards(sortDsc)
  }


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
              className="btn px-10"
            >
              Cart
            </button>
            <button
              onClick={() => setActiveState("wish")}
              className="btn px-10"
            >
              WishList
            </button>
          </div>
        </div>
      </ReusableBanner>

      <div className="w-11/12 mx-auto my-5">
        {activeState === "cart" ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-black font-bold text-2xl">Cart</h3>
              <div className="flex gap-3 items-center">
                <h3 className="text-black font-bold text-2xl">
                  Total Cost: $ {totalCost}
                </h3>
                <button onClick={handleSort} className="flex items-center btn gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
                  Sort by Price
                </button>

                <button className="flex items-center btn gap-2 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition">
                  Purchase
                </button>
              </div>
            </div>
            <article>
              {cards.map((card) => (
                <ReusableProduct
                  key={card.product_id}
                  product={card}
                ></ReusableProduct>
              ))}
            </article>
          </>
        ) : (
          <div>
            <h3 className="text-black font-bold text-2xl">Wish List</h3>
            <div>
              {wishCards.map((product) => (
                <ReusableProduct key={product.product_id} product={product}>
                  <button
                    onClick={() => handleCartItem(product)}
                    type="button"
                    class="text-white self-start btn bg-purple-700 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                  >
                    Add To Cart
                  </button>
                </ReusableProduct>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
