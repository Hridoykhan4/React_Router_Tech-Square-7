const getStoredReadList = () => {
  const storedCart = localStorage.getItem("read-list");
  return storedCart ? JSON.parse(storedCart) : [];
};

const addToStoredReadList = (id) => {
  const storedList = getStoredReadList();
  if (storedList.includes(id)) {
    alert("Dhuru Shala");
  } else {
    storedList.push(id);
    localStorage.setItem("read-list", JSON.stringify(storedList));
  }
};

const getStoredWishList = () => {
  const storedWishList = localStorage.getItem("wish-list");
  return storedWishList ? JSON.parse(storedWishList) : [];
};

const addToStoredWishList = (id) => {
  const wishItems = getStoredWishList();
  if (wishItems.includes(id)) {
    alert("");
  } else {
    wishItems.push(id);
    localStorage.setItem("wish-list", JSON.stringify(wishItems));
  }
};

export {
  addToStoredReadList,
  addToStoredWishList,
  getStoredReadList,
  getStoredWishList,
};
