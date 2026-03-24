import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { defaultMiddleware } from "@nlbridge/express";
dotenv.config();

import contactRoutes from "./routes/contactRoutes";
import chatRouter from "./routes/chatRoute";

const app = express();
const PORT: number = parseInt(process.env.PORT || "8080", 10);

app.use(cors());
app.use(express.json());

app.use("/api/contact", contactRoutes);
app.use("/api/chatbot", chatRouter);

// ✅ NLBridge route
app.post(
  "/chat-api",
  defaultMiddleware("openai", {
    apiKey: process.env.OPENAI_API_KEY!,
    chatModel: "gpt-4o-mini",
  })
);

app.get("/", (req, res) => {
  res.send("Welcome to NLUX + Node.js demo server!");
});

// ✅ Start server ONLY after DB connects
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err: Error) => console.error(err));