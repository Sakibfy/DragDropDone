import { useContext, useState } from "react";
import { Card, Label } from "flowbite-react";
import { AuthContext } from "../Provider/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const email = form.email.value.trim();
    const password = form.password.value;

    try {
      const { user } = await signIn(email, password);
      Swal.fire({
        title: "Login Successful",
        icon: "success",
        timer: 1200,
        showConfirmButton: false,
        showClass: { popup: "animate__animated animate__fadeInUp" },
        hideClass: { popup: "animate__animated animate__fadeOutDown" }
      });
      navigate(from, { replace: true });
    } catch (error) {
      Swal.fire({
        title: "Login Failed",
        text: error.message,
        icon: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-800 p-4">
      <Card className="max-w-md w-full p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
        <h2 className="text-center font-bold text-3xl mb-6 text-gray-800 dark:text-gray-100">Login</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          
          {/* Email */}
          <div>
            <Label htmlFor="email" value="Email" className="mb-1 text-gray-700 dark:text-gray-300" />
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
            />
          </div>

          {/* Password */}
          <div>
            <Label htmlFor="password" value="Password" className="mb-1 text-gray-700 dark:text-gray-300" />
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
              className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-[#2c918b] hover:bg-[#237873] disabled:bg-gray-400 text-white font-semibold rounded-lg transition"
          >
            {loading ? "Logging in…" : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600 dark:text-gray-300">
          Don't have an account?{" "}
          <Link to="/singup" className="text-emerald-600 font-bold hover:underline">
            Sign up
          </Link>
        </p>
        <Link to="/">
        <h2 className="text-white mt-2  border rounded-2xl py-2 text-center font-bold ">
         
            Back
          </h2>
          </Link>
      </Card>
    </div>
  );
};

export default Login;
