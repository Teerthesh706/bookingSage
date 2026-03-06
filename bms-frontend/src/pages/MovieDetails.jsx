// // import { useEffect, useState } from "react";
// // import { useParams } from "react-router-dom";
// // import API from "../apis";

// // const MovieDetails = () => {
// //   const { id } = useParams();
// //   const [movie, setMovie] = useState(null);
// //   const [shows, setShows] = useState([]);

// //   useEffect(() => {
// //     const fetchMovie = async () => {
// //       const { data } = await API.get(`/movies/${id}`);
// //       setMovie(data);
// //     };

// //     const fetchShows = async () => {
// //       const { data } = await API.get(
// //         `/movies/shows/by-city?movieId=${id}&city=Delhi`,
// //       );
// //       setShows(data);
// //     };

// //     fetchMovie();
// //     fetchShows();
// //   }, [id]);

// //   if (!movie) return null;

// //   return (
// //     <div className="p-10">
// //       <div className="flex gap-10">
// //         <img src={movie.poster} className="w-64 rounded" />
// //         <div>
// //           <h1 className="text-3xl font-bold">{movie.title}</h1>
// //           <p className="mt-4 text-gray-400">{movie.description}</p>
// //           <p className="mt-2">Duration: {movie.duration} mins</p>
// //         </div>
// //       </div>

// //       <h2 className="text-2xl mt-10 mb-4">Available Shows</h2>

// //       {/* {shows.map((show) => (
// //         <div key={show._id} className="bg-[#1c1c1c] p-4 rounded mb-4">
// //           <p>{show.theater.name}</p>
// //           <p>{new Date(show.showTime).toLocaleString()}</p>
// //         </div>
// //       ))} */}

// //       {shows.map((show) => (
// //         <div
// //           key={show._id}
// //           className="bg-[#1c1c1c] p-4 rounded mb-4 flex justify-between items-center"
// //         >
// //           <div>
// //             <p className="font-semibold">{show.theater.name}</p>
// //             <p>{new Date(show.showTime).toLocaleString()}</p>
// //             <p>₹{show.price}</p>
// //           </div>

// //           <a
// //             href={`/seat/${show._id}`}
// //             className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
// //           >
// //             Book Now
// //           </a>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // };

// // export default MovieDetails;

// // __________________________________________________________________________

// import { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import API from "../apis";

// const MovieDetails = () => {
//   const { id } = useParams();
//   const [city, setCity] = useState("Delhi");
//   const [movie, setMovie] = useState(null);
//   const [shows, setShows] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     try {
//   //       const movieRes = await API.get(`/movies/${id}`);
//   //       setMovie(movieRes.data);

//   //       const showsRes = await API.get("/shows/by-city", {
//   //         // params: { movieId: id, city: "Delhi" },
//   //         params: { movieId: id, city },
//   //       });

//   //       setShows(showsRes.data);
//   //     } catch (error) {
//   //       console.error("Error loading movie details:", error);
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   //   fetchData();
//   // }, [id, city]);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const movieRes = await API.get(`/movies/${id}`);
//         setMovie(movieRes.data);

//         const showsRes = await API.get("/shows/by-city", {
//           params: { movieId: id, city },
//         });

//         setShows(showsRes.data);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [id, city]);

//   if (loading) return <div className="p-10">Loading...</div>;
//   if (!movie) return <div className="p-10">Movie not found</div>;

//   return (
//     <div className="p-10">
//       <div className="flex gap-10">
//         <img src={movie.poster} alt={movie.title} className="w-64 rounded" />
//         <div>
//           <h1 className="text-3xl font-bold">{movie.title}</h1>
//           <p className="mt-4 text-gray-400">{movie.description}</p>
//           <p className="mt-2">Duration: {movie.duration} mins</p>
//         </div>
//       </div>
//       <div className="mt-10 mb-6">
//         <label className="block mb-2 text-lg font-semibold">Select City</label>

