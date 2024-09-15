import { useEffect, useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { signupUser } from "../redux/signupSlice";

const Registration = ({ openLogIn, setIsModalOpen }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!confirmpassword.trim()) {
      newErrors.confirmpassword = "Confirm password is required";
    } else if (confirmpassword.length < 6) {
      newErrors.confirmpassword =
        "Confirm Password must be at least 6 characters";
    } else if (confirmpassword !== password) {
      newErrors.confirmpassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitHandle = async (e) => {
    e.preventDefault();
    // Json Server
    // if (validate()) {
    //   try {
    //     const regObj = { name, email, phone, password, confirmpassword };
    //     await dispatch(signupUser(regObj)).unwrap();
    //     toast.success("Signup successful from JSON server");
    //     setTimeout(() => {
    //       setIsModalOpen(false);
    //     }, 2000); // 2 seconds delay
    //   } catch (error) {
    //     toast.error("Signup failed. Please try again.", error);
    //   }
    // } else {
    //   toast.error("Please fix the errors before submitting.");
    // }

    // localStorege /////

    if (validate()) {
      const data = JSON.parse(localStorage.getItem("signup")) || [];
      localStorage.setItem(
        "signup",
        JSON.stringify([
          ...data,
          {
            id: data.length + 1,
            name,
            email,
            phone,
            password,
            confirmpassword,
          },
        ])
      );
      toast.success("Signup successful!");
      setTimeout(() => {
        setIsModalOpen(false);
      }, 2000);
    } else {
      toast.error("Please fix the errors before submitting.");
    }
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  useEffect(() => {
    const anyFieldFilled = [name, email, phone, password, confirmpassword].some(
      (field) => field.trim() !== ""
    );
    setIsButtonDisabled(!anyFieldFilled);
  }, [name, email, phone, password, confirmpassword]);

  return (
    <>
      <div className="mr-10 ml-10 ">
        <h2 className="text-2xl font-bold mb-5 mt-2 text-center font-serif border">
          Sign Up
        </h2>

        <form onSubmit={submitHandle}>
          {/* Two-column layout starts here */}
          <div className="grid grid-cols-2 gap-4">
            {/* Name Field */}
            <div className="mb-1">
              <label htmlFor="name" className="block text-gray-700 ml-5 mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border"
                placeholder="Enter Name"
              />
              {errors.name && (
                <p className="text-red-600 ml-2">{errors.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div className="mb-1">
              <label htmlFor="email" className="block text-gray-700 ml-5 mb-2">
                Email
              </label>
              <input
                type="text"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border"
                placeholder="Enter Email"
              />
              {errors.email && (
                <p className="text-red-600 ml-2">{errors.email}</p>
              )}
            </div>

            {/* Phone Field */}
            <div className="mb-1">
              <label htmlFor="phone" className="block text-gray-700 ml-5 mb-2">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 border"
                placeholder="Enter Phone"
              />
              {errors.phone && (
                <p className="text-red-600 ml-2">{errors.phone}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="mb-1 relative">
              <label
                htmlFor="password"
                className="block text-gray-700 ml-5 mb-2"
              >
                Password
              </label>
              <div></div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border"
                placeholder=".............."
              />
              <span
                className="absolute inset-y-0 right-3 mt-7 flex items-center text-gray-500 cursor-pointer"
                onClick={togglePassword}
              >
                {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
              </span>
              {errors.password && (
                <p className="text-red-600 ml-2">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="mb-4 relative col-span-2">
              <label
                htmlFor="confirmpassword"
                className="block text-gray-700 ml-5 mb-3"
              >
                Confirm Password
              </label>
              <div className="relative w-6/12">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmpassword"
                  value={confirmpassword}
                  onChange={(e) => setConfirmpassword(e.target.value)}
                  className="w-full px-3 py-2 pr-10 border" // Added pr-10 for padding-right
                  placeholder="..............."
                />
                <span
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer"
                  onClick={toggleConfirmPassword}
                >
                  {showConfirmPassword ? <MdVisibilityOff /> : <MdVisibility />}
                </span>
              </div>
              {errors.confirmpassword && (
                <p className="text-red-600 ml-2">{errors.confirmpassword}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}

          <div className="mb-6">
            <button
              className={`w-full py-2 ${
                isButtonDisabled ? "bg-gray-400" : "bg-blue-600"
              } text-white`}
              type="Submit"
              disabled={isButtonDisabled}
            >
              Sign Up
            </button>
          </div>
        </form>

        <ToastContainer />

        {/* Login Link */}
        <div className="text-center">
          <span className="text-gray-700 font-bold">Already Have Account?</span>
          <button
            className="text-red-800 underline ml-1 font-semibold"
            onClick={openLogIn}
          >
            Login Here
          </button>
        </div>
      </div>
    </>
  );
};

export default Registration;
