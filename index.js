// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv"
// import cookieParser from "cookie-parser"
// import cors from "cors"
// dotenv.config()
// mongoose.connect(process.env.MONGO_URI).then(
//     ()=>{
//         console.log("connected to MongoDB")
//     }
// ).catch((err)=>{
//     console.log(err);
// })
// const app = express()
// app.use(express.json())
// app.use(cookieParser())
// app.use(cors({ origin: ["http://localhost:5173"], credentials: true }))

// import authRouter from './routes/auth.route.js'
// import noteRouter from './routes/note.route.js'
// app.use("/api/auth", authRouter)
// app.use("/api/note", noteRouter)

// app.listen(3000, ()=>{
//     console.log("Server is listening to port 3000")
// })

// app.use((err, req, res, next)=>{
//     const statusCode = err.statusCode || 500
//     const message = err.message || "Internal server error"


//     return res.status(statusCode).json({
//         success: false,
//         statusCode,
//         message,
//       })
// })

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://notetakingbackend-ss9p.onrender.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

import authRouter from "./routes/auth.route.js";
import noteRouter from "./routes/note.route.js";

app.use("/api/auth", authRouter);
app.use("/api/note", noteRouter);

app.listen(3000, () => {
  console.log("Server is listening to port 3000");
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});