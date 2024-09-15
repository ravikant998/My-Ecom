import { useEffect, useState } from "react";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Modal from "./Modal";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import { searchData } from "../redux/productSlice";
import { logout } from "../redux/loginSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [search, setSearch] = useState();
  const cartData = useSelector((state) => state.cart); // This is used only on redux toolkit
  const loginData = useSelector((state) => state.login.user);
  const [totalQuantity, setTotalQuantity] = useState(0); // This is used only on localStorage

  useEffect(() => {
    const updateTotalQuantity = () => {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        const cart = JSON.parse(savedCart).items;
        const totalQuantity = cart.reduce(
          (acc, item) => acc + item.quantity,
          0
        );
        setTotalQuantity(totalQuantity);
      }
    };
    updateTotalQuantity();
    window.addEventListener("storage", updateTotalQuantity);
    return () => {
      window.removeEventListener("storage", updateTotalQuantity);
    };
  }, []);

  useEffect(() => {
    setIsLogin(!!loginData);
  }, [loginData]);

  const openSignUp = () => {
    setIsLogin(false);
    setIsModalOpen(true);
  };
  const openLogIn = () => {
    setIsLogin(true);
    setIsModalOpen(true);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(searchData(search));
    navigate("/filter-data");
  };
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 md:px-16 lg:px-24 py-4 flex justify-between items-center">
          <div className="text-lg font-bold">
            <Link to="/">E-shop</Link>
          </div>
          <div className="relative flex-1 mx-4">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search Product..."
                className="w-full border py-2 px-4"
                onChange={(e) => setSearch(e.target.value)}
              />
              <FaSearch
                className="absolute top-3 right-3 text-red-500 cursor-pointer"
                onClick={handleSearch}
              ></FaSearch>
            </form>
          </div>
          <div className="flex items-center space-x-4 ">
            <Link to="/cart" className="relative">
              <FaShoppingCart className="text-lg" />
              {/* This code is used with redux
              {cartData.totalQuantity > 0 && (
                <span className="absolute top-0 right-0 left-1 text-xs w-5 h-5 bg-red-600 text-white rounded-full flex items-center justify-center text-white">
                  {cartData.totalQuantity}
                </span>
              )} */}

              {totalQuantity > 0 && (
                <span className="absolute top-0 right-0 left-1 text-xs w-5 h-5 bg-red-600 text-white rounded-full flex items-center justify-center text-white">
                  {totalQuantity}
                </span>
              )}
            </Link>

            {loginData && (
              <span className="hidden md:block">Welcome, {loginData.name}</span>
            )}
            {loginData ? (
              <button
                className="hdden md:block font-semibold  hover:text-green-500"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <button
                className="hdden md:block"
                onClick={() => setIsModalOpen(true)}
              >
                Login | Register
              </button>
            )}

            <button className="block md:hidden">
              <FaUser />
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center space-x-10 py-4 text-sm font-bold">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/shop" className="hover:underline">
            Shop
          </Link>
          <Link to="/" className="hover:underline">
            Contact
          </Link>
          <Link to="/" className="hover:underline">
            About
          </Link>
        </div>
        <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
          {isLogin ? (
            <Login openSignUp={openSignUp} setIsModalOpen={setIsModalOpen} />
          ) : (
            <Registration
              openLogIn={openLogIn}
              setIsModalOpen={setIsModalOpen}
            />
          )}
        </Modal>
      </nav>
    </>
  );
};

export default Navbar;
