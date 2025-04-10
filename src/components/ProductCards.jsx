import { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import Product from "./Product";

const ProductCards = () => {
  const [products, setProducts] = useState([]);
  const allProducts = useLoaderData();
  const { productCategory } = useParams();
  useEffect(() => {
    if (!productCategory || productCategory === 'all') {
      setProducts(allProducts);
    } else {
      const matchedProducts = [...allProducts].filter(
        (product) => product.category === productCategory
      );
      setProducts(matchedProducts);
    }

  }, [productCategory, allProducts]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
    {products.map((product) => (
        <Product  key={product.product_id} product={product}></Product>
      ))}
    </div>
  );
};

export default ProductCards;
