import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Film, Mail, Lock } from "lucide-react";

const Login = () => {
  const { login, authLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await login(formData);

    if (success) {
      navigate("/");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#0a0e27] relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-20 -left-20 w-64 h-64 bg-[#1d8fff] opacity-10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#1d8fff] opacity-10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 w-72 h-72 bg-[#1d8fff] opacity-5 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md px-6"
      >
        {/* Logo/Brand Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="p-3 bg-[#1d8fff]/10 rounded-2xl"
            >
              <Film className="w-10 h-10 text-[#1d8fff]" />
            </motion.div>
            <h1 className="text-4xl font-bold text-[#EEEEEE]">Booking Sage</h1>
          </div>
          <p className="text-[#EEEEEE]/50 text-sm">
            Your Gateway to Cinema Magic
          </p>
        </motion.div>

        {/* Login Form Card */}
        <motion.form
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-[#0f1629] border border-[#1d8fff]/20 p-8 rounded-2xl shadow-2xl backdrop-blur-sm"
          onSubmit={handleSubmit}
        >
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#EEEEEE] mb-2">
              Welcome Back
            </h2>
            <p className="text-[#EEEEEE]/50 text-sm">
              Sign in to continue booking
            </p>
          </div>

          {/* Email Input */}
          <div className="mb-5">
            <label className="block text-[#EEEEEE]/70 text-sm mb-2 font-medium">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#1d8fff]" />
              <input
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                required
                className="w-full pl-12 pr-4 py-3 bg-[#0a0e27] border border-[#1d8fff]/20 rounded-xl outline-none text-[#EEEEEE] placeholder-[#EEEEEE]/30 focus:border-[#1d8fff]/50 focus:bg-[#0a0e27] transition-all duration-300"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label className="block text-[#EEEEEE]/70 text-sm mb-2 font-medium">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#1d8fff]" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                required
                className="w-full pl-12 pr-12 py-3 bg-[#0a0e27] border border-[#1d8fff]/20 rounded-xl outline-none text-[#EEEEEE] placeholder-[#EEEEEE]/30 focus:border-[#1d8fff]/50 focus:bg-[#0a0e27] transition-all duration-300"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#1d8fff] hover:text-[#1d8fff]/70 transition-colors duration-200"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between mb-6 text-sm">
            <label className="flex items-center gap-2 cursor-pointer text-[#EEEEEE]/60 hover:text-[#EEEEEE]/80 transition-colors">
              <input
                type="checkbox"
                className="w-4 h-4 accent-[#1d8fff] rounded"
              />
              Remember me
            </label>
            <button
              type="button"
              className="text-[#1d8fff] hover:text-[#1d8fff]/80 transition-colors font-medium"
            >
              Forgot Password?
            </button>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={authLoading}
            whileHover={{ scale: authLoading ? 1 : 1.02 }}
            whileTap={{ scale: authLoading ? 1 : 0.98 }}
            className="w-full bg-[#1d8fff] hover:bg-[#1d8fff]/90 text-white py-3 rounded-xl font-semibold shadow-lg shadow-[#1d8fff]/20 hover:shadow-[#1d8fff]/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            {authLoading ? (
              <span className="flex items-center justify-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
                Logging in...
              </span>
            ) : (
              "Login to Book Tickets"
            )}
          </motion.button>

          {/* Sign Up Link */}
          <div className="mt-6 text-center text-[#EEEEEE]/60 text-sm">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="text-[#1d8fff] hover:text-[#1d8fff]/80 font-semibold transition-colors"
            >
              Sign Up
            </button>
          </div>
        </motion.form>

        {/* Footer Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-8 text-[#EEEEEE]/30 text-sm"
        >
          🎬 Book your favorite movies in seconds
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Login;
