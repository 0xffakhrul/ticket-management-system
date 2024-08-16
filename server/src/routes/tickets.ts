import express, { Request, Response } from "express";
import { Ticket } from "../models/Ticket";

const router = express.Router();

router.get("/all", async (req: Request, res: Response) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).send(tickets);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.status(200).send(ticket);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const newTicket = new Ticket(data);
    const createdTicket = await newTicket.save();

    res.status(200).send(createdTicket);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const {
      subject,
      description,
      priority,
      status,
      newMessage,
      userId,
      senderName,
      senderImageUrl,
    } = req.body;
    req.body;
    const update: any = { $set: {} };

    if (subject) update.$set.subject = subject;
    if (description) update.$set.description = description;
    if (priority) update.$set.priority = priority;
    if (status) update.$set.status = status;

    if (newMessage && userId) {
      update.$push = {
        messages: {
          senderId: userId,
          sender: { name: senderName, imageUrl: senderImageUrl },
          message: newMessage,
          date: new Date(),
        },
      };
    }

    const ticket = await Ticket.findByIdAndUpdate(req.params.id, update, {
      new: true,
    });

    if (!ticket) {
      return res.status(404).send({ message: "Ticket not found" });
    }

    res.status(200).send(ticket);
  } catch (error) {
    console.error("Error updating ticket:", error);
    res.status(500).send({ message: "Error updating ticket" });
  }
});

router.patch("/:id", async (req: Request, res: Response) => {
  try {
    const { status, priority } = req.body;
    const update: any = {};

    if (status) update.status = status;
    if (priority) update.priority = priority;

    const ticket = await Ticket.findByIdAndUpdate(req.params.id, update, {
      new: true,
    });

    if (!ticket) {
      return res.status(404).send({ message: "Ticket not found" });
    }

    res.status(200).send(ticket);
  } catch (error) {
    console.error("Error updating ticket:", error);
    res.status(500).send({ message: "Error updating ticket" });
  }
});

export default router;
