import { Link } from "react-router-dom";

const Product = ({ product }) => {
  const { product_image, product_title, price, product_id } = product;
  return (
    <div className="card bg-base-100  shadow-sm">
      <figure className="h-60">
        <img
          className="w-full h-full object-cover"
          src={product_image}
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product_title}</h2>
        <p className="font-semibold">Price: {price}</p>
        <div>
          <Link
            to={`/detail/${product_id}`}
            className="border btn border-[#9538E2] rounded-l-3xl rounded-r-3xl px-5 py-2"
            style={{
              boxShadow:
                "inset 0rem 0.25rem 3.13rem 0rem rgba(11, 11, 11, 0.15)",
            }}
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
