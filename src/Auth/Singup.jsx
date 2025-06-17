import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import useAxiosPublic from "../hook/useAxiosPublic";


const Signup = () => {
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting }
  } = useForm();
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const result = await createUser(data.email, data.password);
      await updateUserProfile(data.name, data.photoURL);
      const res = await axiosPublic.post("/users", {
        name: data.name,
        email: data.email
      });

      if (res.data.insertedId) {
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User created successfully",
          showConfirmButton: false,
          timer: 1500
        });
        navigate("/");
      }
    } catch (error) {
      if (error.message.includes("already registered")) {
        setError("email", {
          type: "manual",
          message: error.message
        });
      } else {
        Swal.fire("Registration Error", error.message, "error");
      }
    }
  };

  // Shared input style
  const inputClass = (hasError) =>
    `w-full px-4 py-2 rounded-lg border ${
      hasError ? "border-red-500" : "border-gray-300"
    } bg-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-800 p-4">
      <div className="max-w-md w-full p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
        <h1 className="text-center font-bold text-3xl mb-6 text-gray-800 dark:text-gray-100">Sign Up Now!</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="mb-1 text-gray-700 dark:text-gray-300">Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className={inputClass(errors.name)}
              placeholder="Your Name"
            />
            {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
          </div>

          {/* Email Field */}
          <div>
            <label className="mb-1 text-gray-700 dark:text-gray-300">Email</label>
            <input
              
              type="email"
              {...register("email", { required: "Email is required" })}
              className={inputClass(errors.email)}
              
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Password Field */}
          <div>
            <label className="mb-1 text-gray-700 dark:text-gray-300">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "At least 6 characters" },
                maxLength: { value: 20, message: "Up to 20 characters" },
                pattern: {
                  value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*\d)/,
                  message: "Must contain uppercase, number & special char"
                }
              })}
              className={inputClass(errors.password)}
              placeholder="••••••••"
            />
            {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 bg-[#2c918b] hover:bg-[#237873]  disabled:bg-gray-400 text-white font-semibold rounded-lg transition"
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-emerald-600 underline font-bold hover:underline">
            Login
          </Link>
        </p>
        <Link to="/">
        <h2 className="text-white mt-2  border rounded-2xl py-2 text-center font-bold ">
         
            Back
          </h2>
          </Link>
      </div>
      
    </div>
  );
};

export default Signup;
