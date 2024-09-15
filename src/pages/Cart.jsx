import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import emptyCart from "../assets/Images/emaptyCart.jpg";
import { FaTrashAlt } from "react-icons/fa";
import Modal from "../componets/Modal";
import ChangeAddress from "../componets/ChangeAddress";
import {
  decreamentQuantity,
  increamentQuantity,
  removeFromCart,
} from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart); // This is used only on redux toolkit
  const [address, setAddress] = useState("Delhi,100092");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]); // This is used only on localStorege

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (!savedCart) {
      setCartItems({ items: [], totalQuantity: 0, totalPrice: 0 });
      return;
    }
    const cart = JSON.parse(savedCart);
    setCartItems(cart);
  }, []);

  const updateCartState = (updatedCart) => {
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  const removeProduct = (id) => {
    // dispatch(removeFromCart(id));
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (!savedCart || !Array.isArray(savedCart.items)) {
      console.error("No cart found or items is not an array");
      return;
    }
    const updatedItems = savedCart.items.filter((item) => item.id !== id);

    const totalQuantity = updatedItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    const totalPrice = updatedItems.reduce(
      (total, item) => total + item.totalPrice,
      0
    );
    const updatedCart = {
      items: updatedItems,
      totalQuantity: totalQuantity,
      totalPrice: totalPrice,
    };
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    window.dispatchEvent(new Event("storage"));
  };
  const handleDecreaseQuantity = (id) => {
    // Uncomment the line below if using Redux
    // dispatch(decreamentQuantity(id));
    const savedCart = localStorage.getItem("cart");
    if (!savedCart) {
      alert("No cart found in localStorage.");
      return;
    }
    const cart = JSON.parse(savedCart);
    if (!Array.isArray(cart.items)) {
      console.error("Cart items are not in an array.");
      return;
    }
    const updatedItems = cart.items.map((item) => {
      if (item.id === id) {
        const newQuantity = Math.max(item.quantity - 1, 1);
        return {
          ...item,
          quantity: newQuantity,
          totalPrice: newQuantity * item.price,
        };
      }
      return item;
    });

    const totalQuantity = updatedItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    const totalPrice = updatedItems.reduce(
      (total, item) => total + item.totalPrice,
      0
    );
    const updatedCart = {
      items: updatedItems,
      totalQuantity: totalQuantity,
      totalPrice: totalPrice,
    };
    updateCartState(updatedCart);
    window.dispatchEvent(new Event("storage"));
  };

  const handleIncreaseQuantity = (id) => {
    // dispatch(increamentQuantity(id));   //This is used for redux
    const savedCart = localStorage.getItem("cart");
    if (!savedCart) {
      alert("No cart found in localStorage.");
      return;
    }
    const cart = JSON.parse(savedCart);
    if (!Array.isArray(cart.items)) {
      // console.log("Cart items are not in an array.");
      return;
    }
    const updatedItems = cart.items.map((item) => {
      if (item.id === id) {
        const newQuantity = item.quantity + 1;
        return {
          ...item,
          quantity: newQuantity,
          totalPrice: newQuantity * item.price,
        };
      }
      return item;
    });

    const totalQuantity = updatedItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    const totalPrice = updatedItems.reduce(
      (total, item) => total + item.totalPrice,
      0
    );
    const updatedCart = {
      items: updatedItems,
      totalQuantity: totalQuantity,
      totalPrice: totalPrice,
    };
    updateCartState(updatedCart);
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <>
      <div className="container mx-auto py-8 min-h-96 px-4 md:px-16 lg:px-24">
        {cartItems?.items?.length > 0 ? (
          <div>
            <h3 className="text-2xl font-semibold mb-4">Shopping Cart</h3>
            <div className="flex flex-col md:flex-row justify-between space-x-10 mt-8">
              <div className="md:w-2/3">
                <div className="flex justify-between border-b items-center mb-4 text-xs font-bold">
                  <p>Products</p>
                  <div className="flex space-x-8">
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>SubTotal</p>
                    <p>Remove</p>
                  </div>
                </div>
                <div>
                  {cartItems.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border-b"
                    >
                      <div className="md:flex items-center space-x-4">
                        <img
                          src={item.image}
                          alt=""
                          className="w-16 h-16 object-contain rounded"
                        />
                        <div className="flex-1 ml-4">
                          <h3 className="text-lg font-semibold">{item.name}</h3>
                        </div>
                      </div>
                      <div className="flex items-center space-x-8">
                        <p>${item.price}</p>
                        <div className="flex items-center justify-center border">
                          <button
                            className="text-xl font-bold px-1.5 border-r"
                            onClick={() => handleDecreaseQuantity(item.id)}
                          >
                            -
                          </button>
                          <p className="px-2">{item.quantity}</p>
                          <button
                            className="text-xl font-bold px-1.5 border-l"
                            onClick={() => handleIncreaseQuantity(item.id)}
                          >
                            +
                          </button>
                        </div>
                        <p>${(item.quantity * item.price).toFixed(2)}</p>
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => removeProduct(item.id)}
                        >
                          <FaTrashAlt />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:w-1/3 bg-white p-6 rounded-lg shadow-md border">
                <h3 className="text-sm font-semibold mb-5">Cart Total</h3>
                <div className="flex justify-between mb-5 border-b pb-1">
                  <span className="text-sm">Total Items</span>
                  <span>{cartItems.totalQuantity}</span>
                </div>
                <div className="mb-4 border-b pb-2">
                  <p>Shipping:</p>
                  <p className="ml-2">Shipping to:</p>
                  <span className="text-xs font-bold">{address}</span>
                  <button
                    className="text-blue-500 hover:underline mt-1 ml-2"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Change address
                  </button>
                </div>
                <div className="flex justify-between mb-4">
                  <span>Total Price</span>
                  <span>{cartItems.totalPrice.toFixed(2)}</span>
                </div>
                <button
                  className="w-full bg-red-600 text-white py-2 hover:bg-res-800"
                  onClick={() => navigate("/checkout")}
                >
                  Proced to checkout
                </button>
              </div>
            </div>
            <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
              <ChangeAddress />
            </Modal>
          </div>
        ) : (
          <div className="flex justify-center">
            <img src={emptyCart} alt="Empty Cart" className="h-96" />
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
