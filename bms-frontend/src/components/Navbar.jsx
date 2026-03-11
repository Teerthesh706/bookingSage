import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { User, LogOut, Film } from "lucide-react";
import { motion } from "framer-motion";
import logo from "../assets/logo2.png";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="sticky top-0 z-50 bg-[#121947]/95 backdrop-blur-xl border-b border-[#1d8fff]/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
              className="p-1 bg-[#1d8fff]/10 rounded-xl group-hover:bg-[#1d8fff]/20 transition-colors"
            >
              {/* <Film className="w-6 h-6 text-[#1d8fff]" /> */}
              <img
                src={logo}
                alt="Booking Sage Logo"
                className="w-15 h-15 object-contain"
              />
            </motion.div>
            <span className="text-xl font-bold text-[#EEEEEE] group-hover:text-[#1d8fff] transition-colors">
              Booking Sage
            </span>
          </Link>

          {/* Navigation Items */}
          <div className="flex items-center gap-3 sm:gap-4">
            {user ? (
              <>
                {/* Profile Link */}
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-[#EEEEEE]/80 hover:text-[#1d8fff] hover:bg-[#1d8fff]/5 transition-all group"
                >
                  <div className="p-1.5 bg-[#1d8fff]/10 rounded-lg group-hover:bg-[#1d8fff]/20 transition-colors">
                    <User size={25} />
                  </div>
                  <span className="font-medium text-sm hidden sm:inline">
                    {user.username}
                  </span>
                </Link>

                {/* Logout Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={logout}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-[#EEEEEE]/80 hover:text-red-400 hover:bg-red-400/5 border border-transparent hover:border-red-400/20 transition-all"
                >
                  <LogOut size={16} />
                  <span className="text-sm font-medium hidden sm:inline">
                    Logout
                  </span>
                </motion.button>
              </>
            ) : (
              <>
                {/* Login Link */}
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-xl text-[#EEEEEE]/80 hover:text-[#1d8fff] hover:bg-[#1d8fff]/5 transition-all font-medium text-sm"
                >
                  Login
                </Link>

                {/* Sign Up Button */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to="/signup"
                    className="flex items-center px-5 py-2 bg-[#1d8fff] hover:bg-[#1d8fff]/90 text-white rounded-xl font-semibold text-sm shadow-lg shadow-[#1d8fff]/20 hover:shadow-[#1d8fff]/40 transition-all"
                  >
                    Sign Up
                  </Link>
                </motion.div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;