//         <select
//           value={city}
//           onChange={(e) => setCity(e.target.value)}
//           className="bg-gray-800 text-white border border-gray-600 px-4 py-2 rounded w-64 focus:outline-none focus:ring-2 focus:ring-red-500"
//         >
//           <option value="Delhi">Delhi</option>
//           <option value="Mumbai">Mumbai</option>
//           <option value="Bangalore">Bangalore</option>
//           <option value="Hyderabad">Hyderabad</option>
//           <option value="Chennai">Chennai</option>
//           <option value="Kolkata">Kolkata</option>
//           <option value="Pune">Pune</option>
//           <option value="Ahmedabad">Ahmedabad</option>
//           <option value="Jaipur">Jaipur</option>
//           <option value="Lucknow">Lucknow</option>
//           <option value="Chandigarh">Chandigarh</option>
//           <option value="Indore">Indore</option>
//           <option value="Bhopal">Bhopal</option>
//           <option value="Surat">Surat</option>
//         </select>
//       </div>
//       <h2 className="text-2xl mt-10 mb-4">Available Shows</h2>

//       {shows.length === 0 && (
//         <p className="text-gray-400">No shows available</p>
//       )}

//       {shows.map((show) =>
//         show.theater ? (
//           <div
//             key={show._id}
//             className="bg-[#1c1c1c] p-4 rounded mb-4 flex justify-between items-center"
//           >
//             <div>
//               <p className="font-semibold">{show.theater.name}</p>
//               <p>{new Date(show.showTime).toLocaleString()}</p>
//               <p>₹{show.price}</p>
//             </div>

//             <Link
//               to={`/seat/${show._id}`}
//               className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
//             >
//               Book Now
//             </Link>
//           </div>
//         ) : null,
//       )}
//     </div>
//   );
// };

// export default MovieDetails;

// _________________________________________________________________________________________________________

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../apis";
import { motion } from "framer-motion";
import {
  Clock,
  MapPin,
  Calendar,
  Ticket,
  Building2,
  IndianRupee,
  ArrowLeft,
  Star,
} from "lucide-react";

