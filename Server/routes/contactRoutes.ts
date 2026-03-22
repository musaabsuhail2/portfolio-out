import { Router, Request, Response } from "express";
import Contact from "../models/Contact";

const router: Router = Router();

router.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, message } = req.body as {
      name?: string;
      email?: string;
      message?: string;
    };

    if (!name || !email || !message) {
      res.status(400).json({ error: "All fields required" });
      return;
    }

    const newMessage = await Contact.create({ name, email, message });

    res.status(201).json({
      success: true,
      data: newMessage,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
