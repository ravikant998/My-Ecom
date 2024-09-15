import { useEffect, useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../redux/loginSlice";
import { toast, ToastContainer } from "react-toastify";

const Login = ({ openSignUp, setIsModalOpen }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const validate = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = "Email is required";
    }
    if (!password.trim()) {
      newErrors.password = "Password is required";
    }
    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    ///Local Storege///
    if (validate()) {
      const usersData = JSON.parse(localStorage.getItem("signup")) || [];
      const user = usersData.find(
        (user) => user.email === email && user.password === password
      );
      if (user) {
        toast.success("Login successful!");
        setTimeout(() => {
          setIsModalOpen(false);
        }, 2000);
      } else {
        toast.error("Invalid email or password");
      }
    }

    /// Using Json server ///
    // if (!validate()) {
    //   console.log("Validation failed");
    //   return;
    // }
    // const credentials = { email, password };
    // try {
    //   await dispatch(userLogin(credentials)).unwrap();
    //   toast.success("Login successfully from josn server");
    //   setTimeout(() => {
    //     setIsModalOpen(false);
    //   }, 2000);
    // } catch (error) {
    //   toast.error("Login error:", error);
    // }
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const anyFieldFilled = [email, password].some(
      (field) => field.trim() !== ""
    );
    setIsButtonDisabled(!anyFieldFilled);
  }, [email, password]);
  return (
    <>
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8 max-w-lg mx-auto">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white ite text-center font-serif">
          Sign in to your account
        </h1>
        <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your email
            </label>
            <input
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@company.com"
            />
            {error.email && <p className="text-red-600">{error.email}</p>}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Password
            </label>
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <span
                className="absolute inset-y-0 right-3 mt-2 flex items-center text-gray-500 cursor-pointer"
                onClick={togglePassword}
              >
                {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
              </span>
            </div>

            {error.password && <p className="text-red-600">{error.password}</p>}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  aria-describedby="remember"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                />
              </div>
              <div className="ml-3 text-sm">
                <label className="text-gray-500 dark:text-gray-300">
                  Remember me
                </label>
              </div>
            </div>
            <a
              href="#"
              className="text-sm font-medium text-blue-600 hover:underline dark:text-primary-500"
            >
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className={`w-full text-white ${
              isButtonDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            } focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
            disabled={isButtonDisabled}
          >
            Sign in
          </button>
          <ToastContainer />
          <p className="text-sm font-semibold  dark:text-gray-600 text-center">
            Don’t have an account yet?{" "}
            <button
              className="font-bold text-red-600 hover:underline dark:text-primary-500"
              onClick={openSignUp}
            >
              Sign up
            </button>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
