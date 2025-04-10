import { NavLink, useLocation } from "react-router-dom";

const Categories = ({ categories }) => {
  const { pathname } = useLocation();

  return (
    <div className="flex flex-col gap-5">
      {categories.map((category) => {
        const isAll = category.category === "all";
        const isAllActive = pathname === "/product/all";

        return (
          <NavLink
            key={category.product_id}
            to={`/product/${category.category}`}
            className={({ isActive }) => {
              const active = isAll ? isAllActive : isActive;

              return `btn border-[#9538E2] font-bold capitalize ${
                active ? "bg-[#9538E2] text-white" : "text-[#9538E2]"
              }`;
            }}
          >
            {category.category}
          </NavLink>
        );
      })}
    </div>
  );
};

export default Categories;
