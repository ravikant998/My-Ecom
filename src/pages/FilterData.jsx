import { useSelector } from "react-redux";
import ProductCard from "../componets/ProductCard";
import noProduct from "../assets/Images/noProduct.png";
const FilterData = () => {
  const filterProducts = useSelector((state) => state.product.filterData);

  return (
    <>
      <div className=" mx-auto px-4 md:px-16 lg:px-24">
        {filterProducts.length > 0 ? (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center ">Shop</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 cursor-pointer">
              {filterProducts.map((items, index) => (
                <ProductCard items={items} key={index} />
              ))}
            </div>
          </>
        ) : (
          <div className="flex justify-center mt-5 mb-3">
            <img src={noProduct} alt="" />
          </div>
        )}
      </div>
    </>
  );
};

export default FilterData;
