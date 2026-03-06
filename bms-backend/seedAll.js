// import mongoose from "mongoose";
// import dotenv from "dotenv";

// import Movie from "./models/movie.model.js";
// import Theater from "./models/theater.model.js";
// import Show from "./models/show.model.js";

// dotenv.config();

// const moviesData = [
//   {
//     title: "Interstellar",
//     description: "A team travels through a wormhole in space.",
//     poster: "https://m.media-amazon.com/images/I/71yRr7n9mRL._AC_SL1024_.jpg",
//     duration: 169,
//     language: "English",
//     genre: ["Sci-Fi", "Adventure"],
//     releaseDate: new Date("2014-11-07"),
//   },
//   {
//     title: "The Dark Knight",
//     description: "Batman faces the Joker.",
//     poster: "https://m.media-amazon.com/images/I/51k0qaipJ-L._AC_.jpg",
//     duration: 152,
//     language: "English",
//     genre: ["Action", "Crime"],
//     releaseDate: new Date("2008-07-18"),
//   },
//   {
//     title: "Inception",
//     description: "Dream within a dream thriller.",
//     poster: "https://m.media-amazon.com/images/I/51v5ZpFyaFL._AC_.jpg",
//     duration: 148,
//     language: "English",
//     genre: ["Sci-Fi", "Thriller"],
//     releaseDate: new Date("2010-07-16"),
//   },
// ];

// const theatersData = [
//   {
//     name: "PVR Select Citywalk",
//     city: "Delhi",
//     address: "Saket, New Delhi",
//   },
//   {
//     name: "INOX Nehru Place",
//     city: "Delhi",
//     address: "Nehru Place, Delhi",
//   },
//   {
//     name: "Cinepolis Andheri",
//     city: "Mumbai",
//     address: "Andheri West, Mumbai",
//   },
// ];

// const seedAll = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log("MongoDB Connected 🚀");

//     // Clear old data
//     await Movie.deleteMany();
//     await Theater.deleteMany();
//     await Show.deleteMany();

//     // Insert Movies
//     const movies = await Movie.insertMany(moviesData);

//     // Insert Theaters
//     const theaters = await Theater.insertMany(theatersData);

//     const showsToInsert = [];

//     const showTimes = [
//       "2026-02-20T10:00:00.000Z",
//       "2026-02-20T14:00:00.000Z",
//       "2026-02-20T18:00:00.000Z",
//     ];

//     // Create Shows
//     for (let movie of movies) {
//       for (let theater of theaters) {
//         for (let time of showTimes) {
//           showsToInsert.push({
//             movie: movie._id,
//             theater: theater._id,
//             showTime: new Date(time),
//             price: 250,
//             totalSeats: 50,
//             bookedSeats: [],
//             lockedSeats: [],
//           });
//         }
//       }
//     }

//     await Show.insertMany(showsToInsert);

//     console.log("✅ Movies, Theaters, Shows seeded successfully!");
//     process.exit();
//   } catch (error) {
//     console.error("Seed error:", error);
//     process.exit(1);
//   }
// };

// seedAll();

import mongoose from "mongoose";
import dotenv from "dotenv";

import Movie from "./models/movie.model.js";
import Theater from "./models/theater.model.js";
import Show from "./models/show.model.js";

dotenv.config();

/* ===============================
   🎬 MOVIES (15)
================================= */

