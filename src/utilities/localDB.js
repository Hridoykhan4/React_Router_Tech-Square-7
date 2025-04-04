import { createContext } from "react";

const getStoredCartList = () => {
  const storedCart = localStorage.getItem("cart-list");
  return storedCart ? JSON.parse(storedCart) : [];
};

const addToCart = (product) => {
  const storedList = getStoredCartList();
  if (storedList.find((list) => list.product_id === product.product_id)) {
    alert("Dhuru Shala");
  } else {
    storedList.push(product);
    localStorage.setItem("cart-list", JSON.stringify(storedList));
  }
};

export const WishContext = createContext(0);

export const CartContext = createContext(0);

const getStoredWishList = () => {
  const storedWishList = localStorage.getItem("wish-list");
  return storedWishList ? JSON.parse(storedWishList) : [];
};

const removeFromCart = (id) => {
  const stored = getStoredCartList();
  const remaining = stored.filter((card) => card.product_id !== id);
  localStorage.setItem("cart-list", JSON.stringify(remaining));
};

const addToStoredWishList = (product) => {
  const wishItems = getStoredWishList();
  if (wishItems.find((list) => list.product_id === product.product_id)) {
    alert("");
  } else {
    wishItems.push(product);
    localStorage.setItem("wish-list", JSON.stringify(wishItems));
  }
};

export {
  addToCart,
  addToStoredWishList,
  getStoredCartList,
  getStoredWishList,
  removeFromCart,
};
