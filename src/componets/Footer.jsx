import { FaFacebook, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 md:px-16 lg:px-24">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-semibold">E-shop</h3>
          <p className="mt-4">
            In publishing and graphic design, Lorem ipsum is a placeholder text
            commonly used to demonstrate the visual form of a documen
          </p>
        </div>
        <div className="flex flex-col md:items-center">
          <h4 className="text-lg font-semibold">Quick Links</h4>
          <ul className="mt-4 space-y-2">
            <li className="hover:underline">
              <Link to="/">Home</Link>
            </li>
            <li className="hover:underline">
              <Link to="/shop">Shop</Link>
            </li>
            <li className="hover:underline">
              <Link to="/contact">Contact</Link>
            </li>
            <li className="hover:underline">
              <Link to="/about">About </Link>
            </li>
          </ul>
        </div>
        <div className="">
          <h4 className="text-lg font-semibold">Follow us</h4>
          <div className="flex space-x-4 mt-4">
            <a href="" className="hover:text-gary-400">
              <FaFacebook />
            </a>
            <a href="" className="hover:text-gary-400">
              <FaTwitter />
            </a>
            <a href="" className="hover:text-gary-400">
              <FaGithub />
            </a>
            <a href="" className="hover:text-gary-400">
              <FaInstagram />
            </a>
          </div>
          <form className="flex items-center justify-center mt-8">
            <input
              type="email"
              className="w-full p-2  rounded-l-lg bg-gray-800 border border-gray-600"
            />
            <button className="bg-red-600 text-white px-4 py-2 rounded-r-lg border border-gray-600">
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className=" mt-8 border border-gray-700 pt-4  ">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <p>@2024 e-shop All rights reserved</p>
          <div className="flex space-x-4 mt-4 md: mt-0">
            <a href="" className="hover:underline">
              Privacy Policy
            </a>
            <a href="" className="hover:underline">
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
