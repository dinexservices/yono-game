import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import rateLimit from "express-rate-limit";
import slowDown from "express-slow-down";
import helmet from "helmet";

import dotenv from "dotenv";
dotenv.config();

// import cloudRedisClient from "./config/redis.config.js";
import gameRoute from "./routes/routes.js"

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit:"10kb"}));

app.use(cors({
    origin: [
        "https://localhost:3000"
    ],
    credentials: true,
    exposedHeaders:["set-cookie"]
}));


app.use(helmet());


// (async () => {
//   try {
//     const pong = await cloudRedisClient.ping();
//     console.log("✅ Cloud Redis connected:", pong);
//   } catch (error) {
//     console.error("❌ Redis connection error:", error);
//     process.exit(1);
//   }
// })();

const limiter = rateLimit({
  windowMs: 60*1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false
});

const speedLimiter = slowDown({
  windowMs: 60*1000,
  delayAfter: 50,        // after 50 req/min
  delayMs: () => 500,    // add 500ms delay per request
});

// Health Check
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Server is running",
  });
});

app.use("/api", limiter, speedLimiter, gameRoute);


export default app;