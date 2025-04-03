const ReusableProduct = ({ product, children }) => {
  const { product_image, product_title, price, product_id , description} = product;
  return (
    <div className=" bg-base-100 items-start justify-start shadow-xl flex space-y-4 my-4">
      <figure className="h-44 items-start ">
        <img
          className="w-full h-full object-cover"
          src={product_image}
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product_title}</h2>
        <p>{description}</p>
        <p className="font-semibold">Price: $ {price}</p>
        {children}
      </div>
    </div>
  );
};

export default ReusableProduct;
