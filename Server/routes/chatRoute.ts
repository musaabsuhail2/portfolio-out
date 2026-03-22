import { Router, Request, Response } from "express";
import { defaultMiddleware } from "@nlbridge/express";
import Chatbot from "../models/Chatbot";

const chatRouter = Router();

// POST /api/chat — save conversation history to MongoDB
chatRouter.post("/history", async (req: Request, res: Response) => {
  try {
    const { sessionId, role, content } = req.body;

    if (!sessionId || !role || !content) {
      return res.status(400).json({ error: "sessionId, role, and content are required." });
    }

    let chat = await Chatbot.findOne({ sessionId });

    if (!chat) {
      chat = new Chatbot({ sessionId, messages: [] });
    }

    chat.messages.push({ role, content, timestamp: new Date() });
    await chat.save();

    return res.status(200).json({ message: "Message saved.", chat });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error." });
  }
});

// GET /api/chat/history/:sessionId — retrieve conversation history
chatRouter.get("/history/:sessionId", async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    const chat = await Chatbot.findOne({ sessionId });

    if (!chat) {
      return res.status(404).json({ error: "No chat history found for this session." });
    }

    return res.status(200).json({ chat });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error." });
  }
});

// DELETE /api/chat/history/:sessionId — clear conversation history
chatRouter.delete("/history/:sessionId", async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    await Chatbot.findOneAndDelete({ sessionId });
    return res.status(200).json({ message: "Chat history deleted." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error." });
  }
});

// POST /api/chat/message — nlbridge chat completion
chatRouter.post(
  "/message",
  defaultMiddleware("openai", {
    apiKey: process.env.OPEN_AI_API_KEY,
    chatModel: "gpt-3.5-turbo",
  })
);

export default chatRouter;