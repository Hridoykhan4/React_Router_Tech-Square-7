import { NavLink } from "react-router-dom";

const Categories = ({ categories }) => {
  return (
    <div className="flex flex-col gap-5">
      {categories.map((category) => (
        <NavLink
          key={category.product_id}
          to={`/product/${category.category}`}
          className={({ isActive }) =>
            `btn ${isActive && 'bg-[#9538E2] text-white'}  border-[#9538E2] font-bold text-[#9538E2] capitalize`
          }
        >
          {category.category}
        </NavLink>
      ))}
    </div>
  );
};

export default Categories;
