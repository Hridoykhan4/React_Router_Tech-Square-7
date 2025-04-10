import { useLoaderData, useParams } from "react-router-dom";
import ReusableBanner from "../components/ReusableBanner";
import { useContext, useEffect, useState } from "react";
import {
  addToCart,
  addToStoredWishList,
  CartContext,
  getStoredCartList,
  getStoredWishList,
  WishContext,
} from "../utilities/localDB";
import { PriceContext } from "../utilities/PriceContext";

const Details = () => {
  const [addWishCount, setAddWishCount] = useContext(WishContext);
  const [addCartCount, setAddCartCount] = useContext(CartContext);
  const allProducts = useLoaderData();
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [ratingState, setRateState] = useState("");
  const [isTabbed, setIsTabbed] = useState(false);
  const [totalPrice, setTotalPrice] = useContext(PriceContext);

  useEffect(() => {
    const matchedProduct =
      allProducts.find(
        (product) => product.product_id === parseInt(productId)
      ) || {};
    setProduct(matchedProduct);

    const storedItems = getStoredWishList();
    const isExist = storedItems.find(
      (pro) => pro.product_id === matchedProduct.product_id
    );
    if (isExist) {
      setIsTabbed(true);
    }

    if (product.rating > 4 && product.rating <= 4.5) {
      setRateState(
        <>
          <i className="fa-solid text-amber-600 fa-star"></i>
          <i className="fa-solid text-amber-600 fa-star"></i>
          <i className="fa-solid text-amber-600 fa-star"></i>
          <i className="fa-solid text-amber-600 fa-star"></i>
          <i className="fa-solid text-amber-600 fa-star-half-stroke"></i>
        </>
      );
    }
    if (product.rating > 4.5 && product.rating <= 9) {
      setRateState(
        <>
          <i className="fa-solid text-amber-600 fa-star"></i>
          <i className="fa-solid text-amber-600 fa-star"></i>
          <i className="fa-solid text-amber-600 fa-star"></i>
          <i className="fa-solid text-amber-600 fa-star"></i>
          <i className="fa-solid text-amber-600 fa-star"></i>
        </>
      );
    }
  }, [allProducts, productId, product.rating]);

  const {
    product_image,
    product_title,
    price,
    description,
    Specification,
    availability,
    rating,
  } = product || {};

  const handleAddToCart = (product) => {
    const newTotal = totalPrice + product.price;

    if (newTotal > 3000) {
      alert("⚠️ Your total is crossing 3000! Please check before buying.");
      return;
    }

    const stored = getStoredCartList();
    const isMatched = stored.find((p) => p.product_id === product.product_id);

    if (!isMatched) {
      setAddCartCount((prev) => prev + 1);
      setTotalPrice(newTotal);
    }

    addToCart(product);
  };
  useEffect(() => {
    localStorage.setItem("total-price", totalPrice);
  }, [totalPrice]);

  useEffect(() => {
    localStorage.setItem("count", addCartCount);
  }, [addCartCount]);

  const handleAddToWishList = (product) => {
    const stored = getStoredWishList();
    const isMatched = stored.find((p) => p.product_id === product.product_id);
    if (!isMatched) {
      setAddWishCount((prev) => parseInt(prev) + 1);
    }

    setIsTabbed(true);
    addToStoredWishList(product);
  };

  useEffect(() => {
    localStorage.setItem("wish-count", addWishCount);
  }, [addWishCount]);

  return (
    <div className="pb-5">
      <ReusableBanner>
        <div className="text-center bg-[#9538E2] text-white space-y-4 py-5">
          <h2 className="font-bold text-2xl md:text-3xl lg:text-3xl">
            Product Details
          </h2>
          <p>
            Explore the latest gadgets that will take your experience to the
            <br /> next level. From smart devices to the coolest accessories, we
            have it all!
          </p>

          <div className="flex sm:flex-row flex-col items-center -mb-24 bg-white text-black w-[93%] gap-4 sm:w-[80%] mt-6  p-4  mx-auto sm:-mb-44 rounded">
            <figure className="sm:w-[40%]">
              <img
                src={product_image}
                className="w-full h-96 object-cover"
                alt={product_title}
              />
            </figure>
            <div className="sm:w-[60%] text-left space-y-2">
              <h3 className="font-bold text-2xl">{product_title}</h3>
              <p className="font-medium">Price: ${price}</p>
              <div className="badge badge-info">
                {availability ? "In Stock" : "Out of Stock"}
              </div>
              <p className="tracking-wider font-medium">{description}</p>
              <div>
                <p className="font-bold text-base">Specification:</p>
                <ul className="list-decimal">
                  {Specification &&
                    Specification.map((s, i) => (
                      <li className="list-inside" key={i}>
                        {s}
                      </li>
                    ))}
                </ul>
              </div>
              <p className="font-bold">Rating:</p>
              <div>
                {ratingState}{" "}
                <span className="bg-gray-200 p-1 rounded-lg ms-4">
                  {rating}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 my-5">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="flex items-center gap-2 bg-blue-600 btn text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L5 9m0 0L4 5m1 4h16m-9 9a1 1 0 100 2 1 1 0 000-2zm6 0a1 1 0 100 2 1 1 0 000-2z"
                    />
                  </svg>
                  Add to Cart
                </button>

                <button
                  onClick={() => handleAddToWishList(product)}
                  disabled={isTabbed}
                  className="flex items-center gap-2 bg-gray-200 btn text-gray-700 px-4 py-2 rounded-lg shadow-md hover:bg-red-500 hover:text-white transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.68l-1.06-1.07a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z"
                    />
                  </svg>
                  Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </ReusableBanner>
    </div>
  );
};

export default Details;
