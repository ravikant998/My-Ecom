import { useEffect, useState } from "react";
import { FaCarSide, FaQuestion } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addToCart } from "../redux/cartSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState();

  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    const newproduct = products.find((product) => product.id === parseInt(id));
    setProduct(newproduct);
  }, [id]);

  const addtocartHandler = () => {
    if (product) {
      dispatch(addToCart(product));
      alert("Product added");
    }
  };
  return (
    <>
      <div className="container mx-auto py-8 px-4 md:px-16 lg:px-24">
        <div className="flex flex-col md:flex-row gap-x-16">
          <div className="md:w-1/2 py-4 shodow-md md:px-8 h-96 flex justify-center">
            <img src={product?.image} alt="" className="h-full" />
          </div>
          <div className="md:w-1/2 p-4 shodow-md md:px-16  flex flex-col justify-center gap-y-2">
            <h2 className="text-3xl font-semibold mb-2">{product?.name}</h2>
            <p className="text-xl font-semibold text-gray-800 mb-4">
              ${product?.price}
            </p>
            <div className="flex items-center mb-4 gap-x-2">
              <input
                type="number"
                id="quantity"
                min="1"
                className="border p-1 w-16"
              />
              <button
                className="bg-red-600 text-white py-1.5 px-4 hover:bg-red-800"
                onClick={addtocartHandler}
              >
                Add cart
              </button>
            </div>
            <div className="flex flex-col gap-4 mt-4 ">
              <p className="flex items-center">
                <FaCarSide className="mr-1" />
                Delivery & Return
              </p>
              <p className="flex items-center">
                <FaQuestion className="mr-1" />
                Ask a Question
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
