import { useNavigate } from "react-router-dom";

const OrderConfirmation = ({ order }) => {
  console.log("order", order);
  const navigate = useNavigate();
  return (
    <>
      <div className="conatiner mx-auto py-8 px-4 md:px-16 lg:px-24">
        <h3 className="text-2xl font-semibold mb-4">
          Thank you for your order
        </h3>
        <p>
          Your order has been placed order succcesfully you will will be recieve
          an email confirmation
        </p>
        <div className="mt-6 p-4 border rounded-lg bg-ray-600">
          <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
          <p>Order Number: {order.orderNumber}</p>
          <div className="mt-4">
            <h2 className="text-md font-semibold mb-2">Shipping Information</h2>
            <p>{order.shippingInformation.address}</p>
            <p>{order.shippingInformation.city}</p>
            <p>{order.shippingInformation.zip}</p>
          </div>
          <div className="mt-4">
            <h3 className="text-md font-semibold mb-2">Products Ordered</h3>
            {order.products.map((items) => (
              <>
                <div className="flex justify-between mt-2">
                  <p>
                    {items.name}*{items.quantity}
                  </p>
                  <p>{items.price * items.quantity}</p>
                </div>
              </>
            ))}
          </div>
          <div className="mt-4 flex justify-between">
            <span>Total Price: </span>
            <span className="font-semibold">${order.totalPrice}</span>
          </div>
          <div className="mt-4">
            <button className="bg-green-500 text-white py-2 px-4 hover:bg-orange-600">
              Order tracking
            </button>
            <button
              className="ml-4 bg-red-500 text-white py-2 px-4 hover:bg-orange-600 "
              onClick={() => navigate("/")}
            >
              Continue shopping
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderConfirmation;
