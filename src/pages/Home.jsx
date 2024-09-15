import { useEffect } from "react";
import { Categories, productData } from "../Data/mockData";
import image1 from "../assets/Images/Image1.jpg";
import InfoSection from "../componets/InfoSection";
import CategorySection from "../componets/CategorySection";
import { useDispatch, useSelector } from "react-redux";
import { setProduct } from "../redux/productSlice";
import ProductCard from "../componets/ProductCard";
import Shop from "./Shop";

const Home = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.product.products);

  useEffect(() => {
    dispatch(setProduct(productData));
  }, []);
  return (
    <>
      <div className="bg-white mt-2 px-4 md:px-16 lg:px-24">
        <div className="container mx-auto  py-4 flex flex-col md:flex-row space-x-2">
          <div className="w-full md:w-3/12">
            <div className="bg-red-600 text-white text-xs font-bold px-2 py-2.5">
              Shop By Categories
            </div>
            <ul className="space-y bg-gray-100 p-3 border">
              {Categories.map((items, index) => (
                <li
                  key={index}
                  className="flex items-center text-sm font-medium"
                >
                  <div className="w-2 h-2 border border-red-500 rounded-full mr-2  "></div>
                  {items}
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full md:-9/12 mt-8 md:mt-0 h-96 relative ">
            <img src={image1} alt="" className="h-full w-full" />
            <div className="absolute top-16 right-14">
              <p className="text-gray-600 mb-4 ">E-shop</p>
              <h2 className="text-3xl font-bold">Welcome to my website</h2>
              <button className="bg-red-600 px-8 py-1.5 text-white mt-4 hover:bg-orange-700 transform trasition-transform duration-300 hover-scale-105 ">
                Shop Now
              </button>
            </div>
          </div>
        </div>
        <div className="container mx-auto py-12">
          <h2 className="text-2xl font-bold mb-6 text-center ">Top Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 cursor-pointer">
            {data.slice(0, 5).map((items, index) => (
              <ProductCard items={items} key={index} />
            ))}
          </div>
        </div>
        <Shop />
        <InfoSection />
        <CategorySection />
      </div>
    </>
  );
};

export default Home;
