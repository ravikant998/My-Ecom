import { FaStar } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { Link, useParams } from "react-router-dom";

const ProductCard = ({ items, index }) => {
  const dispatch = useDispatch();

  const addCartHandler = (e, item) => {
    e.preventDefault();
    const savedCart = localStorage.getItem("cart");
    const cart = savedCart ? JSON.parse(savedCart).items : [];
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      existingItem.quantity += 1;
      existingItem.totalPrice = existingItem.quantity * existingItem.price;
    } else {
      cart.push({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
        totalPrice: item.price,
        image: item.image,
      });
    }
    const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cart.reduce((acc, item) => acc + item.totalPrice, 0);

    const cartWithTotals = {
      items: cart,
      totalQuantity,
      totalPrice,
    };

    localStorage.setItem("cart", JSON.stringify(cartWithTotals));
    window.dispatchEvent(new Event("storage"));
    // dispatch(addToCart(item));
    // alert("Product added to cart");
  };

  return (
    <>
      <Link to={`/product/${items.id}`}>
        <div
          key={index}
          className="bg-white shadow rounded relative border transform 
        trasition-transform duration-300 hover:scale-105 mb-6"
        >
          <img
            src={items.image}
            alt=""
            className="w-full h-48 object-contain mb-4"
          />
          <h3 className="text-lg font-semibold hover:text-red-500 ml-3 ">
            {items.name}
          </h3>
          <p className="text-gray-500 ml-3">$ {items.price}</p>
          <div className="flex items-center mt-2 ml-3">
            <FaStar className="text-yellow-500" />
            <FaStar className="text-yellow-500" />
            <FaStar className="text-yellow-500" />
            <FaStar className="text-yellow-500" />
            <FaStar className="text-yellow-500" />
          </div>
          <div
            className="absolute bottom-4 right-2 flex items-center justify-center w-8 bg-red-600
                group text-white text-sm rounded-full hover:w-32 hover:bg-red-700 transition-all"
            onClick={(e) => addCartHandler(e, items)}
          >
            <span className="group-hover:hidden">+</span>
            <span className="hidden group-hover:block">Add to cart</span>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ProductCard;