const moviesData = [
  {
    title: "Interstellar",
    description: "A team travels through a wormhole in space.",
    // poster: "https://image.tmdb.org/t/p/w500/nCbkOyOMTeR3q1f7fYxYvYVnLz.jpg",
    poster:
      "https://images-cdn.ubuy.co.in/652f55199a6c9954080795c3-interstellar-movie-poster-12-x-18-inch.jpg",
    duration: 169,
    language: "English",
    genre: ["Sci-Fi", "Adventure"],
    releaseDate: new Date("2014-11-07"),
  },
  {
    title: "The Dark Knight",
    description: "Batman faces the Joker.",
    poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    duration: 152,
    language: "English",
    genre: ["Action", "Crime"],
    releaseDate: new Date("2008-07-18"),
  },
  {
    title: "Inception",
    description: "Dream within a dream thriller.",
    poster: "https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg",
    duration: 148,
    language: "English",
    genre: ["Sci-Fi", "Thriller"],
    releaseDate: new Date("2010-07-16"),
  },
  {
    title: "Avengers: Endgame",
    description: "The Avengers assemble for the final battle.",
    poster: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    duration: 181,
    language: "English",
    genre: ["Action", "Superhero"],
    releaseDate: new Date("2019-04-26"),
  },
  {
    title: "Joker",
    description: "Origin story of the iconic villain.",
    poster: "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
    duration: 122,
    language: "English",
    genre: ["Drama", "Thriller"],
    releaseDate: new Date("2019-10-04"),
  },
  {
    title: "Titanic",
    description: "A love story aboard the Titanic.",
    poster: "https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
    duration: 195,
    language: "English",
    genre: ["Romance", "Drama"],
    releaseDate: new Date("1997-12-19"),
  },
  {
    title: "Dhurandhar",
    description: "High-octane Indian action thriller.",
    // poster: "https://via.placeholder.com/300x450",
    poster:
      "https://i0.wp.com/chinmaynakhwa.wordpress.com/wp-content/uploads/2025/12/wp-17650009566394256362528583135939.jpg?fit=960%2C1200&ssl=1&w=640",
    duration: 145,
    language: "Hindi",
    genre: ["Action", "Drama"],
    releaseDate: new Date("2024-01-10"),
  },
  {
    title: "Saw",
    description: "Psychological horror thriller.",
    // poster: "https://image.tmdb.org/t/p/w500/ds7E2M9sHfBhz1KxGsc9Y0N7E0.jpg",
    poster:
      "https://i.pinimg.com/736x/9a/f3/30/9af330997e816e545f3d137de59606f0.jpg",
    duration: 103,
    language: "English",
    genre: ["Horror", "Thriller"],
    releaseDate: new Date("2004-10-29"),
  },
  {
    title: "John Wick",
    description: "Legendary assassin returns.",
    poster: "https://image.tmdb.org/t/p/w500/fZPSd91yGE9fCcCe6OoQr6E3Bev.jpg",
    duration: 101,
    language: "English",
    genre: ["Action", "Crime"],
    releaseDate: new Date("2014-10-24"),
  },
  {
    title: "Guardians of the Galaxy",
    description: "A group of misfits save the galaxy.",
    poster: "https://image.tmdb.org/t/p/w500/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg",
    duration: 121,
    language: "English",
    genre: ["Action", "Comedy"],
    releaseDate: new Date("2014-08-01"),
  },
  {
    title: "Dune",
    description: "Epic sci-fi saga.",
    poster: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
    duration: 155,
    language: "English",
    genre: ["Sci-Fi", "Adventure"],
    releaseDate: new Date("2021-10-22"),
  },
  {
    title: "Avatar",
    description: "Journey to Pandora.",
    poster: "https://image.tmdb.org/t/p/w500/6EiRUJpuoeQPghrs3YNktfnqOVh.jpg",
    duration: 162,
    language: "English",
    genre: ["Sci-Fi", "Fantasy"],
    releaseDate: new Date("2009-12-18"),
  },
  {
    title: "Doctor Strange",
    description: "Master of mystic arts.",
    poster: "https://image.tmdb.org/t/p/w500/uGBVj3bEbCoZbDjjl9wTxcygko1.jpg",
    duration: 115,
    language: "English",
    genre: ["Superhero", "Fantasy"],
    releaseDate: new Date("2016-11-04"),
  },
  {
    title: "Deadpool",
    description: "Merc with a mouth.",
    poster:
      "https://th.bing.com/th/id/OIP.3ANxteQDy9LDnADI1MyHhwHaLc?w=301&h=510&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    duration: 108,
    language: "English",
    genre: ["Action", "Comedy"],
    releaseDate: new Date("2016-02-12"),
  },
  {
    title: "Kung Fu Panda",
    description: "Animated martial arts adventure.",
    poster: "https://image.tmdb.org/t/p/w500/wWt4JYXTg5Wr3xBW2phBrMKgp3x.jpg",
    duration: 95,
    language: "English",
    genre: ["Animation", "Comedy"],
    releaseDate: new Date("2008-06-06"),
  },
];

/* ===============================
   🏢 THEATERS (28)
================================= */

const cities = [
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Lucknow",
  "Chandigarh",
  "Indore",
  "Bhopal",
  "Surat",
];

const theatersData = [];

cities.forEach((city, index) => {
  theatersData.push(
    {
      name: `PVR ${city} Central`,
      city,
      address: `${city} Main Mall`,
    },
    {
      name: `INOX ${city} Plaza`,
      city,
      address: `${city} Downtown`,
    },
  );
});

/* ===============================
   🚀 SEED FUNCTION
================================= */

const seedAll = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected 🚀");

    await Movie.deleteMany();
    await Theater.deleteMany();
    await Show.deleteMany();

    const movies = await Movie.insertMany(moviesData);
    const theaters = await Theater.insertMany(theatersData);

    const showsToInsert = [];

    const showHours = [10, 13, 16, 19, 22]; // 5 shows per day
    const today = new Date();

    for (let day = 0; day < 7; day++) {
      for (let movie of movies) {
        for (let theater of theaters) {
          for (let hour of showHours) {
            const showDate = new Date(today);
            showDate.setDate(today.getDate() + day);
            showDate.setHours(hour, 0, 0, 0);

            const isWeekend =
              showDate.getDay() === 0 || showDate.getDay() === 6;
            const isEvening = hour >= 18;

            let price = 200;
            if (isWeekend) price += 100;
            if (isEvening) price += 50;

            showsToInsert.push({
              movie: movie._id,
              theater: theater._id,
              showTime: showDate,
              price,
              totalSeats: 100,
              bookedSeats: [],
              lockedSeats: [],
            });
          }
        }
      }
    }

    await Show.insertMany(showsToInsert);

    console.log("✅ Database seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
};

seedAll();