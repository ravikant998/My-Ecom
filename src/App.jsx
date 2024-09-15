import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./componets/Navbar";
import Footer from "./componets/Footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import CheckOut from "./pages/CheckOut";
import OrderConfirmation from "./pages/OrderConfirmation";
import { useState } from "react";
import FilterData from "./pages/FilterData";
import ProductDetails from "./pages/ProductDetails";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  const [order, setOrder] = useState(null);
  console.log("order", order);
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/shop" element={<Shop />}></Route>
          <Route path="/cart" element={<Cart />}></Route>Order-Confirmation
          <Route
            path="/checkout"
            element={<CheckOut setOrder={setOrder} />}
          ></Route>
          <Route
            path="/order-confirmation"
            element={<OrderConfirmation order={order} />}
          ></Route>
          <Route path="/filter-data" element={<FilterData />}></Route>
          <Route path="/product/:id" element={<ProductDetails />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
