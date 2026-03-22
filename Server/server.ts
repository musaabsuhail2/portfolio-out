import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import contactRoutes from "./routes/contactRoutes";
import {defaultMiddleware} from '@nlbridge/express';
import chatRouter from "./routes/chatRoute";


dotenv.config();

const app = express();
const PORT: number = parseInt(process.env.PORT || "8080", 10);

app.use(cors());
app.use(express.json());

app.use("/api/contact", contactRoutes);
app.use("/api/chatbot" ,chatRouter )

app.get('/', (req, res) => {
    res.send('Welcome to NLUX + Node.js demo server!');
});

app.post('/chat-api',
    defaultMiddleware('openai', {
        apiKey: process.env.OPEN_AI_API_KEY,
        chatModel: 'gpt-3.5-turbo',
    }),
);


app.listen(PORT,() => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err: Error) => console.error(err));




  