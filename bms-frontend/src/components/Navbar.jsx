// import { Link } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { User, LogOut } from "lucide-react";

// const Navbar = () => {
//   const { user, logout } = useContext(AuthContext);

//   return (
//     <nav className="flex justify-between items-center px-8 py-4 bg-[#1a1a1a] shadow-md">
//       <Link to="/" className="text-2xl font-bold text-red-600">
//         BookMyShow
//       </Link>

//       <div className="flex items-center gap-6">
//         {user ? (
//           <>
//             <Link to="/profile" className="flex items-center gap-2">
//               <User size={18} /> {user.username}
//             </Link>

//             <button
//               onClick={logout}
//               className="flex items-center gap-2 text-red-500"
//             >
//               <LogOut size={18} /> Logout
//             </button>
//           </>
//         ) : (
//           <>
//             <Link to="/login" className="hover:text-red-500">
//               Login
//             </Link>
//             <Link
//               to="/signup"
//               className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700"
//             >
//               Signup
//             </Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
// ______________________________________________________________________

import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { User, LogOut, Film } from "lucide-react";
import { motion } from "framer-motion";

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
              className="p-2 bg-[#1d8fff]/10 rounded-xl group-hover:bg-[#1d8fff]/20 transition-colors"
            >
              <Film className="w-6 h-6 text-[#1d8fff]" />
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
                    <User size={16} />
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