import mongoose from "mongoose";
import dotenv from "dotenv";
import { importMoviesFromOMDB } from "./utils/omdbImport.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

await importMoviesFromOMDB();

process.exit();