const MovieDetails = () => {
  const { id } = useParams();
  const [city, setCity] = useState("Delhi");
  const [movie, setMovie] = useState(null);
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieRes = await API.get(`/movies/${id}`);
        setMovie(movieRes.data);

        const showsRes = await API.get("/shows/by-city", {
          params: { movieId: id, city },
        });

        setShows(showsRes.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, city]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#0a0e27]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-3 border-[#1d8fff]/30 border-t-[#1d8fff] rounded-full"
        />
      </div>
    );

  if (!movie)
    return (
      <div className="min-h-screen bg-[#0a0e27] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#EEEEEE]/60 text-lg">Movie not found</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0a0e27]">
      {/* Header with Back Button */}
      <div className="sticky top-0 z-50 bg-[#0a0e27]/95 backdrop-blur-md border-b border-[#1d8fff]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[#EEEEEE]/70 hover:text-[#1d8fff] transition-colors group"
          >
            <ArrowLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span className="text-sm font-medium">Back</span>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1d8fff]/5 to-transparent h-96" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Poster */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1"
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-t from-[#1d8fff]/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full aspect-[2/3] object-cover rounded-2xl shadow-2xl shadow-[#1d8fff]/10"
                />
              </div>
            </motion.div>

            {/* Movie Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2 flex flex-col justify-center"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#EEEEEE] mb-6 leading-tight">
                {movie.title}
              </h1>

              {/* Genre Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genre?.map((g, index) => (
                  <span
                    key={index}
                    className="px-4 py-1.5 bg-[#1d8fff]/10 border border-[#1d8fff]/30 rounded-full text-[#1d8fff] text-sm font-medium hover:bg-[#1d8fff]/20 transition-colors"
                  >
                    {g}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className="text-[#EEEEEE]/70 text-base md:text-lg leading-relaxed mb-8 max-w-3xl">
                {movie.description}
              </p>

              {/* Duration */}
              <div className="inline-flex items-center gap-3 px-4 py-2.5 bg-[#1d8fff]/5 border border-[#1d8fff]/20 rounded-xl w-fit">
                <Clock size={18} className="text-[#1d8fff]" />
                <span className="text-[#EEEEEE]/90 text-sm">
                  <span className="font-semibold">{movie.duration}</span> mins
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Shows Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* City Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-10"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#EEEEEE]">
              Book Tickets
            </h2>

            <div className="relative">
              <MapPin
                size={18}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#1d8fff]"
              />
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="bg-[#0f1629] text-[#EEEEEE] border border-[#1d8fff]/20 pl-12 pr-10 py-3 rounded-xl focus:outline-none focus:border-[#1d8fff]/50 transition-all appearance-none cursor-pointer text-sm font-medium min-w-[200px] hover:border-[#1d8fff]/40"
              >
                <option value="Delhi">Delhi</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Chennai">Chennai</option>
                <option value="Kolkata">Kolkata</option>
                <option value="Pune">Pune</option>
                <option value="Ahmedabad">Ahmedabad</option>
                <option value="Jaipur">Jaipur</option>
                <option value="Lucknow">Lucknow</option>
                <option value="Chandigarh">Chandigarh</option>
                <option value="Indore">Indore</option>
                <option value="Bhopal">Bhopal</option>
                <option value="Surat">Surat</option>
              </select>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg
                  className="w-4 h-4 text-[#1d8fff]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-[#1d8fff]/20 to-transparent" />
        </motion.div>

        {/* Shows List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {shows.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#1d8fff]/5 border border-[#1d8fff]/20 mb-4">
                <Ticket size={24} className="text-[#1d8fff]/50" />
              </div>
              <p className="text-[#EEEEEE]/60 text-lg mb-2">
                No shows available in {city}
              </p>
              <p className="text-[#EEEEEE]/40 text-sm">
                Try selecting a different city
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {shows.map((show, index) =>
                show.theater ? (
                  <motion.div
                    key={show._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <Link to={`/seat/${show._id}`}>
                      <div className="group bg-[#0f1629] hover:bg-[#141b32] border border-[#1d8fff]/10 hover:border-[#1d8fff]/30 rounded-xl p-5 md:p-6 transition-all duration-300 cursor-pointer">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          {/* Theater Info */}
                          <div className="flex-1 space-y-3">
                            <div className="flex items-start gap-3">
                              <div className="p-2 bg-[#1d8fff]/5 rounded-lg">
                                <Building2
                                  size={20}
                                  className="text-[#1d8fff]"
                                />
                              </div>
                              <div>
                                <h3 className="font-semibold text-lg text-[#EEEEEE] group-hover:text-[#1d8fff] transition-colors">
                                  {show.theater.name}
                                </h3>
                                <p className="text-[#EEEEEE]/40 text-xs mt-0.5">
                                  {show.theater.location || city}
                                </p>
                              </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 text-sm">
                              {/* Date & Time */}
                              <div className="flex items-center gap-2 text-[#EEEEEE]/60">
                                <Calendar size={14} />
                                <span>
                                  {new Date(show.showTime).toLocaleString(
                                    "en-US",
                                    {
                                      month: "short",
                                      day: "numeric",
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    },
                                  )}
                                </span>
                              </div>

                              {/* Price */}
                              <div className="flex items-center gap-1.5 text-[#1d8fff] font-semibold">
                                <IndianRupee size={14} />
                                <span>{show.price}</span>
                              </div>
                            </div>
                          </div>

                          {/* Book Button */}
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-[#1d8fff] hover:bg-[#1d8fff]/90 text-white px-6 md:px-8 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#1d8fff]/20 group-hover:shadow-[#1d8fff]/40 whitespace-nowrap"
                          >
                            <Ticket size={18} />
                            <span>Book Tickets</span>
                          </motion.button>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ) : null,
              )}
            </div>
          )}
        </motion.div>
      </div>

      {/* Bottom Spacing */}
      <div className="h-12" />
    </div>
  );
};

export default MovieDetails;