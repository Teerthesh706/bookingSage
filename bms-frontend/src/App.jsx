import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Bookings from "./pages/Bookings";
import AdminRoute from "./components/AdminRoute";
import Dashboard from "./pages/Admin/Dashboard";
import MovieDetails from "./pages/MovieDetails";
import SeatSelection from "./pages/SeatSelection";


function App() {
  return (
    <div className="min-h-screen bg-[#0a0e27] text-black">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute>
              <Bookings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/seat/:showId" element={<SeatSelection />} />
      </Routes>
    </div>
  );
}

export default App;
