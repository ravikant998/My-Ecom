import { useEffect, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CheckOut = ({ setOrder }) => {
  const navigate = useNavigate();
  // const cart = useSelector((state) => state.cart); This is used of redux
  const [billingToggle, setBillingToggle] = useState(true);
  const [shippingToggle, setShippingToggle] = useState(true);
  const [paymentToggle, setPaymentToggle] = useState(true);
  const [paymentMode, setPaymentMode] = useState("cod");
  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    city: "",
    zip: "",
  });

  const [cart, setCart] = useState({
    products: [],
    totalPrice: 0,
    totalQuantity: 0,
  });

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
      } catch (error) {
        console.error("Failed to parse cart data", error);
      }
    }
  }, []);

  useEffect(() => {}, [cart.products]);

  const productNames = Array.isArray(cart.items)
    ? cart.items.map((item) => item)
    : [];

  const handleOrder = () => {
    const newOrder = {
      products: cart.products,
      orderNumber: "12222222",
      shippingInformation: shippingInfo,
      totalPrice: cart.totalPrice,
    };
    setOrder(newOrder);
    navigate("/order-confirmation");
  };
  return (
    <>
      <div className="container mx-auto py-8 min-h-96 px-4 md:px-16 lg:px-24">
        <h3 className="text-2xl font-semibold mb-4">CHECKOUT</h3>
        <div className="flex flex-col md:flex-row justify-between space-x-10 mt-8">
          <div className="md:w-2/3">
            {/* Basic information */}
            <div className="border p-2 mb-6">
              <div
                className="flex items-center justify-between"
                onClick={() => setBillingToggle(!billingToggle)}
              >
                <h3 className="text-lg font-semibold">Billing Informations</h3>
                {billingToggle ? <FaAngleDown /> : <FaAngleUp />}
              </div>
              <div className={`space-y-4 ${billingToggle ? "" : "hidden"}`}>
                <div>
                  <label htmlFor="" className="block text-gray-600">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    className="w-full px-3 py-2 border"
                  />
                </div>
                <div>
                  <label htmlFor="" className="block text-gray-600">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Enter Email"
                    className="w-full px-3 py-2 border"
                  />
                </div>
                <div>
                  <label htmlFor="" className="block text-gray-600">
                    Phone
                  </label>
                  <input
                    type="number"
                    placeholder="Enter Phone"
                    className="w-full px-3 py-2 border"
                  />
                </div>
              </div>
            </div>
            {/* Shipping Informations */}
            <div className="border p-2 mb-6">
              <div
                className="flex items-center justify-between"
                onClick={() => setShippingToggle(!shippingToggle)}
              >
                <h3 className="text-lg font-semibold">Shipping Informations</h3>
                {shippingToggle ? <FaAngleDown /> : <FaAngleUp />}
              </div>
              <div className={`space-y-4 ${shippingToggle ? "" : "hidden"}`}>
                <div>
                  <label htmlFor="" className="block text-gray-600">
                    Address
                  </label>
                  <input
                    type="text"
                    name="adress"
                    placeholder="Enter Address"
                    className="w-full px-3 py-2 border"
                    onChange={(e) =>
                      setShippingInfo({
                        ...shippingInfo,
                        address: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label htmlFor="" className="block text-gray-600">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    placeholder="Enter City"
                    className="w-full px-3 py-2 border"
                    onChange={(e) =>
                      setShippingInfo({ ...shippingInfo, city: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label htmlFor="" className="block text-gray-600">
                    Zone
                  </label>
                  <input
                    type="number"
                    name="zip"
                    placeholder="Enter Zp code"
                    className="w-full px-3 py-2 border"
                    onChange={(e) =>
                      setShippingInfo({ ...shippingInfo, zip: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
            {/* Payment method */}
            <div className="border p-2 mb-6">
              <div
                className="flex items-center justify-between"
                onClick={() => setPaymentToggle(!paymentToggle)}
              >
                <h3 className="text-lg font-semibold">Payment Information</h3>
                {paymentToggle ? <FaAngleDown /> : <FaAngleUp />}
              </div>
              <div className={`space-y-4 ${paymentToggle ? "" : "hidden"}`}>
                <div className="flex items-center mb-2">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMode === "cod"}
                    onChange={() => setPaymentMode("cod")}
                    className="form-radio text-blue-600"
                  />
                  <label className="ml-2 text-gray-700">Cash on Delivery</label>
                </div>

                <div className="flex items-center mb-2">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMode === "debit card"}
                    onChange={() => setPaymentMode("debit card")}
                    className="form-radio text-blue-600"
                  />
                  <label className="ml-2 text-gray-700">Debit Card</label>
                </div>
                {paymentMode === "debit card" && (
                  <div className="bg-gray-100 p-4 rounded-lg mb-4">
                    <h3 className="text-xl font-semibold mb-4">
                      Debit Card Information
                    </h3>
                    <div className="mb-4">
                      <label className="block text-gray-700 font-semibold mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        placeholder="Card Number"
                        className="border p-2 w-full rounded"
                      />
                    </div>
                    <div className="mb-4">
                      <label>Card Holder Name</label>
                      <input
                        type="text"
                        placeholder="Card Holder Name"
                        className="border p-2 w-full rounded"
                      />
                    </div>
                    <div className="flex justify-between mb-4">
                      <div className="w-1/2 mr-2">
                        <label
                          htmlFor=""
                          className="block text-gray-700 fontsemibold mb-2"
                        >
                          Card Expire Date
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="border p-2 w-full rounded"
                        />
                      </div>
                      <div className="w-1/2 mr-2">
                        <label
                          htmlFor=""
                          className="block text-gray-700 fontsemibold mb-2"
                        >
                          CVV
                        </label>
                        <input
                          type="text"
                          placeholder="CVV"
                          className="border p-2 w-full rounded"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Order Summary */}
          <div className="md:w-1/3 bg-white p-6 rounded-lg shadow-md border">
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
            <div className="space-y-4">
              {productNames.length > 0 &&
                productNames.map((item, index) => (
                  <>
                    <div key={index} className="flex justify-between">
                      <div className="flex itesm-center ">
                        <img
                          src={item.image}
                          alt=""
                          className="w-16 h-16 object-contain"
                        />
                        <div className="ml-4">
                          <h4 className="text-md font-semibold">{item.name}</h4>
                          <p className="text-gray-600">
                            ${item.price * item.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
            </div>
            <div className="mt-4 border-t pt-4">
              <div className="flex justify-content">
                <span className="font-semibold">Total Price: </span>
                <span>$ {cart.totalPrice.toFixed(2)}</span>
              </div>
            </div>
            <button
              className="w-full bg-red-600 text-white py-2 mt-6 hover:bg-red-800 "
              // onClick={handleOrder}
            >
              Place order
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckOut;
