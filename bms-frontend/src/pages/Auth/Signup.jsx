import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Film, Mail, Lock, User } from "lucide-react";
import logo from "../../assets/logo2.png";

const Signup = () => {
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    await signup(formData);

    setSubmitting(false);
    navigate("/");
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
        className="relative z-10 w-full max-w-md px-6 py-8"
      >
        {/* Logo/Brand Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-2"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="p-3 bg-[#1d8fff]/10 rounded-2xl"
            >
              <img
                              src={logo}
                              alt="Booking Sage Logo"
                              className="w-15 h-15 object-contain"
                            />
            </motion.div>
            <h1 className="text-4xl font-bold text-[#EEEEEE]">Booking Sage</h1>
          </div>
        </motion.div>

        {/* Signup Form Card */}
        <motion.form
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-[#0f1629] border border-[#1d8fff]/20 p-8 rounded-2xl shadow-2xl backdrop-blur-sm"
          onSubmit={handleSubmit}
        >
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#EEEEEE] mb-2">
              Create Account
            </h2>
            <p className="text-[#EEEEEE]/50 text-sm">
              Start your cinematic journey
            </p>
          </div>

          {/* Username Input */}
          <div className="mb-5">
            <label className="block text-[#EEEEEE]/70 text-sm mb-2 font-medium">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#1d8fff]" />
              <input
                type="text"
                name="username"
                placeholder="Choose a username"
                value={formData.username}
                required
                className="w-full pl-12 pr-4 py-3 bg-[#0a0e27] border border-[#1d8fff]/20 rounded-xl outline-none text-[#EEEEEE] placeholder-[#EEEEEE]/30 focus:border-[#1d8fff]/50 focus:bg-[#0a0e27] transition-all duration-300"
                onChange={handleChange}
              />
            </div>
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
                name="email"
                placeholder="your.email@example.com"
                value={formData.email}
                required
                className="w-full pl-12 pr-4 py-3 bg-[#0a0e27] border border-[#1d8fff]/20 rounded-xl outline-none text-[#EEEEEE] placeholder-[#EEEEEE]/30 focus:border-[#1d8fff]/50 focus:bg-[#0a0e27] transition-all duration-300"
                onChange={handleChange}
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
                name="password"
                placeholder="Create a strong password"
                value={formData.password}
                required
                minLength={6}
                className="w-full pl-12 pr-12 py-3 bg-[#0a0e27] border border-[#1d8fff]/20 rounded-xl outline-none text-[#EEEEEE] placeholder-[#EEEEEE]/30 focus:border-[#1d8fff]/50 focus:bg-[#0a0e27] transition-all duration-300"
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#1d8fff] hover:text-[#1d8fff]/70 transition-colors duration-200"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <p className="text-xs text-[#EEEEEE]/40 mt-2">
              Must be at least 6 characters long
            </p>
          </div>

          {/* Terms & Conditions */}
          <div className="mb-6">
            <label className="flex items-start gap-2 cursor-pointer text-[#EEEEEE]/60 hover:text-[#EEEEEE]/80 transition-colors text-sm">
              <input
                type="checkbox"
                required
                className="w-4 h-4 mt-0.5 accent-[#1d8fff] rounded"
              />
              <span>
                I agree to the{" "}
                <button
                  type="button"
                  className="text-[#1d8fff] hover:text-[#1d8fff]/80 transition-colors"
                >
                  Terms & Conditions
                </button>{" "}
                and{" "}
                <button
                  type="button"
                  className="text-[#1d8fff] hover:text-[#1d8fff]/80 transition-colors"
                >
                  Privacy Policy
                </button>
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={submitting}
            whileHover={{ scale: submitting ? 1 : 1.02 }}
            whileTap={{ scale: submitting ? 1 : 0.98 }}
            className="w-full bg-[#1d8fff] hover:bg-[#1d8fff]/90 text-white py-3 rounded-xl font-semibold shadow-lg shadow-[#1d8fff]/20 hover:shadow-[#1d8fff]/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            {submitting ? (
              <span className="flex items-center justify-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
                Creating Account...
              </span>
            ) : (
              "Sign Up & Start Booking"
            )}
          </motion.button>

          {/* Login Link */}
          <div className="mt-6 text-center text-[#EEEEEE]/60 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#1d8fff] hover:text-[#1d8fff]/80 font-semibold transition-colors"
            >
              Login
            </Link>
          </div>
        </motion.form>
       
      </motion.div>
    </div>
  );
};

export default Signup;
