import mongoose, { Schema } from "mongoose";

const ticketSchema = new Schema(
  {
    userId: { type: String, required: true },
    subject: { type: String, trim: true, required: true },
    description: { type: String },
    priority: { type: String, enum: ["low", "medium", "high"], default: "low" },
    status: {
      type: String,
      enum: ["open", "pending", "closed"],
      default: "open",
    },
    messages: [
      {
        senderId: { type: String, required: true },
        sender: { name: String, imageUrl: String },
        message: { type: String, required: true },
        date: { type: Date, required: Date.now },
      },
    ],
    user: {
      name: String,
      imageUrl: String,
    },
  },
  { timestamps: true }
);

export const Ticket = mongoose.model("Ticket", ticketSchema);
